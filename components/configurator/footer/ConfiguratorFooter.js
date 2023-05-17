import { ChevronUpIcon } from "@heroicons/react/outline";
import { postUpgradesCheckoutData } from "app/api/checkout/upgrades";
import {
  CONFIGURATOR_EDIT_CART_MODE,
  CONFIGURATOR_EDIT_ORDER_MODE,
  CONFIGURATOR_EDIT_UPGRADE_MODE,
  CONFIGURATOR_NORMAL_MODE,
} from "app/constants/configuratorModes";
import { addToCart } from "app/store/cartSlice";
import { getCartPending, removeCartItemPending } from "app/store/cartServer";
import { setHasAddedToCart } from "app/store/configuratorSlice";
import { toTitleCase } from "functions/convertors";
import { useRouter } from "next/router";
import { forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addConfiguredBikeToCart } from "app/api/configurator";
import { checkoutKeys } from "app/constants/localStorageKeys";
import classNames from "functions/classNames";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import ConfiguratorTotal from "./ConfiguratorTotal";
import ConfiguratorShippingCost from "./ConfiguratorShippingCost";
import ShippingNDeliveryDates from "./ShippingNDeliveryDates";

const ADD_TO_CART_BUTTON = "add-to-cart-button";
const CONTINUE_TO_CHECKOUT_BUTTON = "continue-to-checkout-button";

