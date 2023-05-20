import { useCallback, useEffect, useMemo } from "react";
import { Menu } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import classNames from "functions/classNames";
import ShoppingCart from "./ShoppingCart";
import ShoppingCartServer from "./ShoppingCartServer";
import { useDispatch, useSelector } from "react-redux";
import BlurBackdrop from "../overlays/BlurBackdrop";
import { setModalCart } from "app/store/cartSlice";
import useIsClientSide from "hooks/useIsClientSide";
import { getCartPending, getItemCountPending } from "app/store/cartServer";
const CartQuickView = (props) => {
  const dispatch = useDispatch();
  const isClientSide = useIsClientSide();
  const isUserLoggedIn = useSelector((state) => state?.auth.isUserLoggedIn);
  const isUserDataLoading = useSelector((state) => state?.auth.isUserDataLoading);
  const cartItems = useSelector((state) => state?.cart.cartItems);
  const isOpenModalCart = useSelector((state) => state?.cart.isOpenModalCart);
  const cartData = useSelector((state) => state?.cartServer.cartData);
  const countCartData = useSelector((state) => state?.cartServer.countCartData);

  const isGetCartLoading = useSelector((state) => state?.cartServer.isGetCartLoading);

  const cart = useMemo(
    () => (isUserLoggedIn ? countCartData?.count : cartItems),
    [isUserLoggedIn, countCartData?.count, cartData?.items, cartItems]
  );

  function sumCartQuantities(items) {
    return items?.reduce((sum, item) => sum + item.cartQuantity, 0);
  }

  const totalCartQuantity = sumCartQuantities(cartItems);
  console.log(totalCartQuantity);
  console.log("cart", cart);

  // //debugger;
  let ordersNumber = 0;
  if (typeof window !== "undefined") {
    ordersNumber = JSON.parse(window.localStorage.getItem(`ordersNumber`));
  }

  useEffect(() => {
    if (isUserLoggedIn && !isUserDataLoading && !isGetCartLoading && cartData.items === undefined) {
      dispatch(getItemCountPending());

      dispatch(getCartPending());
    }
  }, [dispatch, isUserLoggedIn, isUserDataLoading, isGetCartLoading, cartData.items]);

  const handleModalClose = useCallback(() => {
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    dispatch(setModalCart({ open: false }));
  }, []);

  useEffect(() => {
    dispatch(getItemCountPending());
  }, [dispatch, cartData.items]);

  return (
    <Menu as="div" className="relative">
      <div
        onClick={() => dispatch(setModalCart({ open: true }))}
        className={classNames(
          "max-w-xs flex text-sm rounded-full cursor-pointer",
          ordersNumber === 0 && "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        )}
      >
        <span className="sr-only">Open Shopping Cart</span>

        <button
          type="button"
          className={classNames(
            "flex items-center transition ease-in-out duration-150 relative",
            props.className || "text-gray-500 hover:text-sky-500"
          )}
        >
          <span className="sr-only">View Shopping Cart</span>
          <ShoppingBagIcon className="w-6 h-8 icon-stroke-width-1" />
          {isUserLoggedIn ? (
            <>
              {/* {isClientSide && ( */}
              <div className="absolute top-0 -left-[25%]">
                <span
                  className={classNames(
                    "relative flex font-light text-xs w-3 h-3 bg-red-500 rounded-full items-center justify-center text-white p-2",
                    !!cart && "pulse-animation"
                  )}
                >
                  {countCartData?.count > 0 ? countCartData?.count : 0}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* {isClientSide && ( */}
              <div className="absolute top-0 -left-[25%]">
                <span
                  className={classNames(
                    "relative flex font-light text-xs w-3 h-3 bg-red-500 rounded-full items-center justify-center text-white p-2",
                    !!cart.length && "pulse-animation"
                  )}
                >
                  {totalCartQuantity}
                </span>
              </div>
              {/* )} */}
            </>
          )}
        </button>
      </div>

      <BlurBackdrop
        isVisible={isOpenModalCart}
        onClose={handleModalClose}
        // backdropMode="light"
        backdropColorClass="bg-black/40"
        noXButton
        className="relative w-full mx-auto h-inherit top-7 md:max-w-3xl"
        // backdropColorClass
        customStyle={{ width: "calc(100% - 1rem)", overflowY: "hidden" }}
      >
        {isUserLoggedIn ? (
          <ShoppingCartServer handleModalClose={handleModalClose} />
        ) : (
          <ShoppingCart handleModalClose={handleModalClose} />
        )}
      </BlurBackdrop>
    </Menu>
  );
};

export default CartQuickView;
