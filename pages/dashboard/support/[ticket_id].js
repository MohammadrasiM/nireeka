import DashboardLayout from "@/components/Dashboard/layout/DashboardLayout";
import { getDashboardLayoutProps } from "../../../functions/getDashboardLayoutProps";
import Tabs from "@/components/Atoms/buttons/Tabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getTicketList,
  getTicketDetails,
  closeTicket,
  reopenTicket,
} from "../../../app/api/user/ticket";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import WhiteButton from "@/components/Atoms/buttons/WhiteButton";
import {
  ArrowNarrowLeftIcon,
  ChatAlt2Icon,
  ChatAltIcon,
  MailOpenIcon,
  XIcon,
} from "@heroicons/react/outline";
import TicketMainMessage from "@/components/Dashboard/support/TicketMainMessage";
import { toast } from "react-toastify";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import TicketReply from "@/components/Dashboard/support/TicketReply";
import { useConfirmationModal } from "../../../hooks/useConfirmationModal";
import { CONFIRM_TICKET_CLOSE_MODAL } from "../../../app/constants/modals";
import ReplyTicketInput from "@/components/Dashboard/support/ReplyTicketInput";
import Head from "next/head";
import { useSelector } from "react-redux";

const initialTabs = [
  { name: "All Tickets", href: "/dashboard/support", current: false },
  { name: "Open", href: "/dashboard/support?status=Open", current: false },
  {
    name: "Closed",
    href: "/dashboard/support?status=Closed",
    current: false,
  },
];

