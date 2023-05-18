import { useCallback, useState } from "react";
import { getUserOrdersWithDetails } from "../../../app/api/user/finance";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import OrderCard from "@/components/Dashboard/orders/OrderCard";
import { getDashboardLayoutProps } from "../../../functions/getDashboardLayoutProps";
import OrderCardSkeleton from "@/components/Atoms/skeletonLoading/dashboard/OrderCardSkeleton";
import Head from "next/head";
import { useDispatch } from "react-redux";
import OrdersWrapper from "@/components/Dashboard/layout/OrdersWrapper";
import OrderPageTabsSkeleton from "@/components/Atoms/skeletonLoading/dashboard/OrderPageTabsSkeleton";
import Pagination from "@/components/Atoms/OrdersPagination";
import { paginate } from "../../../functions/paginate";
import { useRouter } from "next/router";
const OrdersLoading = () => (
  <>
    <OrderPageTabsSkeleton />
    <OrderCardSkeleton />
  </>
);

const OrdersPage = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  const { page } = query;
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState();

  const [paginationLinks, setPaginationLinks] = useState();
  const [wholePageData, setWholePageData] = useState({});
  const getData = async () => {
    if (router?.isReady) {
      setIsLoading(true);
      try {
        const userOrders = await getUserOrdersWithDetails(page ? page : 1);
        if (userOrders.data.order_bikes) {
          const data = userOrders?.data;
          setOrders(data.order_bikes);
          const pageCount = Math.ceil(data?.pagination?.total / data?.pagination?.page_size);
          const pageMade = paginate(data?.pagination?.current, pageCount);
          setWholePageData(data?.pagination);
          setPagination(pageMade);
          setPaginationLinks(
            pageMade.indexes.map((pageIndex) => {
              if (pageIndex === -1) return "#";
              return { pathname: `/dashboard/orders`, query: { page: pageIndex } };
            })
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  const getPageData = useCallback(() => getData(), [dispatch, page, router]);

  return (
    <>
      <Head>
        <title>Bikes - Orders - Nireeka Dashboard</title>
      </Head>
      <OrdersWrapper
        trending={props.trending}
        leaderboard={props.leaderboard}
        loading={OrdersLoading}
        loader={getPageData}
      >
        <div>
          <h2 className="sr-only">Products purchased</h2>
          <div className="space-y-8">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard key={order.id} order={order} setIsLoading={setIsLoading} isLoading={isLoading} />
              ))
            ) : (
              <WhiteShadowCard>
                <p className="text-sm">No item to display</p>
              </WhiteShadowCard>
            )}
            {pagination?.indexes && paginationLinks && paginationLinks?.length > 0 && (
              <div className="flex flex-col items-center gap-2 w-full">
                <div>
                  <p className="opacity-70 text-xs">
                    Showing {wholePageData?.current * wholePageData?.page_size - (wholePageData?.page_size - 1)} to{" "}
                    {wholePageData?.current * wholePageData?.page_size > wholePageData?.total
                      ? wholePageData?.total
                      : wholePageData?.current * wholePageData?.page_size}{" "}
                    of {wholePageData?.total}
                  </p>{" "}
                </div>
                <Pagination pagination={pagination} links={paginationLinks} />
              </div>
            )}
          </div>
        </div>
      </OrdersWrapper>
    </>
  );
};

export const getStaticProps = async ({ query }) => {
  const layoutProps = await getDashboardLayoutProps();

  return {
    props: {
      ...layoutProps,
    },
    revalidate: 60 * 5,
  };
};

export default OrdersPage;
