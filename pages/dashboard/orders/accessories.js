import { useCallback, useEffect, useState } from "react";
import { getAccessoryOrders } from "../../../app/api/user/finance";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import Table from "@/components/Atoms/tables/Table";
import SparePartsTableRow from "@/components/Dashboard/orders/SparePartsTableRow";
import TablePaginationFooter from "@/components/Dashboard/orders/TablePaginationFooter";
import { getDashboardLayoutProps } from "../../../functions/getDashboardLayoutProps";
import Head from "next/head";
import OrderPageTabsSkeleton from "@/components/Atoms/skeletonLoading/dashboard/OrderPageTabsSkeleton";
import OrderPageSparePartListSkeleton from "@/components/Dashboard/layout/OrderPageSparePartListSkeleton";
import OrdersWrapper from "@/components/Dashboard/layout/OrdersWrapper";

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

const AccessoryOrdersPage = (props) => {
  const [accessoryOrders, setAccessoryOrders] = useState(null);
  const [tableRows, setTableRows] = useState([]);

  const PAGE_SIZE = 10;
  const pageCount = accessoryOrders ? Math.ceil(accessoryOrders.length / PAGE_SIZE) : 0;
  // Zero-based
  const [currentPage, setCurrentPage] = useState(0);

  table.rows = tableRows;

  const getData = useCallback(async () => {
    const accessoriesRes = await getAccessoryOrders();

    if (accessoriesRes instanceof Error) {
      console.log('error')
      return;
    }

    setAccessoryOrders(accessoriesRes.data.order_accessories);
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
    itemCount: accessoryOrders ? accessoryOrders.length : 0,
  };

  useEffect(() => {
    if (accessoryOrders) {
      const rowsToSet = [];
      for (
        let i = currentPage * PAGE_SIZE;
        i < Math.min(currentPage * PAGE_SIZE + PAGE_SIZE, accessoryOrders.length);
        i++
      ) {
        rowsToSet.push({
          component: SparePartsTableRow,
          props: { order: accessoryOrders[i] },
        });
      }
      setTableRows(rowsToSet);
    }
  }, [accessoryOrders, currentPage]);

  return (
    <>
      <Head>
        <title>Accessories - Orders - Nireeka Dashboard</title>
      </Head>
      <OrdersWrapper
        trending={props.trending}
        leaderboard={props.leaderboard}
        loader={getData}
        loading={OrdersLoading}
      >
        {!accessoryOrders || accessoryOrders.length === 0 ? (
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
    revalidate: 10,
  };
};

export default AccessoryOrdersPage;
