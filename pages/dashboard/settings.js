import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getBikeSettingsByMac } from "../../app/api/nsd";
import { getUserBikes } from "../../app/api/user";
import { dashboard as dashboardLocalStorageKeys } from "../../app/constants/localStorageKeys";
import { setBikeSettings } from "../../app/store/dashboardSlice";
import Tabs from "@/components/Atoms/buttons/Tabs";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import DashboardLayout from "@/components/Dashboard/layout/DashboardLayout";
import ControllerSettings from "@/components/Dashboard/settings/ControllerSettings";
import GeneralSettings from "@/components/Dashboard/settings/GeneralSettings";
import HeartbeatAssistSettings from "@/components/Dashboard/settings/HeartbeatAssist";
import SmartSettings from "@/components/Dashboard/settings/SmartSettings";
import { getDashboardLayoutProps } from "../../functions/getDashboardLayoutProps";
import selectAMacId from "../../functions/selectAMacId";
import Head from "next/head";

const initialTabs = [
  { name: "General", current: true },
  { name: "Heartbeat Assist", current: false },
  { name: "Controller", current: false },
  { name: "Smart", current: false },
];

const SettingsPage = (props) => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState(initialTabs);

  const [isLoading, setIsLoading] = useState(true);
  const [macId, setMacId] = useState(null);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    setTabs((prevState) => {
      const newState = [...prevState];

      for (let i = 0; i < newState.length; i++) {
        newState[i].current = i === tabIndex;
      }

      return newState;
    });
  };

  const getData = useCallback(async () => {
    let tempMacId = null;
    try {
      setIsLoading(true);
      const userBikesRes = await getUserBikes();
      tempMacId = selectAMacId(userBikesRes.data);
    } catch (error) {
      if (error?.response?.status === 404) setIsLoading(false);
      else console.log(error)
      setIsLoading(false);
      return;
    }

    if (!tempMacId) {
      toast.info("No smart bikes found.");
      setIsLoading(false);
      return;
    }

    let bikeSettingsRes = null;
    try {
      bikeSettingsRes = await getBikeSettingsByMac(tempMacId);
    } catch (error) {
      if (error?.response && (error.response.status === 404 || error.response.status === 406)) {
        localStorage.removeItem(dashboardLocalStorageKeys.SELECTED_BIKE_MAC_ID);
        tempMacId = selectAMacId(userBikesRes.data);

        if (!tempMacId) {
          toast.info("No smart bikes found.");
          setIsLoading(false);
          return;
        }
      }

      console.log('error')
      setIsLoading(false);
      return;
    }

    // Saving settings into redux store
    dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    setMacId(tempMacId);
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    // getData();
    setIsLoading(false);
  }, [getData]);

  return (
    <>
      <Head>
        <title>Settings - Nireeka Dashboard</title>
        <meta name="description" content={"Control and tune your Nireeka Smart E-bike settings"} />
      </Head>
      <DashboardLayout trending={props.trending} leaderboard={props.leaderboard}>
        <Tabs tabs={tabs} onTabClick={handleTabChange} noHref />
        {!isLoading ? (
          <WhiteShadowCard>
            <div>
              {activeTab === 0 && <GeneralSettings macId={macId} className="space-y-3 h-fit" />}
              {activeTab === 1 && (
                <HeartbeatAssistSettings macId={macId} className="space-y-3 h-fit" />
              )}
              {activeTab === 2 && <ControllerSettings macId={macId} className="space-y-3 h-fit" />}
              {activeTab === 3 && <SmartSettings macId={macId} className="space-y-3 h-fit" />}
            </div>
          </WhiteShadowCard>
        ) : (
          <WhiteShadowCard className="flex justify-center">
            <LoadingNireeka className="w-12 h-12 border-gray-600" />
          </WhiteShadowCard>
        )}
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
    revalidate: 10,
  };
};

export default SettingsPage;
