import Tabs from "@/components/Atoms/buttons/Tabs";
import { getShippedOrders } from "app/api/user/finance";
import { setShippedOrdersCache } from "app/store/requestCacheState";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "./DashboardLayout";

const OrdersWrapper = ({ trending, leaderboard, loader, loading, children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cachedShippedOrders = useSelector((state) => state.cache.shippedOrders);
  const userData = useSelector((state) => state?.auth?.userData);

  const initialTabs = useMemo(
    () => [
      { name: "Bikes", count: userData?.orders_count?.bikes, href: "/dashboard/orders", current: false },
      { name: "Spare Parts", count: userData?.orders_count?.spares, href: "/dashboard/orders/spares", current: false },
      {
        name: "Accessories",
        count: userData?.orders_count?.accessories,
        href: "/dashboard/orders/accessories",
        current: false,
      },
      {
        name: "Warranties",
        count: userData?.orders_count?.warranties,
        href: "/dashboard/orders/warranties",
        current: false,
      },
    ],
    [userData]
  );

  const [tabs, setTabs] = useState(initialTabs);

  const loaderCallback = useCallback(async () => {
    if (typeof loader === "function") await loader();

    try {
      if (!cachedShippedOrders) {
        const shippedOrdersRes = await getShippedOrders();
        dispatch(setShippedOrdersCache(shippedOrdersRes));
      }
    } catch (error) {}

    highlightCorrectTab();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loader]);

  const highlightCorrectTab = useCallback(() => {
    if (!router.isReady) return;

    setTabs((prevTabs) => {
      const tabsToSet = [...prevTabs];
      for (let i = 0; i < prevTabs.length; i++) {
        if (router.pathname === prevTabs[i].href) tabsToSet[i].current = true;
        else tabsToSet[i].current = false;
      }

      return tabsToSet;
    });
  }, [router]);

  useEffect(() => {
    if (
      !!cachedShippedOrders?.data?.orders &&
      cachedShippedOrders.data.orders.length > 0 &&
      !tabs.find((tab) => tab.name === "Tracking")
    ) {
      setTabs((prevTabs) => [...prevTabs, { name: "Tracking", href: "/dashboard/orders/tracking", current: false }]);
      highlightCorrectTab();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedShippedOrders]);

  return (
    <DashboardLayout trending={trending} leaderboard={leaderboard} loader={loaderCallback} loading={loading}>
      <Tabs tabs={tabs} />
      {children}
    </DashboardLayout>
  );
};

export default OrdersWrapper;
