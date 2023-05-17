import { useCallback, useEffect, useState } from "react";
import { getSparePartOrders } from "../../../app/api/user/finance";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import Table from "@/components/Atoms/tables/Table";
import TablePaginationFooter from "@/components/Dashboard/orders/TablePaginationFooter";
import SparePartsTableRow from "@/components/Dashboard/orders/SparePartsTableRow";
import { getDashboardLayoutProps } from "../../../functions/getDashboardLayoutProps";
import { toast } from "react-toastify";
import Head from "next/head";
import OrdersWrapper from "@/components/Dashboard/layout/OrdersWrapper";
import OrderPageTabsSkeleton from "@/components/Atoms/skeletonLoading/dashboard/OrderPageTabsSkeleton";
import OrderPageSparePartListSkeleton from "@/components/Dashboard/layout/OrderPageSparePartListSkeleton";

const table = {
  header: [
    { label: "Order No." },
    { label: "Title" },
    { label: "Amount" },
    { label: "Status" },
    { label: "Date" },
    { label: "Details" },
  ],
  rows: null,
  footer: { component: TablePaginationFooter, props: {} },
};

const OrdersLoading = () => (
  <>
    <OrderPageTabsSkeleton />
    <OrderPageSparePartListSkeleton />
  </>
);

const SpareOrdersPage = (props) => {
  const [sparePartOrders, setSparePartOrders] = useState(null);
  const [tableRows, setTableRows] = useState([]);

  const PAGE_SIZE = 10;
  const pageCount = sparePartOrders ? Math.ceil(sparePartOrders.length / PAGE_SIZE) : 0;
  // Zero-based
  const [currentPage, setCurrentPage] = useState(0);

  table.rows = tableRows;

  const getData = useCallback(async () => {
    const sparesRes = await getSparePartOrders();

    if (sparesRes instanceof Error) {
      console.log('error')
      return;
    }

    setSparePartOrders(sparesRes.data.order_spares);
  }, []);

  const handleFooterNextClick = () => {
    if (currentPage < pageCount - 1) setCurrentPage((prevState) => prevState + 1);
  };
  const handleFooterPreviousClick = () => {
    if (currentPage > 0) setCurrentPage((prevState) => prevState - 1);
  };

  table.footer.props.onNextClick = handleFooterNextClick;
  table.footer.props.onPreviousClick = handleFooterPreviousClick;
  table.footer.props.pagination = {
    currentPage,
    pageCount,
    pageSize: PAGE_SIZE,
    itemCount: sparePartOrders ? sparePartOrders.length : 0,
  };

  useEffect(() => {
    if (sparePartOrders) {
      const rowsToSet = [];
      for (
        let i = currentPage * PAGE_SIZE;
        i < Math.min(currentPage * PAGE_SIZE + PAGE_SIZE, sparePartOrders.length);
        i++
      ) {
        rowsToSet.push({
          component: SparePartsTableRow,
          props: { order: sparePartOrders[i] },
        });
      }
      setTableRows(rowsToSet);
    }
  }, [sparePartOrders, currentPage]);

  return (
    <>
      <Head>
        <title>Spare Parts - Orders - Nireeka Dashboard</title>
      </Head>

      <OrdersWrapper
        trending={props.trending}
        leaderboard={props.leaderboard}
        loader={getData}
        loading={OrdersLoading}
      >
        {!sparePartOrders || sparePartOrders.length === 0 ? (
          <WhiteShadowCard>
            <p className="text-sm">No item to display</p>
          </WhiteShadowCard>
        ) : (
          <Table table={table} />
        )}
      </OrdersWrapper>
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

export default SpareOrdersPage;
