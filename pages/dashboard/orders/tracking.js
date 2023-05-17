import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import Table from "@/components/Atoms/tables/Table";
import OrdersWrapper from "@/components/Dashboard/layout/OrdersWrapper";
import TablePaginationFooter from "@/components/Dashboard/orders/TablePaginationFooter";
import TrackingOrderTableRow from "@/components/Dashboard/orders/TrackingOrderTableRow";
import { getShippedOrders } from "app/api/user/finance";
import { setShippedOrdersCache } from "app/store/requestCacheState";
import { getDashboardLayoutProps } from "functions/getDashboardLayoutProps";
import Head from "next/head";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const table = {
  header: [
    { label: "Order No." },
    { label: "Amount" },
    { label: "Shipping" },
    { label: "Delivery (Est.)" },
    { label: "Courier" },
    { label: "Tracking number" },
    { label: "Details" },
  ],
  rows: null,
  footer: { component: TablePaginationFooter, props: {} },
};

const TrackingPage = (props) => {
  const dispatch = useDispatch();

  const shippedOrdersCache = useSelector((state) => state.cache.shippedOrders);
  const [tableRows, setTableRows] = useState([]);

  const shippedOrders =
    shippedOrdersCache?.data?.orders && shippedOrdersCache.data.orders.length > 0
      ? shippedOrdersCache.data.orders
      : null;

  const PAGE_SIZE = 10;
  const pageCount = shippedOrders ? Math.ceil(shippedOrders.length / PAGE_SIZE) : 0;
  // Zero-based
  const [currentPage, setCurrentPage] = useState(0);

  table.rows = tableRows;

  const getData = useCallback(async () => {
    try {
      if (!shippedOrdersCache) {
        const res = await getShippedOrders();
        dispatch(setShippedOrdersCache(res));
      }
    } catch (error) {
      console.log(error)
    }
  }, [shippedOrdersCache, dispatch]);

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
    itemCount: shippedOrders ? shippedOrders.length : 0,
  };

  useEffect(() => {
    if (shippedOrders) {
      const rowsToSet = [];
      for (
        let i = currentPage * PAGE_SIZE;
        i < Math.min(currentPage * PAGE_SIZE + PAGE_SIZE, shippedOrders.length);
        i++
      ) {
        rowsToSet.push({
          component: TrackingOrderTableRow,
          props: { order: shippedOrders[i], isWarranty: true },
        });
      }
      setTableRows(rowsToSet);
    }
  }, [shippedOrders, currentPage]);

  return (
    <>
      <Head>
        <title>Track Orders - Orders - Nireeka Dashboard</title>
      </Head>

      <OrdersWrapper trending={props.trending} leaderboard={props.leaderboard} loader={getData}>
        {!!shippedOrdersCache?.data?.orders && shippedOrdersCache.data.orders.length > 0 ? (
          <Table table={table} />
        ) : (
          <WhiteShadowCard noPadding className="divide-y">
            <span className="text-sm">No item to display</span>
          </WhiteShadowCard>
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

export default TrackingPage;
