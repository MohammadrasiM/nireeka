import DashboardLayout from "@/components/Dashboard/layout/DashboardLayout";
import { getDashboardLayoutProps } from "../../../functions/getDashboardLayoutProps";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import Tabs from "@/components/Atoms/buttons/Tabs";
import { AnnotationIcon, ArrowNarrowLeftIcon, PlusIcon } from "@heroicons/react/outline";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import TicketListItem from "@/components/Dashboard/support/TicketListItem";
import { useEffect, useMemo, useState } from "react";
import { getTicketList } from "../../../app/api/user/ticket";
import WhiteButton from "@/components/Atoms/buttons/WhiteButton";
import PrimaryButton from "@/components/Atoms/buttons/PrimaryButton";
import NewTicketModal from "@/components/Dashboard/support/NewTicketModal";
import Head from "next/head";
import filter from "lodash/filter";

const SupportPage = (props) => {
  const [ticketsList, setTicketsList] = useState(null);
  const [isNewTicketModalVisible, setIsNewTicketModalVisible] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [activeTab, setActiveTab] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const initialTabs = useMemo(
    () => [
      {
        name: "All Tickets",
        count: ticketsList?.tickets?.length,
        current: true,
      },
      {
        name: "Open",
        count: filter(ticketsList?.tickets, ["type", 1])?.length,
        current: false,
      },
      {
        name: "Closed",
        count: filter(ticketsList?.tickets, ["type", 0])?.length,
        current: false,
      },
    ],
    []
  );
  const [tabs, setTabs] = useState(initialTabs);

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

    const userTicketsRes = await getTicketList();

    if (userTicketsRes instanceof Error) {
      console.log("error");
      setIsLoading(false);
      return;
    }
    debugger;

    setTicketsList(userTicketsRes.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    debugger;
    if (ticketsList?.tickets) {
      let rowData;

      if (activeTab === 1) {
        rowData = ticketsList?.tickets?.filter((item) => {
          debugger;
          return item.status === "Open";
        });
      } else if (activeTab === 2) {
        rowData = ticketsList?.tickets?.filter((item) => item.status === "Closed");
      } else rowData = ticketsList?.tickets;
      debugger;
      const rowsToRender = rowData;
      setTableRows(rowsToRender);
      debugger;
    }
  }, [activeTab, ticketsList]);

  return (
    <>
      <Head>
        <title>Support - Nireeka Dashboard</title>
      </Head>

      <DashboardLayout trending={props.trending} leaderboard={props.leaderboard}>
        {/* Welcome section */}
        {!isLoading ? (
          <>
            <Tabs noHref tabs={tabs} onTabClick={handleTabChange} />
            <WhiteShadowCard noPadding className="overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="justify-center">
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="py-3 flex justify-between">
                      <span className="relative z-0 inline-flex shadow-sm sm:shadow-none sm:space-x-3">
                        <span className="flex space-x-3">
                          {isNewTicketModalVisible ? (
                            <WhiteButton onClick={() => setIsNewTicketModalVisible(false)}>
                              <ArrowNarrowLeftIcon className="inline w-5 h-5 icon-stroke-width-1 pr-1" />
                              <span>Back</span>
                            </WhiteButton>
                          ) : (
                            <WhiteButton onClick={() => setIsNewTicketModalVisible(true)}>
                              <PlusIcon className="w-5 h-5 icon-stroke-width-1 pr-1" />
                              <span>New Ticket</span>
                            </WhiteButton>
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {!isNewTicketModalVisible && (
                  <div className=" sm:items-baseline sm:space-x-4 m-4">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Ticket</h1>
                  </div>
                )}
                {/*  */}
                {isNewTicketModalVisible ? (
                  <NewTicketModal
                    onClose={(e) => {
                      setIsNewTicketModalVisible(false);
                    }}
                    onSubmit={getData}
                  />
                ) : (
                  <ul role="list" className="divide-y divide-gray-200">
                    {ticketsList?.tickets?.length === 0 && (
                      <li>
                        <div className="flex flex-col items-center space-y-10  pb-10 px-4">
                          <div className="flex flex-col items-center">
                            <AnnotationIcon className="w-28 h-28 icon-stroke-width-1 text-gray-700" />
                            <span className="text-lg text-gray-700">Have a question about your order?</span>
                            <span className="text-gray-700">Make sure you check out the help center first:</span>
                            <WhiteButton href="/help-center" className="mt-4">
                              Help Center
                            </WhiteButton>
                          </div>
                          <div className="flex flex-col items-center space-y-4 my-5">
                            <span className="text-gray-700 text-center">
                              If you couldn&apos;t find your answer in the Help Center, please open a ticker here:
                            </span>
                            <div>
                              <PrimaryButton className="flex-grow-0" onClick={() => setIsNewTicketModalVisible(true)}>
                                <PlusIcon className="w-5 h-5 pr-1" />
                                <span>Open a New Ticket</span>
                              </PrimaryButton>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    {ticketsList?.tickets?.length !== 0 && ticketsList?.tickets?.length === 0 && (
                      <p className="p-4 bg-gray-100">No tickets to show</p>
                    )}
                    {tableRows?.map((ticket) => (
                      <TicketListItem key={ticket.id} ticket={ticket} />
                    ))}
                  </ul>
                )}
              </div>
            </WhiteShadowCard>
          </>
        ) : (
          <div className="flex mt-4 justify-center">
            <LoadingNireeka className="w-14 h-14 border-gray-600" />
          </div>
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

export default SupportPage;
