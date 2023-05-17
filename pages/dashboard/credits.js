import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getUserCredits } from "../../app/api/user/finance";
import Tabs from "@/components/Atoms/buttons/Tabs";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import Table from "@/components/Atoms/tables/Table";
import CreditPageFooter from "@/components/Dashboard/credits/CreditTableFooter";
import CreditTableRow from "@/components/Dashboard/credits/CreditTableRow";
import DashboardLayout from "@/components/Dashboard/layout/DashboardLayout";
import { getDashboardLayoutProps } from "../../functions/getDashboardLayoutProps";
import Head from "next/head";
import filter from "lodash/filter";

const table = {
  header: [{ label: "ID" }, { label: "Amount" }, { label: "Description" }, { label: "Date" }],
  footer: { component: CreditPageFooter, props: {} },
};

const CreditsPage = (props) => {
  const [activeTab, setActiveTab] = useState();
  const [tableRows, setTableRows] = useState([]);
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const initialTabs = useMemo(
    () => [
      { name: "All", current: true, count: credits?.credits?.length },
      { name: "Balance", current: false, count: filter(credits?.credits, ["type", 1])?.length },
      { name: "Spent", current: false, count: filter(credits?.credits, ["type", 0])?.length },
    ],
    [credits]
  );

  const [tabs, setTabs] = useState(initialTabs);

  table.rows = tableRows;

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

  const getData = async () => {
    setIsLoading(true);

    const credidsRes = await getUserCredits();

    if (credidsRes instanceof Error) {
      console.log("error");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setCredits(credidsRes.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (credits?.credits) {
      let rowData;

      if (activeTab === 1) {
        //debugger
        rowData = credits?.credits?.filter((item) => {
          //debugger;
          return item.type === 1;
        });
      } else if (activeTab === 2) {
        rowData = credits?.credits?.filter((item) => item.type === 0);
      } else rowData = credits?.credits;

      const rowsToRender = rowData?.map((item) => {
        return {
          component: CreditTableRow,
          props: {
            credit: item,
          },
        };
      });

      table.footer.props.colSpan = table.header.length;
      table.footer.props.totalAmount = credits?.total_credit;

      setTableRows(rowsToRender);
    }
  }, [activeTab, credits]);

  return (
    <>
      <Head>
        <title>Credits - Nireeka Dashboard</title>
      </Head>
      <DashboardLayout trending={props.trending} leaderboard={props.leaderboard}>
        <Tabs noHref tabs={tabs} onTabClick={handleTabChange} />

        {!isLoading ? (
          table.rows.length === 0 ? (
            <WhiteShadowCard>
              <p className="text-sm">No item to display</p>
            </WhiteShadowCard>
          ) : (
            <Table table={table} />
          )
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

export default CreditsPage;
