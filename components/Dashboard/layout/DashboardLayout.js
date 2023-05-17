import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronLeftIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Trending from "@/components/Atoms/trending/Trending";
import Leaderboard from "@/components/Atoms/leaderboard/Leaderboard";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import Link from "next/link";
import UserUtils from "@/components/Header/UserUtils";
import UserUtilsMobile from "@/components/Header/UserUtilsMobile";
import DashboardSearchBar from "./DashboardSearchBar";
import DashboardDesktopNavigation from "./DashboardDesktopNavigation";
import sum from "lodash/sum";
import values from "lodash/values";
import Image from "next/image";

const DashboardLayout = (props) => {
  const router = useRouter();

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthLoading = useSelector((state) => state.auth.isAuthLoading);

  const [isPageDataLoading, setIsPageDataLoading] = useState(true);

  const { loader } = props;

  const loadPageData = useCallback(async () => {
    setIsPageDataLoading(true);
    if (typeof loader === "function") await loader();
    setIsPageDataLoading(false);
  }, [loader]);

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/login");
    }
  }, [isUserLoggedIn, router, userData, isAuthLoading]);

  useEffect(() => {
    loadPageData();
  }, [loadPageData]);

  const navigation = useMemo(
    () => [
      {
        name: "Home",
        href: "/",
        current: router.pathname === "/",
      },
      {
        name: "Dashboard",
        href: "/dashboard",
        current: router.pathname === "/dashboard",
      },
      {
        name: "Profile",
        href: "/dashboard/profile",
        current: router.pathname.includes("/dashboard/profile"),
      },
      {
        name: "Orders",
        href: "/dashboard/orders",
        count: userData?.orders_count
          ? sum(values(userData?.orders_count))
          : null,
        current: router.pathname.includes("/dashboard/orders"),
      },
      {
        name: "Settings",
        href: "/dashboard/settings",
        current: router.pathname.includes("/dashboard/settings"),
      },
      {
        name: "Payments",
        href: "/dashboard/payments",
        count: userData?.payments || null,
        current: router.pathname.includes("/dashboard/payments"),
      },
      {
        name: "Credits",
        href: "/dashboard/credits",
        count: userData?.credits || null,
        current: router.pathname.includes("/dashboard/credits"),
      },
      // {
      //   name: "Challenges",
      //   href: "/dashboard/challenges",
      //   current: router.pathname.includes("/dashboard/challenges"),
      // },
      {
        name: "Support",
        href: "/dashboard/support",
        count: userData?.tickets ? sum(values(userData?.tickets)) : null,
        current: router.pathname.includes("/dashboard/support"),
      },
    ],
    [router.pathname, userData]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Disclosure
        as="nav"
        className="pb-24 bg-gradient-to-r from-gray-200 to-gray-300"
      >
        {({ open }) => (
          <>
            <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                {/* Logo */}
                <div className="absolute left-0 flex-shrink-0 hidden py-5 md:block lg:static">
                  <Link href="/" passHref>
                    <a>
                      <span className="sr-only">Nireeka</span>
                      <div
                        style={{ overflow: "hidden", position: "relative" }}
                        className="w-[33px] h-[24px] max-h-[30px] min-w-[170px]"
                      >
                        <Image
                          src="/images/logo_nireeka_dark.svg"
                          alt="Nireeka"
                          loading="eager"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="left"
                          quality={100}
                        />
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="absolute left-0 flex flex-shrink-0 py-5 md:hidden lg:static">
                  <Link href="/" passHref>
                    <a>
                      <span className="sr-only">Nireeka</span>
                      {/* <img
                        className="block w-auto h-8 rounded-full"
                        src="/images/logos/nireeka-red.svg"
                        alt="Nireeka Logo"
                        title="Nireeka"
                      /> */}

                      <div
                        style={{ overflow: "hidden", position: "relative" }}
                        className="w-[29px] h-[29px] max-h-[29px] min-w-[29px]"
                      >
                        <Image
                          className="block w-auto h-8 rounded-full"
                          src="/images/logos/nireeka-red.svg"
                          alt="Nireeka Logo"
                          title="Nireeka"
                          loading="eager"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="left"
                          quality={100}
                        />
                      </div>
                    </a>
                  </Link>
                </div>
                {/* Right section on desktop (Profile and bell icon) */}
                <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5 space-x-5">
                  <UserUtils fill="#666666" />
                </div>

                {/* Header on mobile */}
                <div className="w-full py-5 lg:border-t lg:border-gray-600 lg:border-opacity-20">
                  <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                    {/* Desktop nav */}
                    <div className="hidden lg:block lg:col-span-2">
                      <DashboardDesktopNavigation navigation={navigation} />
                    </div>
                    <div className="px-12 lg:px-0">
                      {/* Search */}
                      <DashboardSearchBar />
                    </div>
                  </div>
                </div>

                {/* Menu button */}
                <div className="absolute right-0 flex-shrink-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-700 bg-transparent rounded-md hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon
                        className="block w-6 h-6 icon-stroke-width-1"
                        aria-hidden="true"
                      />
                    ) : (
                      <MenuIcon
                        className="block w-6 h-6 icon-stroke-width-1"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            {/* Mobile menu dropdown */}
            <Transition.Root as={Fragment}>
              <div className="lg:hidden">
                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Disclosure.Panel
                    focus
                    className="absolute inset-x-0 top-0 z-30 w-full max-w-3xl p-2 mx-auto transition origin-top transform"
                  >
                    <div className="bg-white divide-y divide-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="pt-3 pb-2">
                        <div className="flex items-center justify-between px-4">
                          <Link href="/" passHref>
                            <a>
                              <div
                                style={{
                                  overflow: "hidden",
                                  position: "relative",
                                }}
                                className="w-[33px] h-[24px] max-h-[30px] min-w-[170px]"
                              >
                                <Image
                                  className="block w-auto h-6 rounded-full lg:hidden"
                                  src="/images/logo_nireeka_dark.svg"
                                  alt="Nireeka Logo"
                                  title="Nireeka"
                                  loading="eager"
                                  layout="fill"
                                  objectFit="cover"
                                  objectPosition="left"
                                  quality={100}
                                />
                              </div>
                              {/* <img
                                className="block w-auto h-6 rounded-full lg:hidden"
                                src="/images/logo_nireeka_dark.svg"
                                alt="Nireeka Logo"
                              /> */}
                            </a>
                          </Link>
                          <div className="-mr-2">
                            <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                              <span className="sr-only">Close menu</span>
                              <XIcon className="w-6 h-6" aria-hidden="true" />
                            </Disclosure.Button>
                          </div>
                        </div>
                        <div className="px-2 mt-3 space-y-1">
                          <Link
                            key="back-to-nireeka-shop"
                            href="/configurator"
                            passHref
                          >
                            <a className="block px-3 py-2 text-base font-light text-gray-900 transition-all rounded-md font-exo hover:bg-gray-100 hover:text-gray-800">
                              <span className="flex items-center">
                                <ChevronLeftIcon
                                  className="w-5 h-5 icon-stroke-width-1"
                                  viewBox="5 0 24 24"
                                />
                                <span>Back to Nireeka Shop</span>
                              </span>
                            </a>
                          </Link>
                          {navigation.map((item) => (
                            <Link key={item.name} href={item.href} passHref>
                              <a className="block px-3 py-2 text-base font-light text-gray-900 transition-all rounded-md font-exo hover:bg-gray-100 hover:text-gray-800">
                                {item.name}{" "}
                                {item?.count ? `(${item?.count})` : undefined}
                              </a>
                            </Link>
                          ))}
                        </div>
                        <div className="px-5 pt-4 mt-2 text-sm text-gray-700 border-t border-gray-300">
                          <UserUtilsMobile />
                        </div>
                      </div>
                    </div>
                  </Disclosure.Panel>
                </Transition.Child>
              </div>
            </Transition.Root>
          </>
        )}
      </Disclosure>
      <main className="pb-8 -mt-24">
        <div className="max-w-3xl px-0 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Main 3 column grid */}
          <div className="grid items-start grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              {isUserLoggedIn &&
              userData &&
              !isAuthLoading &&
              !isPageDataLoading ? (
                props.children
              ) : props.loading ? (
                <props.loading />
              ) : (
                <div className="flex justify-center mt-40">
                  <LoadingNireeka className="border-gray-600 w-14 h-14" />
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              <Trending posts={props.trending} />
              <Leaderboard leaderboard={props.leaderboard} noNumber />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="py-8 text-sm text-center text-gray-500 border-t border-gray-200 sm:text-left">
            <span className="block sm:inline">&copy; 2022 Nireeka Inc.</span>{" "}
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
