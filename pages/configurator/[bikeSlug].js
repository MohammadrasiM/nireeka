import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBikeConfiguratorData } from "../../app/api/configurator";
import { toast } from "react-toastify";
import {
  callGetAvailableColorsBySize,
  resetConfiguratorState,
  setConfiguratorData,
  setInitialPerformance,
  setMode,
  setNewSelectedPart,
  setPreUpgradePartsPrice,
  setPreUpgrades,
  setSelectedSize,
  setTotalPrice,
  setUpgradesInCart,
  toggleSelectedMultiplePart,
} from "../../app/store/configuratorSlice";
import ConfiguratorFooter from "@/components/configurator/footer/ConfiguratorFooter";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
import { getBikeUpgradesByCartId, getBikeUpgradesByOrderId } from "app/api/configurator/edit";
import { getPreUpgradeMap, toTitleCase } from "functions/convertors";
import {
  CONFIGURATOR_EDIT_CART_MODE,
  CONFIGURATOR_EDIT_ORDER_MODE,
  CONFIGURATOR_EDIT_UPGRADE_MODE,
  CONFIGURATOR_NORMAL_MODE,
} from "app/constants/configuratorModes";
import { ConfiguratorSkeleton } from "@/components/Atoms/skeletonLoading/configurator/ConfiguratorSkeleton";
import Head from "next/head";
import useWindowSize from "hooks/useWindowSize";
import { configuratorKeys } from "app/constants/localStorageKeys";
import ConfiguratorFeatureTab from "@/components/configurator/content/ConfiguratorFeatureTab";
import ConfiguratorGalleryTab from "@/components/configurator/content/ConfiguratorGalleryTab";
import ConfiguratorGeometryTab from "@/components/configurator/content/ConfiguratorGeometryTab";
import ConfiguratorServiceTab from "@/components/configurator/content/ConfiguratorServiceTab";
import ConfiguratorReviewTab from "@/components/configurator/content/ConfiguratorReviewTab";
import ConfiguratorOverviewTab from "@/components/configurator/content/ConfiguratorOverviewTab";
import scrollTo from "../../functions/scrollTo";

const ConfiguratorSidebar = dynamic(() => import("@/components/configurator/ConfiguratorSidebar"), {ssr: false, loading: () => <div className="hidden md:block flex-1" />});
const ConfiguratorTab = dynamic(() => import("@/components/configurator/tab/ConfiguratorTab"), {ssr: false});

const fullConfig = resolveConfig(tailwindConfig);
const mdScreenBreakPointInPixels = parseInt(fullConfig.theme.screens.md);

