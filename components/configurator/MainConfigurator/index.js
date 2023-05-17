import React, { Fragment, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Footer from "components/StaticPages/Footer";
import styles from "./main.module.css";
import { PlusSmIcon, StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import classNames from "functions/classNames";
import {
  callGetAvailableColorsBySize,
  callGetDateBySizeAndColor,
  getBikesFiltersPending,
  getBikesFiltersSuccess,
  setHasAddedToCart,
  setSelectedColor,
  setSelectedSize,
} from "app/store/configuratorSlice";
import { XIcon } from "@heroicons/react/outline";
import qs from "qs";
import update from "lodash/update";
import xor from "lodash/xor";
import set from "lodash/set";
import includes from "lodash/includes";
import debounce from "lodash/debounce";
import toNumber from "lodash/toNumber";
import isEmpty from "lodash/isEmpty";
import isString from "lodash/isString";
import capitalize from "lodash/capitalize";
import concat from "lodash/concat";
import startsWith from "lodash/startsWith";
import { addConfiguredBikeToCart, getAvailableColorsBySize, getBikeConfiguratorData } from "app/api/configurator";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import { addToCartPending, getCartPending } from "app/store/cartServer";
import { addToCart, setModalCart } from "app/store/cartSlice";
import { toast } from "react-toastify";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import { postUpgradesCheckoutData } from "app/api/checkout/upgrades";
import {
  CONFIGURATOR_EDIT_CART_MODE,
  CONFIGURATOR_EDIT_ORDER_MODE,
  CONFIGURATOR_EDIT_UPGRADE_MODE,
} from "app/constants/configuratorModes";
import { toTitleCase } from "functions/convertors";
import { commafy } from "functions/numbers";
import { COLOR_TYPES } from "app/constants/colorTypes";

const ConfiguratorCompareButton = dynamic(() => import("./ConfiguratorCompareButton"), { ssr: false });
const ConfiguratorFilterMobile = dynamic(() => import("@/components/configurator/filter/ConfiguratorFilterMobile"), {
  ssr: false,
});
const ConfiguratorBikeSkeleton = dynamic(
  () => import("@/components/Atoms/skeletonLoading/configurator/ConfiguratorBikeSkeleton"),
  { ssr: false }
);
const MultiRange = dynamic(() => import("@/components/Atoms/inputs/MultiRange"), { ssr: false });

export default function ConfiguratorMain({ bikes, filters, isInventory }) {
  const [showModal, setShowModal] = useState(false);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [idBikeModal, setIdBikeModal] = useState(null);

  const [arrayDataModal, setArrayDataModal] = useState(null);

  const [loadingModal, setLoadingModal] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);

  const [availableArrayColors, setAvailableArrayColors] = useState(null);

  const [totalPriceModal, setTotalPriceModal] = useState(null);
  const [totalPriceModalColor, setTotalPriceModalColor] = useState(null);

  // const isUserLoggedIn = useSelector((state) => state?.auth.isUserLoggedIn);
  const cartData = useSelector((state) => state?.cartServer?.cartData);

  const router = useRouter();
  const dispatch = useDispatch();
  const bikesFilters = useSelector((state) => state?.configurator?.bikesFilters);
  const bikesFilterIsLoading = useSelector((state) => state?.configurator?.bikesFilterIsLoading);
  const bikesFilterError = useSelector((state) => state?.configurator?.bikesFilterError);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const queryObject = useMemo(() => qs.parse(router.query), [router.query]);
  const allBikes = useMemo(
    () => (!isEmpty(queryObject) ? bikesFilters?.bikes : bikes),
    [queryObject, bikesFilters?.bikes, bikes]
  );

  const bikeModels = useMemo(
    () => concat([{ title: "All Models", id: null }], (bikesFilters?.filters || filters)?.bike_models),
    [bikesFilters?.filters, filters]
  );
  const motorsList = useMemo(
    () => concat([{ title: "All Motors", id: null }], (bikesFilters?.filters || filters)?.motors),
    [bikesFilters?.filters, filters]
  );
  const batteriesList = useMemo(
    () => concat([{ title: "All Battries", id: null }], (bikesFilters?.filters || filters)?.batteries),
    [bikesFilters?.filters, filters]
  );
  const frameSizesList = useMemo(
    () => concat([{ title: "All Frame Size", id: null }], (bikesFilters?.filters || filters)?.frame_sizes),
    [bikesFilters?.filters, filters]
  );
  const suspensionList = useMemo(
    () => concat(["All Suspension"], (bikesFilters?.filters || filters)?.suspension),
    [bikesFilters?.filters, filters]
  );
  const tireSizeList = useMemo(
    () => concat(["All Tire Size"], (bikesFilters?.filters || filters)?.tire_size),
    [bikesFilters?.filters, filters]
  );

  useEffect(() => {
    if (isEmpty(bikes) || !filters || !isEmpty(queryObject))
      dispatch(getBikesFiltersPending({ queryObject, isInventory }));
    else if (isEmpty(queryObject)) dispatch(getBikesFiltersSuccess(null));
  }, [queryObject]);

  const toggleQuery = (key, item) => {
    const newQuery = { ...queryObject };
    if (startsWith(item, "All ") || item === null) delete newQuery[key];
    else update(newQuery, key, (data) => xor(data && isString(data) ? [data] : data || [], [item?.toString()]));
    router.push(
      {
        pathname: isInventory ? "/bikes" : "/configurator",
        query: newQuery,
      },
      undefined,
      {
        shallow: true,
        scroll: true,
      }
    );
  };

  const removeFilters = () => {
    router.push(
      {
        pathname: isInventory ? "/bikes" : "/configurator",
      },
      undefined,
      {
        shallow: true,
        scroll: true,
      }
    );
  };

  const updateRangeQuery = debounce((key, value) => {
    const newQuery = { ...queryObject };
    set(newQuery, `min_${key}`, value?.[0]);
    set(newQuery, `max_${key}`, value?.[1]);
    router.push(
      {
        pathname: isInventory ? "/bikes" : "/configurator",
        query: newQuery,
      },
      undefined,
      {
        shallow: true,
        scroll: true,
      }
    );
  }, 700);

  const hasQuery = (key, item) => {
    const val = queryObject?.[key];
    if ((startsWith(item, "All ") || item === null) && !val) return true;
    return isString(val) ? val == item : includes(val, item?.toString());
  };

  const getRange = (key, type) => toNumber((bikesFilters?.filters || filters)?.[key]?.[type]);

  const getLabel = (key) => `${capitalize(key)} (${(bikesFilters?.filters || filters)?.[key]?.unit})`;

  const getRangeValue = (key) => {
    return [
      toNumber(queryObject?.[`min_${key}`] || (bikesFilters?.filters || filters)?.[key]?.["min"]),
      toNumber(queryObject?.[`max_${key}`] || (bikesFilters?.filters || filters)?.[key]?.["max"]),
    ];
  };

  const showModalQuickView = (id) => {
    setShowModal(true);
    setIdBikeModal(id);
    setLoadingModal(true);
  };
  // const showByNowQuickView = async (id) => {
  //   setIsBuyNow(true);
  //   setIdBikeModal(id);
  //   // handleCheckoutClick();
  // };

  useEffect(async () => {
    if (idBikeModal && showModal) {
      const resultModal = await getBikeConfiguratorData(idBikeModal);
      setArrayDataModal(resultModal);
      setLoadingModal(false);
      setTotalPriceModal(Number(resultModal?.data?.variation?.price));
    }
  }, [idBikeModal, showModal]);
  // useEffect(async () => {
  //   if (idBikeModal && isBuyNow) {
  //     const resultModal = await getBikeConfiguratorData(idBikeModal);
  //     setArrayDataModal(resultModal);
  //     debugger;
  //   }
  // }, [idBikeModal, isBuyNow]);

  const handlePushDetails = () => {
    setShowModal(false);
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    router.push(`/${isInventory ? "bikes" : "configurator"}/${idBikeModal}`);
  };

  const handleCloseBlurDrop = () => {
    setShowModal(false);
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    setArrayDataModal(null);
  };

  const handleSizeClick = async (e) => {
    setSelectedSize(e);
  };

  const handleColorClick = (e) => {
    setSelectedColor(e);
  };

  useEffect(() => {
    if (arrayDataModal && selectedColor) {
      let totalPriceModalColor = totalPriceModal;
      for (let i = 0; i < COLOR_TYPES.length; i++) {
        if (COLOR_TYPES[i] === selectedColor.type) {
          totalPriceModalColor += +arrayDataModal?.data?.price_colors[COLOR_TYPES[i]];
          break;
        }
      }
      setTotalPriceModalColor(totalPriceModalColor);
    }
  }, [selectedColor, arrayDataModal, totalPriceModal]);
  const ADD_TO_CART_BUTTON = "add-to-cart-button";
  const CONTINUE_TO_CHECKOUT_BUTTON = "continue-to-checkout-button";

  // A boolean stating user login status
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const totalPrice = useSelector((state) => state.configurator.totalPrice);

  const selectedUpgrades = useSelector((state) => state.configurator.upgrades);
  const configuratorMode = useSelector((state) => state.configurator.mode);
  const configuratorData = useSelector((state) => state.configurator.configuratorData);
  const preUpgradeParts = useSelector((state) => state.configurator.preUpgrades?.parts);
  const hasAddedToCart = useSelector((state) => state.configurator.hasAddedToCart);

  // State to indicate loading of the #add-to-cart-button
  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);
  // State to indicate loading of the #continue-to-checkout-button
  const [isContinueToCheckoutLoading, setIsContinueToCheckoutLoading] = useState(false);

  // const handleBuyNow = () => {};

  const handleCheckoutClick = async (e) => {
    e.preventDefault();
    const upgrades = selectedUpgrades.map((upgrade) => upgrade.id);

    const clickedButtonID = e.currentTarget.id;

    const dataToPostToServer = {
      items: {
        variation_id: arrayDataModal?.data?.variation?.id,
        color_id: selectedColor?.id,
        size_id: selectedSize?.id,
        upgrades: upgrades,
      },
      product_id: arrayDataModal?.data?.product?.id,
      count: 1,
    };

    if (!isUserLoggedIn) {
      if (
        clickedButtonID === ADD_TO_CART_BUTTON ||
        (!hasAddedToCart && clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON)
      ) {
        // Extracting upgrade objects to save into local storage, so we can show its data in cart modal
        let equipmentPrice = 0;
        let bikeFakeId = "" + arrayDataModal?.data?.variation.id;
        for (let category of arrayDataModal?.data?.parts) {
          for (let upgrade of category.upgrades) {
            if (upgrades.includes(upgrade.id)) {
              equipmentPrice += totalPriceModal;
              bikeFakeId += upgrade.id;
            }
          }
        }

        bikeFakeId += Math.random();

        const objectToSave = {
          server: dataToPostToServer,

          title: toTitleCase(arrayDataModal?.data?.product?.title),
          price: totalPriceModalColor ? totalPriceModalColor : totalPriceModal,
          // thumbnail: arrayDataModal?.data?.image,
          thumbnail: selectedColor?.pivot?.image_path,
          description: arrayDataModal?.data?.product.description,
          product: arrayDataModal?.data?.product,
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

          upgradesCheckoutData.upgrades = upgrades.filter((part) => !preUpgradePartIDs.includes(part));

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

          if (configuratorMode === CONFIGURATOR_EDIT_CART_MODE) toast.success("Changes were applied successfully.");
          else {
            toast.success("The bike was added to cart successfully.");
            dispatch(setModalCart({ open: true }));
          }
        }

        if (clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON) router.push("/cart/checkout");
      } catch (error) {
        toast.error("Couldn't add bike to cart. Try again later.");
      }

      setIsAddToCartLoading(false);
    }
  };
  const handleBuyNow = async (e, itemBuy) => {
    e.preventDefault();
    const upgrades = selectedUpgrades.map((upgrade) => upgrade.id);

    const clickedButtonID = e.currentTarget.id;
    const resultModal = await getBikeConfiguratorData(itemBuy);
    setArrayDataModal(resultModal);
    setLoadingModal(false);
    setTotalPriceModal(Number(resultModal?.data?.variation?.price));
    setSelectedSize(resultModal?.data?.sizes[0]);
    const newColors = await getAvailableColorsBySize(resultModal?.data?.product?.id, selectedSize?.id);
    setAvailableArrayColors(newColors);
    setSelectedColor(newColors?.available?.Standard[0]);
    const dataToPostToServer = {
      items: {
        variation_id: resultModal?.data?.variation?.id,
        color_id: selectedColor?.id,
        size_id: selectedSize?.id,
        upgrades: upgrades,
      },
      product_id: arrayDataModal?.data?.product?.id,
      count: 1,
    };

    if (!isUserLoggedIn) {
      if (
        clickedButtonID === ADD_TO_CART_BUTTON ||
        (!hasAddedToCart && clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON)
      ) {
        // Extracting upgrade objects to save into local storage, so we can show its data in cart modal
        let equipmentPrice = 0;
        let bikeFakeId = "" + arrayDataModal?.data?.variation.id;
        for (let category of arrayDataModal?.data?.parts) {
          for (let upgrade of category.upgrades) {
            if (upgrades.includes(upgrade.id)) {
              equipmentPrice += totalPriceModal;
              bikeFakeId += upgrade.id;
            }
          }
        }

        bikeFakeId += Math.random();

        const objectToSave = {
          server: dataToPostToServer,

          title: toTitleCase(arrayDataModal?.data?.product?.title),
          price: totalPriceModalColor ? totalPriceModalColor : totalPriceModal,
          // thumbnail: arrayDataModal?.data?.image,
          thumbnail: selectedColor?.pivot?.image_path,
          description: arrayDataModal?.data?.product.description,
          product: arrayDataModal?.data?.product,
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

          upgradesCheckoutData.upgrades = upgrades.filter((part) => !preUpgradePartIDs.includes(part));

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

          if (configuratorMode === CONFIGURATOR_EDIT_CART_MODE) toast.success("Changes were applied successfully.");
          else {
            toast.success("The bike was added to cart successfully.");
            dispatch(setModalCart({ open: true }));
          }
        }

        if (clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON) router.push("/cart/checkout");
      } catch (error) {
        toast.error("Couldn't add bike to cart. Try again later.");
      }

      setIsAddToCartLoading(false);
    }
  };

  // const handleBuyNow = async (e, itemBuy) => {
  //   e.preventDefault();
  //   const upgrades = selectedUpgrades.map((upgrade) => upgrade.id);

  //   const clickedButtonID = e.currentTarget.id;

  //   const resultModal = await getBikeConfiguratorData(itemBuy);

  //   const dataToPostToServer = {
  //     items: {
  //       variation_id: resultModal?.data?.variation?.id,
  //       color_id: selectedColor?.id,
  //       size_id: selectedSize?.id,
  //       upgrades: upgrades,
  //     },
  //     product_id: resultModal?.data?.product?.id,
  //     count: 1,
  //   };
  //   debugger;
  //   if (!isUserLoggedIn) {
  //     if (
  //       clickedButtonID === ADD_TO_CART_BUTTON ||
  //       (!hasAddedToCart && clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON)
  //     ) {
  //       // Extracting upgrade objects to save into local storage, so we can show its data in cart modal
  //       let equipmentPrice = 0;
  //       let bikeFakeId = "" + resultModal?.data?.variation.id;
  //       for (let category of resultModal?.data?.parts) {
  //         for (let upgrade of category.upgrades) {
  //           if (upgrades.includes(upgrade.id)) {
  //             equipmentPrice += totalPriceModal;
  //             bikeFakeId += upgrade.id;
  //           }
  //         }
  //       }

  //       bikeFakeId += Math.random();

  //       const objectToSave = {
  //         server: dataToPostToServer,

  //         title: toTitleCase(resultModal?.data?.product?.title),
  //         price: totalPriceModalColor ? totalPriceModalColor : totalPriceModal,
  //         // thumbnail: resultModal?.data?.image,
  //         thumbnail: selectedColor?.pivot?.image_path,
  //         description: resultModal?.data?.product.description,
  //         product: resultModal?.data?.product,
  //         color: selectedColor,
  //         size: selectedSize,
  //         upgrades: upgrades,
  //         type: "bike",
  //         id: bikeFakeId,
  //       };

  //       dispatch(addToCart(objectToSave));

  //       if (clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON)
  //         router.push("/cart/checkout");
  //     }
  //   } else {
  //     if (clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON)
  //       setIsContinueToCheckoutLoading(true);
  //     else if (clickedButtonID === ADD_TO_CART_BUTTON) {
  //       dispatch(setHasAddedToCart(true));
  //       setIsAddToCartLoading(true);
  //     }

  //     if (configuratorMode === CONFIGURATOR_EDIT_CART_MODE) {
  //       const { cartID } = router.query;
  //       if (cartID) dispatch(removeCartItemPending(+cartID));
  //     } else if (
  //       configuratorMode === CONFIGURATOR_EDIT_ORDER_MODE ||
  //       configuratorMode === CONFIGURATOR_EDIT_UPGRADE_MODE
  //     ) {
  //       const { orderBikeID } = router.query;
  //       if (orderBikeID) {
  //         const upgradesCheckoutData = {
  //           order_bike_id: +orderBikeID,
  //         };

  //         const preUpgradePartIDs = preUpgradeParts.map((part) => part.part_id);

  //         upgradesCheckoutData.upgrades = upgrades.filter(
  //           (part) => !preUpgradePartIDs.includes(part)
  //         );

  //         if (upgradesCheckoutData.upgrades.length === 0) {
  //           toast.info("You haven't selected any new upgrades.");
  //           setIsAddToCartLoading(false);
  //           setIsContinueToCheckoutLoading(false);
  //           return;
  //         }

  //         try {
  //           const res = await postUpgradesCheckoutData(upgradesCheckoutData);
  //           sessionStorage.setItem(
  //             checkoutKeys.UPGRADES_CHECKOUT_DATA,
  //             JSON.stringify(res.data)
  //           );
  //           router.push("/cart/checkout/upgrades");
  //           if (configuratorMode === CONFIGURATOR_EDIT_ORDER_MODE)
  //             toast.success("The upgrade(s) were added to cart successfully.");
  //           else if (configuratorMode === CONFIGURATOR_EDIT_UPGRADE_MODE)
  //             toast.success("The upgrade(s) were updated successfully.");
  //         } catch (error) {
  //           toast.error("Sorry, there was an error processing your request.");
  //         }
  //       }

  //       setIsAddToCartLoading(false);

  //       return;
  //     }

  //     /**
  //      * configuratorMode === CONFIGURATOR_EDIT_ORDER_MODE
  //      * configuratorMode === CONFIGURATOR_EDIT_UPGRADE_MODE
  //      * will NOT reach here
  //      */

  //     try {
  //       if (
  //         clickedButtonID === ADD_TO_CART_BUTTON ||
  //         (clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON && !hasAddedToCart)
  //       ) {
  //         await addConfiguredBikeToCart(dataToPostToServer);

  //         dispatch(getCartPending());

  //         if (configuratorMode === CONFIGURATOR_EDIT_CART_MODE)
  //           toast.success("Changes were applied successfully.");
  //         else {
  //           toast.success("The bike was added to cart successfully.");
  //           dispatch(setModalCart({ open: true }));
  //         }
  //       }

  //       if (clickedButtonID === CONTINUE_TO_CHECKOUT_BUTTON)
  //         router.push("/cart/checkout");
  //     } catch (error) {
  //       toast.error("Couldn't add bike to cart. Try again later.");
  //     }

  //     setIsAddToCartLoading(false);
  //   }
  // };

  // useEffect(() => (async () => await getAvailableColorsBySize({
  //   productId: arrayDataModal?.data?.product?.id,
  //   sizeId: selectedSize?.id,
  // })), [selectedSize])

  useEffect(async () => {
    if (selectedSize && arrayDataModal) {
      const newColors = await getAvailableColorsBySize(arrayDataModal?.data?.product?.id, selectedSize?.id);
      setAvailableArrayColors(newColors);
      setSelectedColor(newColors?.available?.Standard[0]);
    }
  }, [selectedSize, arrayDataModal]);

  useMemo(async () => {
    if (showModal && arrayDataModal) {
      setSelectedSize(arrayDataModal?.data?.sizes[0]);
      console.log(selectedSize);
    }
  }, [showModal, arrayDataModal]);
  useMemo(async () => {
    if (isBuyNow && arrayDataModal) {
      setSelectedSize(arrayDataModal?.data?.sizes[0]);
      console.log(selectedSize);
    }
  }, [isBuyNow, arrayDataModal]);

  // useMemo(() => {
  //   if (availableArrayColors&&arrayDataModal) {
  //     console.log(availableArrayColors);

  //     setSelectedColor(availableArrayColors?.available?.Standard[0]);
  //     console.log("SelectedColor", selectedColor);

  //
  //   }
  // }, [availableArrayColors,arrayDataModal]);

  // console.log(totalPrice);
  //

  return (
    <>
      <ConfiguratorFilterMobile
        filters={filters}
        bikesFilters={bikesFilters}
        getLabel={getLabel}
        getRange={getRange}
        getRangeValue={getRangeValue}
        hasQuery={hasQuery}
        bikeModels={bikeModels}
        frameSizesList={frameSizesList}
        tireSizeList={tireSizeList}
        setMobileFiltersOpen={setMobileFiltersOpen}
        updateRangeQuery={updateRangeQuery}
        suspensionList={suspensionList}
        batteriesList={batteriesList}
        toggleQuery={toggleQuery}
        mobileFiltersOpen={mobileFiltersOpen}
        motorsList={motorsList}
      />
      <div className="max-w-5xl px-4 pb-16 mx-auto sm:pb-24 sm:px-6 md:w-4/5 lg:max-w-7xl lg:px-8">
        <div className="px-2 py-16 leading-10 text-center">
          <h2 className="text-3xl font-light text-gray-600 sm:text-4xl text center">
            Build your own customized Nireeka ebike
          </h2>
          <div>
            <h3 className="inline font-light text-black sm:text-xl text center ">{`Not sure which to pick? `}</h3>
            <Link href="/compare">
              <a className="inline font-light text-gray-500 transition ease-in sm:text-xl text center hover:text-customColorNIR ">{`Compare Here`}</a>
            </Link>
          </div>
        </div>
        <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 className="sr-only">Filters</h2>
            <div className="flex flex-row justify-between items-center">
              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-xl font-light text-gray-700">Filters</span>
                <PlusSmIcon className="flex-shrink-0 w-5 h-5 ml-1 text-gray-400" aria-hidden="true" />
              </button>
              {!isEmpty(queryObject) && (
                <button type="button" className="inline-flex items-center lg:hidden" onClick={removeFilters}>
                  <XIcon className="flex-shrink-0 w-3 h-3 mr-1 text-red-400" aria-hidden="true" />
                  <span className="text-sm font-light text-red-600">Remove Filters</span>
                </button>
              )}
            </div>

            <div className="hidden lg:block">
              {!isEmpty(queryObject) && (
                <button type="button" className="inline-flex items-center" onClick={removeFilters}>
                  <XIcon className="flex-shrink-0 w-3 h-3 mr-1 text-red-400" aria-hidden="true" />
                  <span className="text-sm font-light text-red-600">Remove Filters</span>
                </button>
              )}
              <form className="space-y-5 divide-y divide-gray-200">
                <div key="Model">
                  <fieldset>
                    <legend className="block font-light text-gray-900 pt-6">Model</legend>
                    <div className="pt-6 space-y-3">
                      {bikeModels?.map((model, optionIdx) => (
                        <div key={model.id} className="flex items-center font-light">
                          <input
                            id={`${model.id}-${optionIdx}`}
                            name={model.title}
                            value={model.id}
                            onChange={() => toggleQuery("model", model.id)}
                            type="checkbox"
                            checked={hasQuery("model", model.id)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`${model.id}-${optionIdx}`}
                            className="ml-3 text-sm font-light text-gray-600 cursor-pointer"
                          >
                            {model.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                {(bikesFilters?.filters || filters)?.price && (
                  <MultiRange
                    label={getLabel("price")}
                    name="price"
                    min={getRange("price", "min")}
                    max={getRange("price", "max")}
                    defaultValue={getRangeValue("price")}
                    className="pt-4"
                    onChange={(value) => updateRangeQuery("price", value)}
                  />
                )}
                {(bikesFilters?.filters || filters)?.speed && (
                  <MultiRange
                    label={`max ${getLabel("speed")}`}
                    name="speed"
                    min={getRange("speed", "min")}
                    max={getRange("speed", "max")}
                    defaultValue={getRangeValue("speed")}
                    className="pt-4"
                    onChange={(value) => updateRangeQuery("speed", value)}
                  />
                )}
                {(bikesFilters?.filters || filters)?.range && (
                  <MultiRange
                    label={getLabel("range")}
                    name="range"
                    min={getRange("range", "min")}
                    max={getRange("range", "max")}
                    defaultValue={getRangeValue("range")}
                    className="pt-4"
                    onChange={(value) => updateRangeQuery("range", value)}
                  />
                )}
                {(bikesFilters?.filters || filters)?.weight && (
                  <MultiRange
                    label={getLabel("weight")}
                    name="weight"
                    min={getRange("weight", "min")}
                    max={getRange("weight", "max")}
                    defaultValue={getRangeValue("weight")}
                    className="pt-4"
                    onChange={(value) => updateRangeQuery("weight", value)}
                  />
                )}
                <div className="mt-10 space-y-10 divide-y divide-gray-200">
                  <div key="Motor">
                    <fieldset>
                      <legend className="block font-light text-gray-900 pt-6">Motor</legend>
                      <div className="pt-6 space-y-3">
                        {motorsList?.map((motor, optionIdx) => (
                          <div key={motor.id} className="flex items-center font-light">
                            <input
                              id={`${motor.id}-${optionIdx}`}
                              name={motor.title}
                              value={motor.id}
                              onChange={() => toggleQuery("motor", motor.title)}
                              type="checkbox"
                              checked={hasQuery("motor", motor.title)}
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`${motor.id}-${optionIdx}`}
                              className="ml-3 text-sm font-light text-gray-600 cursor-pointer"
                            >
                              {motor.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className="mt-10 space-y-10 divide-y divide-gray-200">
                  <div key="Battry">
                    <fieldset>
                      <legend className="block pt-5 font-light text-gray-900 text-1remi">Battry</legend>
                      <div className="pt-6 space-y-3">
                        {batteriesList?.map((battery, optionIdx) => (
                          <div key={battery.id} className="flex items-center font-light">
                            <input
                              id={`${battery.id}-${optionIdx}`}
                              name={`${battery.id}[]`}
                              value={battery.id}
                              onChange={() => toggleQuery("battery", battery.title)}
                              checked={hasQuery("battery", battery.title)}
                              type="checkbox"
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`${battery.id}-${optionIdx}`}
                              className="ml-3 text-sm font-light text-gray-600 cursor-pointer"
                            >
                              {battery.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                  {/* ))} */}
                </div>
                <div className="mt-10 space-y-10 divide-y divide-gray-200">
                  <div key="sizes">
                    <fieldset>
                      <legend className="block pt-5 font-light text-gray-900 text-1remi">Size</legend>
                      <div className="pt-6 space-y-3">
                        {frameSizesList?.map((size, optionIdx) => (
                          <div key={size.id} className="flex items-center font-light">
                            <input
                              id={`${size.id}-${optionIdx}`}
                              name={`${size.id}[]`}
                              value={size.id}
                              onChange={() => toggleQuery("size", size.title)}
                              checked={hasQuery("size", size.title)}
                              type="checkbox"
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`${size.id}-${optionIdx}`}
                              className="ml-3 text-sm font-light text-gray-600 cursor-pointer"
                            >
                              {size.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                  {/* ))} */}
                </div>
                <div className="mt-10 space-y-10 divide-y divide-gray-200">
                  <div key="suspension">
                    <fieldset>
                      <legend className="block pt-5 font-light text-gray-900 text-1remi">Suspension</legend>
                      <div className="pt-6 space-y-3">
                        {suspensionList?.map((suspension, optionIdx) => (
                          <div key={suspension} className="flex items-center font-light">
                            <input
                              id={`${suspension}-${optionIdx}`}
                              name={`${suspension}[]`}
                              value={suspension}
                              onChange={() => toggleQuery("suspension", suspension)}
                              checked={hasQuery("suspension", suspension)}
                              type="checkbox"
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`${suspension}-${optionIdx}`}
                              className="ml-3 text-sm font-light text-gray-600 cursor-pointer"
                            >
                              {suspension}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                  {/* ))} */}
                </div>
                <div className="mt-10 space-y-10 divide-y divide-gray-200">
                  <div key="suspension">
                    <fieldset>
                      <legend className="block pt-5 font-light text-gray-900 text-1remi">Tire Size</legend>
                      <div className="pt-6 space-y-3">
                        {tireSizeList?.map((tireSize, optionIdx) => (
                          <div key={tireSize} className="flex items-center font-light">
                            <input
                              id={`${tireSize}-${optionIdx}`}
                              name={`${tireSize}[]`}
                              value={tireSize}
                              onChange={() => toggleQuery("tire_size", tireSize)}
                              checked={hasQuery("tire_size", tireSize)}
                              type="checkbox"
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`${tireSize}-${optionIdx}`}
                              className="ml-3 text-sm font-light text-gray-600 cursor-pointer"
                            >
                              {tireSize}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                  {/* ))} */}
                </div>
              </form>
            </div>
          </aside>

          {/* Product grid */}
          <div className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3 lg:border-l border-gray-200 lg:pl-8">
            {bikesFilterIsLoading && (
              <ConfiguratorBikeSkeleton className={classNames("w-full p-4 sm:w-3/6 md:w-full xl:w-3/6", styles.cart)} />
            )}
            {!bikesFilterIsLoading && isEmpty(allBikes) && (
              <p className="font-light my-28 text-center">
                {bikesFilterError
                  ? "There was a problem in receiving the information, please try again."
                  : "No products were found. Please use fewer filters to get more results."}
              </p>
            )}
            {!bikesFilterIsLoading &&
              !isEmpty(allBikes) &&
              Object.entries(allBikes)?.map(([baseBikeTitle, variationBikes], index) => (
                <div className="flex flex-col" key={index}>
                  <h2 className="text-[1.75rem] text-left text-gray-900">{`> ${baseBikeTitle}`}</h2>
                  <div className="w-full my-5 flex flex-wrap justify-center">
                    {variationBikes?.map((item) => (
                      <div className={classNames("w-full p-4 sm:w-3/6 md:w-full xl:w-3/6", styles.cart)} key={item.id}>
                        <ConfiguratorCompareButton configuratorData={item} />
                        {item.label && (
                          <span className="pointer-events-none absolute top-3 left-3 z-10 rounded-full bg-sky-500 bg-opacity-90 py-0.5 px-1.5 text-[0.625rem] font-semibold uppercase leading-4 tracking-wide text-white">
                            {item.label}
                          </span>
                        )}
                        <div
                        // href={`/${isInventory ? "bikes" : "configurator"}/${
                        //   item.slug
                        // }`}
                        // passHref
                        >
                          <div>
                            <div className={styles.box}>
                              <Link href={`/${isInventory ? "bikes" : "configurator"}/${item.slug}`} passHref>
                                <a>
                                  <Image
                                    src={item.variation_image}
                                    alt={item.title}
                                    width={900}
                                    height={490}
                                    layout="responsive"
                                    objectFit="cover"
                                    className="rounded-l-lg "
                                  />
                                </a>
                              </Link>
                              {/* <div className="flex justify-between"> */}
                              <div className="flex justify-between">
                                <button
                                  onClick={() => showModalQuickView(item.slug)}
                                  className={`${styles.quickview} font-light cursor-pointer bg-gray-200 hover:bg-gray-100 w-full py-1 rounded-md px-1 mr-0.5`}
                                >
                                  Quick View
                                </button>
                                <Link href={`/${isInventory ? "bikes" : "configurator"}/${item.slug}`} passHref>
                                  <a
                                    className={`${styles.quickview} ml-0.5 font-light  flex justify-center items-center cursor-pointer disabled:cursor-not-allowed border border-white hover:border-nireekaGreen bg-nireekaGreen hover:text-nireekaGreen hover:bg-transparent text-white w-full py-1 rounded-md px-1`}
                                  >
                                    buy Now
                                  </a>
                                </Link>
                              </div>
                            </div>
                            <Link href={`/${isInventory ? "bikes" : "configurator"}/${item.slug}`} passHref>
                              <a>
                                {" "}
                                <div className="mx-auto leading-8 ">
                                  <div className="text-center">
                                    <p className="inline text-xl font-light ">{item.title}</p>
                                    <p className="inline text-xl font-light text-gray-500">{` ${item.variation}`}</p>
                                  </div>
                                  <p className="text-center text-gray-500 font-extralight">
                                    {` ${item?.variation_details?.speed_text}`}
                                    {` / `}
                                    {item?.variation_details?.range_text}
                                  </p>
                                  <div className="text-center pt-1.5">
                                    <p className="inline p-1 text-lg text-gray-500 font-extralight">{`From `}</p>
                                    <p className="inline text-xl font-normal text-green-500">{` ${item?.price}`}</p>
                                    {item.retail_price && item.retail_price != "$0" && (
                                      <div className="relative inline-block mx-2">
                                        <p className="inline text-xl text-gray-500 line-through font-extralight">
                                          {` ${item.retail_price}`}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          {/* modal */}
          <BlurBackdrop
            isVisible={showModal}
            noXButton
            onClose={() => handleCloseBlurDrop()}
            backdropMode="dark"
            className="w-full md:w-[60%]"
            customStyle={{ zIndex: 100 }}
          >
            {arrayDataModal && showModal ? (
              <>
                <WhiteShadowCard className="flex justify-center">
                  <div>
                    <div>
                      <button
                        type="button"
                        className="absolute right-4 top-2 text-gray-400 hover:text-gray-500 z-20 sm:right-6 md:hidden "
                        onClick={() => handleCloseBlurDrop()}
                      >
                        <span className="sr-only">Close</span>
                        Close
                      </button>
                      <button
                        type="button"
                        className="absolute hidden md:flex right-4 top-2 text-gray-400 hover:text-gray-500 z-20 sm:right-6 "
                        onClick={() => handleCloseBlurDrop()}
                      >
                        <svg
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>

                      <div className="grid relative w-full grid-cols-1 items-center gap-x-6 gap-y-8 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                        <div className=" relative aspect-h-3 aspect-w-2 overflow-hidden rounded-lg sm:col-span-4 lg:col-span-5">
                          <div className="flex justify-center">
                            {" "}
                            {/* <Image
                              src={arrayDataModal?.data?.image}
                              alt={arrayDataModal?.data?.product?.title}
                              objectPosition="center"
                              width={400}
                              height={285} */}
                            {/* /> */}
                            <img
                              alt="bike"
                              className="w-full select-none"
                              src={selectedColor ? selectedColor?.pivot.image_path : arrayDataModal?.data?.image}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-8 lg:col-span-7">
                          <h2 className="text-xl font-medium text-gray-900 sm:pr-12">
                            {arrayDataModal?.data?.product?.title}
                            <span className="font-light text-gray-700">
                              {` ${arrayDataModal?.data?.variation?.name}`}
                            </span>
                          </h2>

                          <section aria-labelledby="information-heading" className="mt-1">
                            <h3 id="information-heading" className="sr-only">
                              Product information
                            </h3>

                            <p className="font-medium text-lg text-gray-900">
                              {arrayDataModal?.data?.variation?.sign}
                              {commafy(totalPriceModalColor ? totalPriceModalColor : totalPriceModal)}
                            </p>

                            {/* Reviews */}
                            <div className="mt-4">
                              <h4 className="sr-only">Reviews</h4>
                              <div className="flex items-center">
                                <p className="text-sm text-gray-700">
                                  {/* {product.rating} */}
                                  Rating
                                  <span className="sr-only"> out of 5 stars</span>
                                </p>
                                <div className="ml-1 flex items-center">
                                  {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                      key={rating}
                                      className={classNames(
                                        arrayDataModal?.data?.rating_value > rating
                                          ? "text-yellow-400"
                                          : "text-gray-200",
                                        "h-5 w-5 flex-shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                  ))}
                                </div>
                                <div className="ml-2 flex lg:items-center">
                                  <span className="text-gray-300" aria-hidden="true">
                                    &middot;
                                  </span>
                                  <p
                                    // href="#"
                                    className="ml-0 text-sm font-light text-indigo-600 hover:text-indigo-500"
                                  >
                                    {/* See all {product.reviewCount} reviews */}( {arrayDataModal?.data.count_reviews}{" "}
                                    reviews)
                                  </p>
                                </div>
                              </div>
                            </div>
                          </section>

                          <section aria-labelledby="options-heading" className="mt-8">
                            <h3 id="options-heading" className="sr-only">
                              Product options
                            </h3>

                            <form>
                              {/* Size picker */}
                              <div className="mt-8">
                                {/* <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium text-gray-900">
                                    Size
                                  </h4>
                                  <a
                                    href="#"
                                    className="text-sm font-light text-indigo-600 hover:text-indigo-500"
                                  >
                                    Size guide
                                  </a>
                                </div> */}

                                <RadioGroup value={selectedSize} onChange={handleSizeClick} className="mt-2">
                                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                  <div className="grid grid-cols-5 gap-2">
                                    {arrayDataModal?.data?.sizes.map((size) => (
                                      <RadioGroup.Option
                                        key={size.id}
                                        value={size}
                                        // active={}
                                        className={`${
                                          size.id === selectedSize?.id ? "ring-2 ring-indigo-500 ring-offset-2" : ""
                                        }
                                            flex items-center cursor-pointer justify-center rounded-md border py-1.5 px-0.5 text-sm font-medium uppercase sm:flex-1`}
                                        // disabled={!size.inStock}
                                      >
                                        <RadioGroup.Label as="span">{size.title2}</RadioGroup.Label>
                                      </RadioGroup.Option>
                                    ))}
                                  </div>
                                </RadioGroup>
                              </div>

                              <RadioGroup value={selectedColor} onChange={handleColorClick}>
                                <h2 className="text-sm mt-4 font-medium text-gray-900 py-1">Colors</h2>
                                {Object.entries(
                                  availableArrayColors ? availableArrayColors?.available : arrayDataModal?.data?.colors
                                ).map(([type, colors]) => {
                                  // console.log(colors);
                                  // console.log(selectedColor);
                                  //

                                  return (
                                    <div key={type} className="pt-4">
                                      <h3 className="text-sm">
                                        {type}

                                        <span>
                                          ($
                                          {arrayDataModal?.data?.price_colors[type]}) {`:`}
                                        </span>
                                      </h3>
                                      <div className="mt-4 flex items-center space-x-3">
                                        {colors.map((color) => (
                                          <>
                                            <RadioGroup.Option
                                              key={color.id}
                                              value={color}
                                              // className={({
                                              //   active,
                                              //   checked,
                                              // }) =>
                                              //   classNames(
                                              //     color.id === selectedColor?.id
                                              //       ? "ring ring-indigo-600"
                                              //       : "",
                                              //     checked
                                              //       ? "ring ring-indigo-600"
                                              //       : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                                              //     "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                              //   )
                                              // }
                                              className={`${
                                                color.id === selectedColor?.id
                                                  ? "ring-2 ring-indigo-500 ring-offset-2"
                                                  : ""
                                              } relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none`}
                                            >
                                              <RadioGroup.Label as="span" className="sr-only">
                                                {color.title}
                                              </RadioGroup.Label>
                                              <Image
                                                height={30}
                                                width={30}
                                                src={color.image_path}
                                                alt={color.title}
                                                className="cursor-pointer object-contain rounded-full"
                                              />
                                            </RadioGroup.Option>
                                            {/* {type !== "Standard" && (
                                              <span className="text-gray-500">
                                                (+$
                                                {
                                                  arrayDataModal?.data
                                                    ?.price_colors[type]
                                                }
                                                )
                                              </span>
                                            )} */}
                                          </>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                              </RadioGroup>

                              <div className="w-full flex px-1 flex-wrap bg-white justify-start md:justify-start space-x-4 md:space-x-20 pt-4 md:pt-3">
                                {Object.entries(arrayDataModal?.data?.init_value).map(([type, init_value]) => {
                                  console.log("type", type);
                                  debugger;

                                  return (
                                    <div key={type} className="flex flex-col">
                                      <div className="font-light text-base text-gray-700">
                                        <span className="whitespace-nowrap">{type.replace(/_/g, " ")}</span>
                                      </div>
                                      <div>
                                        <p className=" text-xl ml-0.5 md:text-2xl pt-1 md:pt-0 lg:text-3xl font-light text-black group-[.sticky-performance]:text-base">
                                          {init_value}
                                          {type.toLowerCase().replace(/_/g, " ") === "weight" && (
                                            <span className="text-base font-light text-gray-700 group-[.sticky-performance]:text-sm ml-1">
                                              kg
                                            </span>
                                          )}
                                          {type.toLowerCase().replace(/_/g, " ") === "max speed" && (
                                            <span className="text-base font-light text-gray-700 group-[.sticky-performance]:text-sm ml-1">
                                              km/h
                                            </span>
                                          )}
                                          {type.toLowerCase().replace(/_/g, " ") === "range" && (
                                            <span className="text-base font-light text-gray-700 group-[.sticky-performance]:text-sm ml-1">
                                              km
                                            </span>
                                          )}
                                        </p>
                                        {/* <span className="text-base font-light text-gray-700 group-[.sticky-performance]:text-sm"></span> */}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* {isUserLoggedIn ? (
                                <button
                                  onClick={(e) => handleAddToCartServer(e)}
                                  type="submit"
                                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  Add to Cart
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => handleAddToCart(e, product)}
                                  type="submit"
                                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  Add to Cart
                                </button>
                              )} */}

                              {/* <button
                            type="submit"
                            className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            add to cart
                          </button> */}
                              <button
                                id={ADD_TO_CART_BUTTON}
                                onClick={handleCheckoutClick}
                                className={classNames(
                                  "flex justify-center items-center w-full cursor-pointer rounded-xl mt-4 py-2 px-4 disabled:cursor-not-allowed",
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
                                {isAddToCartLoading && <LoadingNireeka className="w-5 h-5 mr-3 border-nireekaGreen" />}
                                <span className="text-base font-medium whitespace-nowrap">
                                  {configuratorMode === CONFIGURATOR_EDIT_CART_MODE ? "Save changes" : "Add to Cart"}
                                </span>
                              </button>

                              <div
                                // href={`/${isInventory ? "bikes" : "configurator"}/${
                                //   idBikeModal
                                // }`}
                                // passHref
                                onClick={() => handlePushDetails()}
                              >
                                <div className="mt-6 w-full text-center cursor-pointer">
                                  <p className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                    View full details
                                  </p>
                                </div>
                              </div>
                              {/* <button
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
                                disabled={
                                  isAddToCartLoading ||
                                  isContinueToCheckoutLoading
                                }
                              >
                                {isAddToCartLoading && (
                                  <LoadingNireeka className="w-5 h-5 mr-3 border-nireekaGreen" />
                                )}
                                <span className="text-base font-medium whitespace-nowrap">
                                  {configuratorMode ===
                                  CONFIGURATOR_EDIT_CART_MODE
                                    ? "Save changes"
                                    : "Add to Cart"}
                                </span>
                              </button> */}
                            </form>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </WhiteShadowCard>
              </>
            ) : (
              <>
                <WhiteShadowCard className="flex justify-center">
                  <div>
                    <LoadingNireeka className="w-12 h-12 border-gray-600" />
                  </div>
                </WhiteShadowCard>
              </>
            )}
          </BlurBackdrop>
        </div>
      </div>
      <Footer />
    </>
  );
}
