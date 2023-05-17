import {useCallback, useEffect, useMemo, useState} from "react";
import { getUserPaymentsData } from "../../app/api/user/finance";
import Tabs from "@/components/Atoms/buttons/Tabs";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import Table from "@/components/Atoms/tables/Table";
import DashboardLayout from "@/components/Dashboard/layout/DashboardLayout";
import { getDashboardLayoutProps } from "../../functions/getDashboardLayoutProps";
import PaymentTableRow from "@/components/Dashboard/payments/PaymentTableRow";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import { getPrettyDate } from "../../functions/convertors";
import TablePaginationFooter from "@/components/Dashboard/orders/TablePaginationFooter";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";

const table = {
  header: [
    { label: "Order No." },
    { label: "Card" },
    { label: "Amount (USD)" },
    { label: "Status" },
    { label: "Date" },
    { label: "Details" },
  ],
  rows: null,
  footer: { component: TablePaginationFooter, props: {} },
};

const PaymentsPage = (props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  // 0 => all
  // 1 => paid
  // 2 => unpaid
  // 3 => refunded
  const [activeTab, setActiveTab] = useState(0);
  const [payments, setPayments] = useState(null);
  const [tableRows, setTableRows] = useState([]);

  const PAGE_SIZE = 10;
  const pageCount = payments ? Math.ceil(payments.all.length / PAGE_SIZE) : 0;
  // Zero-based table pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [footerPagination, setFooterPagination] = useState({});

  const tabs = useMemo(() => [
    { name: "All", href: "#", count: payments?.all?.length, current: activeTab === 0 },
    { name: "Paid", href: "#", count: payments?.paid?.length, current: activeTab === 1 },
    { name: "Unpaid", href: "#", count: payments?.unpaid?.length, current: activeTab === 2 },
    { name: "Refunded", href: "#", count: payments?.refunded?.length, current: activeTab === 3 },
  ], [payments])

  table.rows = tableRows;
  table.footer.props.pagination = footerPagination;

  const handleTabClick = useCallback(
    (tabIndex) => {
      setActiveTab(tabIndex);
      setCurrentPage(0);

      let paymentsObj;

      if (tabIndex === 0) {
        paymentsObj = payments.all;
      } else if (tabIndex === 1) {
        paymentsObj = payments.paid;
      } else if (tabIndex === 2) {
        paymentsObj = payments.unpaid;
      } else if (tabIndex === 3) {
        paymentsObj = payments.refunded;
      } else {
        paymentsObj = payments.all;
      }

      table.rows = paymentsObj;

      const pageCount = payments ? Math.ceil(paymentsObj.length / PAGE_SIZE) : 0;

      setFooterPagination({
        currentPage: 0,
        pageCount,
        pageSize: PAGE_SIZE,
        itemCount: !!payments ? paymentsObj.length : 0,
      });
    },
    [payments]
  );

  const handleFooterNextClick = () => {
    if (currentPage < pageCount - 1) setCurrentPage((prevState) => prevState + 1);
  };
  const handleFooterPreviousClick = () => {
    if (currentPage > 0) setCurrentPage((prevState) => prevState - 1);
  };

  table.footer.props.onNextClick = handleFooterNextClick;
  table.footer.props.onPreviousClick = handleFooterPreviousClick;

  const getPaymentData = useCallback(async () => {
    setIsLoading(true);

    const paymentsRes = await getUserPaymentsData();

    if (paymentsRes instanceof Error) {
      setIsLoading(false);
      return;
    }

    const paid = !!paymentsRes?.data?.order_paid ? paymentsRes.data.order_paid : [];
    const unpaid = !!paymentsRes?.data?.order_unpaid ? paymentsRes.data.order_unpaid : [];
    const refunded = !!paymentsRes?.data?.order_refunded ? paymentsRes.data.order_refunded : [];

    // - Reformatting the date
    for (let order of paid) {
      order.date = getPrettyDate(order.date);
    }
    for (let order of unpaid) {
      order.date = getPrettyDate(order.date);
    }

    const all = [...paid, ...unpaid, ...refunded];

    const paymentsToSet = {
      all,
      paid,
      unpaid,
      refunded,
    };

    for (let list in paymentsToSet) {
      // Sorting the all array by date
      paymentsToSet[list].sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);

        return bDate.getTime() - aDate.getTime();
      });
    }

    setPayments(paymentsToSet);
    setFooterPagination({
      currentPage,
      pageCount: !!paymentsToSet ? Math.ceil(paymentsToSet.all.length / PAGE_SIZE) : 0,
      pageSize: PAGE_SIZE,
      itemCount: !!paymentsToSet ? paymentsToSet.all.length : 0,
    });
    setIsLoading(false);
  }, [currentPage]);

  useEffect(() => {
    getPaymentData();
  }, [getPaymentData]);

  useEffect(() => {
    const { type } = router.query;

    if (type === "all") setActiveTab(0);
    else if (type === "paid") setActiveTab(1);
    else if (type === "unpaid") setActiveTab(2);
    else if (type === "refunded") setActiveTab(3);
  }, [router]);

  useEffect(() => {
    if (payments) {
      let rowData;
      if (activeTab === 0) rowData = payments.all;
      else if (activeTab === 1) rowData = payments.paid;
      else if (activeTab === 2) rowData = payments.unpaid;
      else if (activeTab === 3) rowData = payments.refunded;
      else rowData = [];

      const rowsToRender = [];
      for (
        let i = currentPage * PAGE_SIZE;
        i < Math.min(currentPage * PAGE_SIZE + PAGE_SIZE, rowData.length);
        i++
      ) {
        rowsToRender.push({
          component: PaymentTableRow,
          props: {
            payment: rowData[i],
            onSuccess: () => {
              getPaymentData();
            },
          },
        });
      }

      setTableRows(rowsToRender);
    }
  }, [activeTab, payments, currentPage, getPaymentData]);

  return (
    <>
      <Head>
        <title>Payments - Nireeka Dashboard</title>
      </Head>
      <DashboardLayout trending={props.trending} leaderboard={props.leaderboard}>
        <Tabs tabs={tabs} onTabClick={handleTabClick} noHref />
        {!isLoading ? (
          table?.rows?.length === 0 ? (
            <WhiteShadowCard>
              <p className="text-sm">No item to display</p>
            </WhiteShadowCard>
          ) : (
            <Table table={table} />
          )
        ) : (
          <div className="flex justify-center">
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

export default PaymentsPage;