export default function BikeConfigurator(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const footerRef = useRef();
  const windowSize = useWindowSize();

  const [isPageDataLoading, setIsPageDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('configuring');

  const configuratorData = useSelector((state) => state?.configurator.configuratorData);
  const preUpgrades = useSelector((state) => state?.configurator.preUpgrades);
  const upgradesInCart = useSelector((state) => state?.configurator.upgradesInCart);


  const getPageData = useCallback(async () => {
    setIsPageDataLoading(true);

    // router.query is an empty object on first render
    if (!router.isReady) return;

    try {
      const bikeConfigRes = await getBikeConfiguratorData(router.query.bikeSlug);
      dispatch(setConfiguratorData(bikeConfigRes.data));
    } catch (error) {}

    // Requesting the order upgrades, if user requested to edit it
    const { orderBikeID, cartID, mode } = router.query;
    if (mode === CONFIGURATOR_EDIT_ORDER_MODE && !!orderBikeID) {
      try {
        const response = await getBikeUpgradesByOrderId(orderBikeID);
        dispatch(setPreUpgrades(response.data));
        dispatch(setMode(CONFIGURATOR_EDIT_ORDER_MODE));
      } catch (error) {
        dispatch(setMode(CONFIGURATOR_NORMAL_MODE));
        dispatch(setPreUpgrades(null));
        // if (error?.response?.status === 404) toast.error("No order was found with this ID.");
        toast.info("Couldn't get order data to edit! Falling back to normal mode.");
        router.push(`/configurator/${router.query.bikeSlug}`);
      }
    } else if (mode === CONFIGURATOR_EDIT_CART_MODE && !!cartID) {
      try {
        const response = await getBikeUpgradesByCartId(cartID);
        dispatch(setPreUpgrades(response.data));
        dispatch(setMode(CONFIGURATOR_EDIT_CART_MODE));
      } catch (error) {
        dispatch(setMode(CONFIGURATOR_NORMAL_MODE));
        dispatch(setPreUpgrades(null));
        // if (error?.response?.status === 404) toast.error("No order was found with this ID.");
        toast.info("Couldn't get order data to edit! Falling back to normal mode.");
        router.push(`/configurator/${router.query.bikeSlug}`);
      }
    } else if (mode === CONFIGURATOR_EDIT_UPGRADE_MODE && !!orderBikeID) {
      try {
        const response = await getBikeUpgradesByOrderId(orderBikeID);

        let upgradesInCart = sessionStorage.getItem(configuratorKeys.UPGRADES_IN_CART);
        if (!!upgradesInCart) {
          upgradesInCart = JSON.parse(upgradesInCart);
          upgradesInCart = upgradesInCart.map((upgrade) => {
            return {
              part_id: upgrade.id,
              category_id: upgrade.category_id,
            };
          });
        } else throw new Error("No upgrades found in session storage.");

        dispatch(setUpgradesInCart(upgradesInCart));
        dispatch(setPreUpgrades(response.data));
        dispatch(setMode(CONFIGURATOR_EDIT_UPGRADE_MODE));
      } catch (error) {
        dispatch(setMode(CONFIGURATOR_NORMAL_MODE));
        dispatch(setPreUpgrades(null));
        // if (error?.response?.status === 404) toast.error("No order was found with this ID.");
        toast.info("Couldn't get order data to edit! Falling back to normal mode.");
        router.push(`/configurator/${router.query.bikeSlug}`);
      }
    }
    setIsPageDataLoading(false);
  }, [router, dispatch]);

  useEffect(() => {
    // Saving the API response in a global variable (redux is a good choice probably)
    dispatch(setConfiguratorData(props.bikeConfigData));
    dispatch(setMode(CONFIGURATOR_NORMAL_MODE));

    getPageData();

    return () => {
      dispatch(resetConfiguratorState());
    };
  }, [dispatch, getPageData, props.bikeConfigData]);

  // Initializing redux state
  useEffect(() => {
    if (!configuratorData) return;

    const sizeIndexOfThePreUpgrade = configuratorData.sizes.findIndex(
      (size) => size.id === preUpgrades?.size_id
    );

    const sizeToSelect =
      configuratorData.sizes[sizeIndexOfThePreUpgrade === -1 ? 0 : sizeIndexOfThePreUpgrade];

    // Initializing frame size
    dispatch(setSelectedSize(sizeToSelect));
    dispatch(
      callGetAvailableColorsBySize({
        productId: configuratorData.product.id,
        sizeId: sizeToSelect.id,
      })
    );

    dispatch(setInitialPerformance(configuratorData.performance_default));

    const preUpgradePartsMap = getPreUpgradeMap(preUpgrades?.parts);
    const upgradesInCartMap = getPreUpgradeMap(upgradesInCart);
    // Keeping track of the pre upgrade parts price, so we can decide to now calculate that as equipment price
    let preUpgradePartsPriceToSet = 0;

    // Initializing selected parts with the default ones or the the pre upgrade parts
    for (let i = 0; i < configuratorData.parts.length; i++) {
      let preUpgradePartId = preUpgradePartsMap.get(configuratorData.parts[i].category_part_id);
      let upgradeInCartId = upgradesInCartMap.get(configuratorData.parts[i].category_part_id);
      if (!configuratorData.parts[i].category.is_multiple_choice) {
        // First we try to check if a part exist in the pre upgrades. If so we select that as default selected.
        // Else we select the default part in that category
        const indexOfPreUpgrade = configuratorData.parts[i].upgrades.findIndex(
          (upgrade) => upgrade.id === preUpgradePartId
        );
        const indexOfUpgradesInCart = configuratorData.parts[i].upgrades.findIndex(
          (upgrade) => upgrade.id === upgradeInCartId
        );

        if (indexOfUpgradesInCart !== -1) {
          dispatch(setNewSelectedPart(configuratorData.parts[i].upgrades[indexOfUpgradesInCart]));
        } else if (indexOfPreUpgrade !== -1) {
          preUpgradePartsPriceToSet += configuratorData.parts[i].upgrades[indexOfPreUpgrade].price;
          dispatch(setNewSelectedPart(configuratorData.parts[i].upgrades[indexOfPreUpgrade]));
        } else dispatch(setNewSelectedPart(configuratorData.parts[i].default));
      } else {
        if (preUpgradePartId) {
          // Making sure that preUpgradePartId for multiple choice categories are in array format
          preUpgradePartId = Array.isArray(preUpgradePartId)
            ? preUpgradePartId
            : [preUpgradePartId];

          upgradeInCartId = Array.isArray(upgradeInCartId) ? upgradeInCartId : [upgradeInCartId];
        } else continue;

        for (let j = 0; j < preUpgradePartId.length; j++) {
          const indexOfPreUpgrade = configuratorData.parts[i].upgrades.findIndex(
            (upgrade) => upgrade.id === preUpgradePartId[j]
          );

          if (indexOfPreUpgrade !== -1) {
            preUpgradePartsPriceToSet +=
              configuratorData.parts[i].upgrades[indexOfPreUpgrade].price;
            dispatch(
              toggleSelectedMultiplePart(configuratorData.parts[i].upgrades[indexOfPreUpgrade])
            );
          }
        }

        for (let j = 0; j < upgradeInCartId.length; j++) {
          const indexOfUpgradeInCart = configuratorData.parts[i].upgrades.findIndex(
            (upgrade) => upgrade.id === upgradeInCartId[j]
          );

          if (indexOfUpgradeInCart !== -1) {
            dispatch(
              toggleSelectedMultiplePart(configuratorData.parts[i].upgrades[indexOfUpgradeInCart])
            );
          }
        }
      }
    }

    dispatch(setPreUpgradePartsPrice(preUpgradePartsPriceToSet));
    dispatch(setTotalPrice(+configuratorData.variation.price));
  }, [dispatch, configuratorData, preUpgrades, upgradesInCart]);


  return (
    <>
      <Head>
        <title>{toTitleCase(props.bikeConfigData.product.title)} - Nireeka Configurator</title>
        <meta name="description" content="Build your own customized Nireeka E-bike" />
      </Head>
      <div className="min-h-screen">
        {!isPageDataLoading && configuratorData ? (
          <>
            <div className="flex flex-col md:flex-row px-0 md:pl-6 xl:px-0 bg-white">
              <div className="relative flex flex-col xl:flex-row md:flex-[2] xl:flex-[3] sm:overflow-auto no-scrollbar xl:overflow-visible px-2 sm:px-0 bg-white">
                <aside className="xl:flex-1 md:pb-4 sm:pb-0 sm:py-6 xl:pl-6">
                  <div className="xl:sticky xl:top-4 overflow-x-auto md:overflow-visible xl:overflow-y-auto pb-4 no-scrollbar">
                    <ConfiguratorTab activeID={activeTab} onChange={setActiveTab} />
                  </div>
                </aside>
                <div id="mainContent" className="flex-[3] xl:sticky xl:top-4 py-2 scroll-smooth sm:overflow-auto no-scrollbar pb-8 bg-white md:pr-[50px]">
                  <div className="w-full relative bg-white overflow-hidden">
                    {(activeTab === 'configuring' || windowSize.width >= mdScreenBreakPointInPixels) && (
                        <ConfiguratorOverviewTab />
                    )}
                    {(activeTab === 'specifications' || windowSize.width >= mdScreenBreakPointInPixels) && (
                        <>
                          <ConfiguratorFeatureTab />
                          <ConfiguratorGalleryTab />
                          <ConfiguratorGeometryTab />
                          <ConfiguratorServiceTab />
                          <ConfiguratorReviewTab />
                        </>
                    )}
                  </div>
                </div>
              </div>
              {(activeTab === 'configuring' || windowSize.width >= mdScreenBreakPointInPixels) && (
                  <ConfiguratorSidebar
                      className="block flex-1"
                      onReview={() => {
                        if(windowSize.width < mdScreenBreakPointInPixels) {
                          setActiveTab('specifications')
                          setTimeout(() => {
                            scrollTo('html', '#review')
                          }, 500)
                        }
                      }}
                  />
              )}
            </div>
            <ConfiguratorFooter
              ref={footerRef}
              colorPrices={configuratorData.price_colors}
              getPageData={getPageData}
            />
          </>
        ) : (
          <ConfiguratorSkeleton />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { bikeSlug, mode } = context.query;

  let bikeConfigRes;

  try {
    bikeConfigRes = await getBikeConfiguratorData(
      bikeSlug,
      context?.req?.cookies?.access_token || null,
      mode
    );
  } catch (error) {
    if (error?.response?.status === 404)
      return {
        notFound: true,
      };
  }

  return {
    props: { bikeConfigData: bikeConfigRes?.data },
  };
};