const TicketPage = (props) => {
  const router = useRouter();

  const userData = useSelector((state) => state.auth.userData);

  const [ticketDetails, setTicketDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReopenLoading, setIsReopenLoading] = useState(false);
  const [tabs, setTabs] = useState(() => {
    const state = [...initialTabs];
    if (router.query.status === "Open") state[1].current = true;
    else if (router.query.status === "Closed") state[2].current = true;
    else state[0].current = true;

    return state;
  });
  // This state is used to find out whether the user just sent a new ticket reply or
  // he is just checking to see if operators have replied or not
  const [justSentAReply, setJustSentAReply] = useState(false);

  const dayOfWeek = new Date().getDay();

  const shouldAllowReply = ticketDetails
    ? (ticketDetails.comments.length > 0 &&
        ticketDetails.comments[ticketDetails.comments.length - 1].user.id !== userData?.id) ||
      ticketDetails.ticket.is_permission === 1
    : false;

  const updateUIAfterSubmit = async () => {
    let ticketDetailsRes = await getTicketDetails(router.query.ticket_id);
    if (ticketDetailsRes instanceof Error) {
      return;
    }

    setTicketDetails(ticketDetailsRes.data);
    setJustSentAReply(true);
  };

  const getPageData = async () => {
    setIsLoading(true);

    let userTicketsRes = await getTicketList(router.query.status);
    let ticketDetailsRes = await getTicketDetails(router.query.ticket_id);

    if (userTicketsRes instanceof Error || ticketDetailsRes instanceof Error) {
      setIsLoading(false);
      return;
    }

    const tickets = userTicketsRes.data.tickets;

    // All count: array length
    // Open count: openTicketsCount
    // Closed count: all - open
    let openTicketsCount = 0;
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].status.toLowerCase() === "open") {
        openTicketsCount++;
      }
    }

    setTabs((prevState) => {
      const newState = [...prevState];

      newState[0].name = `All Tickets (${tickets.length})`; // All
      newState[1].name = `Open (${openTicketsCount})`; // Open
      newState[2].name = `Closed (${tickets.length - openTicketsCount})`; // Closed

      return newState;
    });
    setTicketDetails(ticketDetailsRes.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getPageData();
  }, []);

  const { getConfirmation } = useConfirmationModal();
  const handleTicketCloseClick = async () => {
    const isConfirmed = await getConfirmation({
      ...CONFIRM_TICKET_CLOSE_MODAL,
    });

    if (isConfirmed) {
      const res = await closeTicket(ticketDetails.ticket.id);
      if (res instanceof Error) {
        console.log('error')
        return;
      }

      updateUIAfterSubmit();
      toast.success("Ticket closed successfully.");
    }
  };

  const handleTicketReopenClick = async () => {
    setIsReopenLoading(true);
    const res = await reopenTicket(ticketDetails.ticket.id);
    if (res instanceof Error) {
      setIsReopenLoading(false);
      return;
    }

    setIsReopenLoading(false);
    updateUIAfterSubmit();
    toast.success("Ticket re-opened successfully.");
  };

  return (
    <>
      <Head>
        <title>Ticket #{router.query.ticket_id} - Support - Nireeka Dashboard</title>
      </Head>
      <DashboardLayout trending={props.trending} leaderboard={props.leaderboard}>
        {!isLoading ? (
          <>
            <Tabs tabs={tabs} />
            <WhiteShadowCard noPadding>
              {/* Heading */}
              <div className="border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="py-3 flex justify-between">
                    <span className="flex space-x-3">
                      <WhiteButton href="/dashboard/support">
                        <ArrowNarrowLeftIcon className="inline w-5 h-5 icon-stroke-width-1 pr-1" />
                        <span className="hidden sm:inline">Back to Tickets</span>
                      </WhiteButton>
                      {/* {ticketDetails.ticket.status.toLowerCase() === "open" ? (
                      <WhiteButton onClick={handleTicketCloseClick}>
                        <XIcon className="w-5 h-5 icon-stroke-width-1 pr-1" />
                        <span>Close Ticket</span>
                      </WhiteButton>
                    ) : (
                      <WhiteButton onClick={handleTicketReopenClick}>
                        {!isReopenLoading ? (
                          <>
                            <ChatAltIcon className="w-5 h-5 icon-stroke-width-1 mr-1" />
                            <span>Re-open</span>
                          </>
                        ) : (
                          <>
                            <LoadingNireeka className="w-3 h-3 mr-2 border-gray-700" />
                            <span>Re-opening...</span>
                          </>
                        )}
                      </WhiteButton>
                    )} */}
                    </span>
                  </div>
                </div>
              </div>

              <div className="min-h-0 flex-1">
                {/* Main message */}
                <TicketMainMessage ticket={ticketDetails.ticket} />
                {/* Replies */}
                <ul role="list" className="space-y-2 sm:space-y-4">
                  {ticketDetails.comments.map((comment) => (
                    <TicketReply key={comment.id} comment={comment} />
                  ))}
                  {ticketDetails.ticket.status.toLowerCase() === "open" ? (
                    shouldAllowReply ? (
                      <ReplyTicketInput className="p-6" onSubmit={updateUIAfterSubmit} />
                    ) : justSentAReply ? (
                      <li className="font-medium bg-green-100 text-green-700">
                        <p className="p-4 flex flex-col space-y-2">
                          <span>
                            Thank you for your comment. Our operators will get in touch with you
                            soon.
                          </span>
                          {(dayOfWeek === 0 || dayOfWeek === 6) && (
                            <span className="font-normal">
                              We will back to you on Monday. Thanks for your patience.
                            </span>
                          )}
                        </p>
                      </li>
                    ) : (
                      <li className="font-bold bg-green-100 text-green-700">
                        <p className="p-4 flex flex-col space-y-2">
                          <span>Our operators are still reviewing your last comment.</span>
                          {(dayOfWeek === 0 || dayOfWeek === 6) && (
                            <span className="font-normal">
                              We will back to you on Monday. Thanks for your patience.
                            </span>
                          )}
                        </p>
                      </li>
                    )
                  ) : (
                    <li className="p-4 font-light text-gray-600">
                      <p>This ticket is closed. Re-open to allow replies.</p>
                    </li>
                  )}
                </ul>
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

export const getServerSideProps = async () => {
  const layoutProps = await getDashboardLayoutProps();

  return {
    props: {
      ...layoutProps,
    },
  };
};

export default TicketPage;
