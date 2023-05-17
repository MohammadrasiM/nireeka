import DashboardLayout from "@/components/Dashboard/layout/DashboardLayout";
import { getDashboardLayoutProps } from "../../functions/getDashboardLayoutProps";
import { getUserBikes } from "../../app/api/user";
import { getBikeSettingsByMac, getRidesData, getStatusByMac } from "../../app/api/nsd";
import { useCallback, useEffect, useState } from "react";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import PrimaryButton from "@/components/Atoms/buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { dashboard as dashboardLocalStorage } from "../../app/constants/localStorageKeys";
import selectAMacId from "../../functions/selectAMacId";
import { setBikeSettings } from "../../app/store/dashboardSlice";
import { useRouter } from "next/router";
import DashboardIndexSkeleton from "@/components/Atoms/skeletonLoading/dashboard/DashboardIndexSkeleton";
import WelcomeCardSkeleton from "@/components/Atoms/skeletonLoading/dashboard/WelcomeCardSkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";
// import BikeLastLocation from "../../components/Dashboard/home/BikeLastLocation";

const Welcome = dynamic(() => import("@/components/Dashboard/home/Welcome"));
const Stats = dynamic(() => import("@/components/Dashboard/home/Stats"));
const BikeStatus = dynamic(() => import("@/components/Dashboard/home/BikeStatus"));
const WeeklyReport = dynamic(() => import("@/components/Dashboard/home/WeeklyReport"));
const BikeSelection = dynamic(() => import("@/components/Dashboard/home/BikeSelection"));