function ConfiguratorFooter(props, ref) {
  const router = useRouter();
  const dispatch = useDispatch();

  const DatesMobileRef = useRef();
  const ShippingCostRef = useRef();

  const [isShowMoreEnabled, setShowMoreEnabled] = useState(false);

  // A boolean stating user login status
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const totalPrice = useSelector((state) => state.configurator.totalPrice);
  const selectedSize = useSelector((state) => state.configurator.selectedSize);
  const selectedColor = useSelector((state) => state.configurator.selectedColor);
  const selectedUpgrades = useSelector((state) => state.configurator.upgrades);
  const configuratorMode = useSelector((state) => state.configurator.mode);
  const configuratorData = useSelector((state) => state.configurator.configuratorData);
  const preUpgradeParts = useSelector((state) => state.configurator.preUpgrades?.parts);
  const hasAddedToCart = useSelector((state) => state.configurator.hasAddedToCart);

  // State to indicate loading of the #add-to-cart-button
  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);
  // State to indicate loading of the #continue-to-checkout-button
  const [isContinueToCheckoutLoading, setIsContinueToCheckoutLoading] = useState(false);

  const handleCheckoutClick = async (e) => {
    const upgrades = selectedUpgrades.map((upgrade) => upgrade.id);

    const clickedButtonID = e.currentTarget.id;

    const dataToPostToServer = {
      items: {
        variation_id: configuratorData?.variation?.id,
        color_id: selectedColor?.id,
        size_id: selectedSize?.id,
        upgrades: upgrades,
      },
      product_id: configuratorData?.product?.id,
      count: 1,
    };

    // Revenant campaign redirects to Indiegogo
    if (clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON && configuratorData?.product?.has_external_link && configuratorData?.product?.external_link && configuratorMode !== CONFIGURATOR_EDIT_UPGRADE_MODE && configuratorMode !== CONFIGURATOR_EDIT_ORDER_MODE) {
      window.location.href = configuratorData.product.external_link;
      return;
    }

    if (!isUserLoggedIn) {
      if (
        clickedButtonID === ADD_TO_CART_BUTTON ||
        (!hasAddedToCart && clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON)
      ) {
        // Extracting upgrade objects to save into local storage, so we can show its data in cart modal
        let equipmentPrice = 0;
        let bikeFakeId = "" + configuratorData.variation.id;
        for (let category of configuratorData.parts) {
          for (let upgrade of category.upgrades) {
            if (upgrades.includes(upgrade.id)) {
              equipmentPrice += upgrade.price;
              bikeFakeId += upgrade.id;
            }
          }
        }

        bikeFakeId += Math.random();

        const objectToSave = {
          server: dataToPostToServer,
          title: toTitleCase(configuratorData?.product?.title),
          price: totalPrice || +configuratorData?.variation?.price + +equipmentPrice,
          thumbnail: selectedColor?.pivot?.image_path,
          description: configuratorData?.product?.description,
          product: configuratorData?.product,
          color: selectedColor,
          size: selectedSize,
          upgrades: upgrades,
          type: "bike",
          id: bikeFakeId,
        };

        dispatch(addToCart(objectToSave));

        if (clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON) router.push("/cart/checkout");
      }
    } else {
      if (clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON) setIsContinueToCheckoutLoading(true);
      else if (clickedButtonID === ADD_TO_CART_BUTTON) {
        dispatch(setHasAddedToCart(true));
        setIsAddToCartLoading(true);
      }

      if (configuratorMode === CONFIGURATOR_EDIT_CART_MODE) {
        const { cartID } = router.query;
        if (cartID) dispatch(removeCartItemPending(+cartID));
      } else if (
        configuratorMode === CONFIGURATOR_EDIT_ORDER_MODE ||
        configuratorMode === CONFIGURATOR_EDIT_UPGRADE_MODE
      ) {
        const { orderBikeID } = router.query;
        if (orderBikeID) {
          const upgradesCheckoutData = {
            order_bike_id: +orderBikeID,
          };

          const preUpgradePartIDs = preUpgradeParts.map((part) => part.part_id);

          upgradesCheckoutData.upgrades = upgrades.filter(
            (part) => !preUpgradePartIDs.includes(part)
          );

          if (upgradesCheckoutData.upgrades.length === 0) {
            toast.info("You haven't selected any new upgrades.");
            setIsAddToCartLoading(false);
            setIsContinueToCheckoutLoading(false);
            return;
          }

          try {
            const res = await postUpgradesCheckoutData(upgradesCheckoutData);
            sessionStorage.setItem(checkoutKeys.UPGRADES_CHECKOUT_DATA, JSON.stringify(res.data));
            router.push("/cart/checkout/upgrades");
            if (configuratorMode === CONFIGURATOR_EDIT_ORDER_MODE)
              toast.success("The upgrade(s) were added to cart successfully.");
            else if (configuratorMode === CONFIGURATOR_EDIT_UPGRADE_MODE)
              toast.success("The upgrade(s) were updated successfully.");
          } catch (error) {
            toast.error("Sorry, there was an error processing your request.");
          }
        }

        setIsAddToCartLoading(false);
        return;
      }

      /**
       * configuratorMode === CONFIGURATOR_EDIT_ORDER_MODE
       * configuratorMode === CONFIGURATOR_EDIT_UPGRADE_MODE
       * will NOT reach here
       */

      try {
        if (
          clickedButtonID === ADD_TO_CART_BUTTON ||
          (clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON && !hasAddedToCart)
        ) {
          await addConfiguredBikeToCart(dataToPostToServer);

          dispatch(getCartPending());

          if (configuratorMode === CONFIGURATOR_EDIT_CART_MODE)
            toast.success("Changes were applied successfully.");
          else toast.success("The bike was added to cart successfully.");
        }

        if (clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON) router.push("/cart/checkout");
      } catch (error) {
        toast.error("Couldn't add bike to cart. Try again later.");
      }

      setIsAddToCartLoading(false);
    }
  };

  return (
    <div ref={ref}
      className="flex flex-col sm:flex-row bg-[#f5f5f7] border-t fixed bottom-0 left-0 right-0 py-4 px-2 sm:px-6 transition-all-children z-50">
      <div
        className={classNames(
          "-z-10 space-y-3 duration-500 ease-in-out transform",
          isShowMoreEnabled ? "h-52 opacity-100" : "h-0 opacity-0"
        )}
        style={{
          height: isShowMoreEnabled
            ? DatesMobileRef.current.clientHeight + ShippingCostRef.current.clientHeight + 20
            : 0,
        }}
      >
        <ShippingNDeliveryDates ref={DatesMobileRef} className="sm:hidden" />
        <ConfiguratorShippingCost
          ref={ShippingCostRef}
          className="sm:hidden"
          getPageData={props.getPageData}
        />
      </div>
      <ShippingNDeliveryDates className="flex-1 hidden sm:flex" />
      <ConfiguratorShippingCost className="flex-1 hidden sm:flex" getPageData={props.getPageData} />
      <div className="flex flex-col lg:flex-row flex-1  bg-[#f5f5f7] sm:pr-20">
        <ConfiguratorTotal />
        <div className="flex flex-col mt-2 space-y-2 sm:ml-auto lg:mt-0">
          <div className="flex md:flex-col justify-center">
            {(configuratorMode === CONFIGURATOR_NORMAL_MODE ||
              configuratorMode === CONFIGURATOR_EDIT_CART_MODE) && (
              <button
                id={ADD_TO_CART_BUTTON}
                onClick={handleCheckoutClick}
                className={classNames(
                  "flex justify-center items-center w-full cursor-pointer rounded-xl py-2 px-4 disabled:cursor-not-allowed",
                  "border border-nireekaGreen",
                  isAddToCartLoading
                    ? "text-nireekaGreen bg-transparent cursor-wait"
                    : "text-nireekaGreen bg-transparent",
                  !isContinueToCheckoutLoading &&
                    !isAddToCartLoading &&
                    "hover:bg-nireekaGreen hover:text-white"
                )}
                disabled={isAddToCartLoading || isContinueToCheckoutLoading}
              >
                {isAddToCartLoading && (
                  <LoadingNireeka className="w-5 h-5 mr-3 border-nireekaGreen" />
                )}
                <span className="text-base font-medium whitespace-nowrap">
                  {configuratorMode === CONFIGURATOR_EDIT_CART_MODE
                    ? "Save changes"
                    : "Add to Cart"}
                </span>
              </button>
            )}
          </div>

          <button
            id={CONTINUE_TO_CHECKOUT_BUTTON}
            onClick={handleCheckoutClick}
            className={classNames(
              "flex justify-center items-center w-full md:w-auto cursor-pointer rounded-xl py-2 px-4 disabled:cursor-not-allowed",
              "border border-nireekaGreen",
              isContinueToCheckoutLoading
                ? "text-nireekaGreen bg-transparent cursor-wait"
                : "text-white bg-nireekaGreen",
              !isContinueToCheckoutLoading &&
                !isAddToCartLoading &&
                "hover:bg-transparent hover:text-nireekaGreen"
            )}
            disabled={isAddToCartLoading || isContinueToCheckoutLoading}
          >
            {isContinueToCheckoutLoading && (
              <LoadingNireeka className="w-5 h-5 mr-3 border-nireekaGreen" />
            )}
            <span className="text-base font-medium whitespace-nowrap">Continue to Checkout</span>
          </button>
        </div>
      </div>
      <div
        className="absolute top-4 right-2 sm:hidden flex items-center space-x-1 z-[2] sm:z-auto"
        onClick={() => setShowMoreEnabled((prevState) => !prevState)}
      >
        <span className="text-xs text-blue-600 cursor-pointer hover:underline">
          Delivery details
        </span>
        <span>
          <ChevronUpIcon
            className={classNames(
              "w-4 h-4 text-blue-600 transition-all transform duration-600",
              isShowMoreEnabled && "rotate-180"
            )}
          />
        </span>
      </div>
    </div>
  );
}

export default forwardRef(ConfiguratorFooter);