const Index = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  // Array holding all user bikes
  const [userBikes, setUserBikes] = useState(null);
  // Boolean holding the data if the user has any bike with an NSD
  const [userHasSmartBike, setUserHasSmartBike] = useState(false);
  // A string that holds MAC ID of the dashboard bike
  const [selectedBikeMacId, setSelectedBikeMacId] = useState(null);
  // Object holding bike status of the default dashboard bike
  const [selectedBikeStatus, setSelectedBikeStatus] = useState(null);
  // Bike rides fetched from server
  const [rides, setRides] = useState(null);
  // A loading state
  const [isLoading, setIsLoading] = useState(true);

  const getPageData = useCallback(async () => {
    setIsLoading(true);

    let userBikesData = null;
    try {
      userBikesData = await getUserBikes();
    } catch (error) {
      if (error?.response?.status === 404) setIsLoading(false);
      else if (error?.response?.status === 401) {
      } else console.log('error')
      setIsLoading(false);
      return;
    }

    if (!userBikesData?.data || userBikesData.data.length === 0) {
      toast.info("No bikes found.");
      setIsLoading(false);
      return;
    }

    setUserBikes(userBikesData.data);

    let defaultBikeMacId = selectAMacId(userBikesData.data);

    if (!defaultBikeMacId) {
      toast.info("No smart bikes found.");
      setUserHasSmartBike(false);
      setIsLoading(false);
      return;
    }

    let bikeStatus = null;
    try {
      bikeStatus = await getStatusByMac(defaultBikeMacId);
    } catch (error) {
      bikeStatus = null;
      // If the defaultBikeMacId was invalid, try to find mac id while ignoring the local storage
      window.localStorage.removeItem(dashboardLocalStorage.SELECTED_BIKE_MAC_ID);

      defaultBikeMacId = selectAMacId(userBikesData.data);

      if (!defaultBikeMacId) {
        toast.info("No smart bikes found.");
        setUserHasSmartBike(false);
        setIsLoading(false);
        return;
      }
    }

    try {
      if (!bikeStatus) bikeStatus = await getStatusByMac(defaultBikeMacId);
    } catch (error) {
      window.localStorage.removeItem(dashboardLocalStorage.SELECTED_BIKE_MAC_ID);

      toast.info("No smart bikes found.");
      setUserHasSmartBike(false);
      setIsLoading(false);
      return;
    }

    // Fetching bike settings
    let bikeSettings = null;
    try {
      bikeSettings = await getBikeSettingsByMac(defaultBikeMacId);
    } catch (error) {
      setUserHasSmartBike(true);
      setIsLoading(false);
      return;
    }

    if (bikeSettings?.data?.settings) dispatch(setBikeSettings(bikeSettings.data.settings));
    else dispatch(setBikeSettings({}));

    // Fetching rides
    const date = new Date();
    const epochNow = date.getTime();
    const epochStartOfLastWeek = date.setDate(date.getDate() - date.getDay() - 7);

    let ridesRes = null;
    try {
      ridesRes = await getRidesData(defaultBikeMacId, epochStartOfLastWeek, epochNow);
    } catch (error) {
      if (error?.response?.status !== 404)
        console.log('error')
    }

    setSelectedBikeMacId(defaultBikeMacId);
    setUserHasSmartBike(true);
    setSelectedBikeStatus(bikeStatus.data);
    if (ridesRes?.data) setRides(ridesRes.data.resRides);
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (isUserLoggedIn) {
      // getPageData();
      setIsLoading(false);
      setUserBikes([]);
    } else router.push("/login?nireekaContinue=/dashboard");
  }, [isUserLoggedIn, getPageData, router]);

  //
  // RENDERING
  //

  let conditionalContent = <></>;
  if (userBikes === null) {
    conditionalContent = (
      <>
        <WhiteShadowCard>
          <div className="flex flex-col items-center sm:flex-row">
            <p>You don&apos;t have any bikes!</p>
            <PrimaryButton href="/configurator" className="mt-4 sm:ml-auto sm:mt-0">
              Order One Now!
            </PrimaryButton>
          </div>
        </WhiteShadowCard>
        {/* Actions panel */}
        <Stats />
        {/* Bike status */}
        <BikeStatus />
        {/* Weekly Report */}
        <WeeklyReport />
        {/* Bike Last Location */}
        {/* <BikeLastLocation /> */}
      </>
    );
  } else if (!userHasSmartBike) {
    conditionalContent = (
      <>
        {/* Bike selection */}
        {userBikes.length > 1 && <BikeSelection userBikes={userBikes} />}
        <WhiteShadowCard>
          {/* Error box */}
          <div className="flex flex-col items-center sm:flex-row">
            <p>
              Bikes that are equipped with the upcoming NSD will be shown here. To see your current
              bikes, click on the Orders tab.
            </p>
            <PrimaryButton className="mt-4 sm:ml-auto sm:mt-0">Coming soon!</PrimaryButton>
          </div>
        </WhiteShadowCard>
        {/* Actions panel */}
        <Stats />
        {/* Bike status */}
        <BikeStatus />
        {/* Weekly Report */}
        <WeeklyReport />
        {/* Bike Last Location */}
        {/* <BikeLastLocation /> */}
      </>
    );
  } else if (selectedBikeStatus !== null) {
    conditionalContent = (
      <>
        {/* Bike selection */}
        {userBikes.length > 1 && (
          <BikeSelection
            userBikes={userBikes}
            setSelectedBikeMacId={setSelectedBikeMacId}
            selectedBikeMacId={selectedBikeMacId}
          />
        )}
        {/* Actions panel */}
        <Stats
          status={selectedBikeStatus.status}
          leaderboard={selectedBikeStatus.leaderboard}
          rides={rides}
        />
        {/* Bike status */}
        <BikeStatus status={selectedBikeStatus.status} ratios={selectedBikeStatus.ratios} />
        {/* Weekly Report */}
        <WeeklyReport macId={selectedBikeMacId} rides={rides} />
        {/* Bike Last Location */}
        {/* <BikeLastLocation macId={selectedBikeMacId} /> */}
      </>
    );
  } else {
    conditionalContent = <p>An error was occurred. Please try again later.</p>;
  }

  return (
    <>
      <Head>
        <title>Reports - Nireeka Dashboard</title>
        <meta
          name="description"
          content={"Check your trips history, track your biking journey and break records!"}
        />
      </Head>
      <DashboardLayout
        trending={props.trending}
        leaderboard={props.leaderboard}
        loading={() => (
          <>
            <WelcomeCardSkeleton />
            <DashboardIndexSkeleton />
          </>
        )}
      >
        {/* Welcome section */}
        <Welcome />
        {!isLoading ? conditionalContent : <DashboardIndexSkeleton />}
      </DashboardLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const layoutProps = await getDashboardLayoutProps();

  return {
    props: {
      ...layoutProps,
    },
    revalidate: 60 * 5,
  };
};

export default Index;
