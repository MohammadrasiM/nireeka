import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { MenuIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "../../functions/classNames";
import UserUtils from "./UserUtils";
import UserUtilsMobile from "./UserUtilsMobile";
import { useSelector } from "react-redux";
import LoginRegisterBtn from "../Atoms/login/LoginRegisterBtn";
import BackButton from "./BackButton";
import CartQuickView from "../Atoms/shopping/CartQuickView";
import ComparisonHeaderButton from "../comparator/ComparisonHeaderButton";
import { GetWindowSize } from "../Atoms/windowSize/GetWindowSize";
//
// /images/logos/nireeka-red.svg
//
const navigation = [
  { name: "E-Bikes", href: "/configurator", current: true },
  { name: "Accessories", href: "/accessories", current: false },
  { name: "Spare Parts", href: "/spares", current: false },
  { name: "Help Center", href: "/help-center", current: false },
  { name: "Forum", href: "/forum", current: false },
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Contact", href: "/contact", current: false },
];

export default function MainHeader() {
  // top fix revenat bike
  // const [showRevenant, setShowRevenant] = useState(false);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShowRevenant(true);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // });
  // top fix revenat bike
  const router = useRouter();
  const { pathname } = router;

  const userData = useSelector((state) => state.auth.userData);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  //
  const { height, width } = GetWindowSize();

  //halloween modal

  // Conditions to not show header on specific page
  const condition1 = router.asPath === "/";
  const condition2 = pathname.includes("/help-center");
  const condition3 = pathname.includes("/forum");
  const condition4 = pathname.includes("/dashboard");
  const condition5 = pathname.includes("/landing");

  if (condition1 || condition2 || condition3 || condition4 || condition5)
    return <Fragment />;

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          {/* {showRevenant && (
            <div
              className="w-full h-100 pt-1 pb-[8px] px-0.5 border-b border-b-gray-300"
              style={{ backgroundColor: "white" }}
            >
              <h3 className="font-light text-center">
                The all-new
                <span className="text-lg font-semibold text-black">
                  {` Nireeka Revenant `}
                </span>
                is here! Get your VIP discount here
                <Link
                  passHref
                  href={"https://www.indiegogo.com/projects/nireeka-revenant"}
                >
                  <div className="inline">
                    {`>>`}
                    <a className="text-[#eb1075] hover:opacity-80 transition-all ease-in font-extrabold text-2xl cursor-pointer">
                      INDIEGOGO
                    </a>
                    {`<<`}
                  </div>
                </Link>
              </h3>
            </div>
          )} */}

          <div className="w-full px-2 mx-auto max-w-8xl sm:px-6 lg:px-16">
            <div className="relative flex justify-between h-16">
              {/* Back button */}
              <BackButton className="ts:hidden" />

              {/* search button */}
              {pathname.includes("/spares") && (
                <button className="absolute md:hidden top-[1.25rem] xs-between:hidden sm-between:right-[6rem] md-between:right-[6.5rem] right-[9rem] ">
                  <SearchIcon className="w-6 h-6 text-gray-500 icon-stroke-width-1 hover:text-customColorNIR" />
                </button>
              )}

              {/* search button */}

              {/* Nireeka Logo */}
              <div className="flex items-center justify-center flex-1 ts:items-stretch ts:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <Link href="/" passHref>
                    <a className="absolute left-500 -translate-x-500 top-500 -translate-y-500">
                      <img
                        className="block w-auto h-8 rounded-full md:hidden"
                        src="/images/logos/nireeka-red.svg"
                        alt="Nireeka Logo"
                      />
                    </a>
                  </Link>
                  <Link href="/" passHref>
                    <a>
                      <img
                        className="hidden w-auto h-6 lg:block"
                        src="https://api.nireeka.com/images/logo_nireeka_dark.svg"
                        alt="Nireeka Logo"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden ts:ml-6 ts:flex ts:space-x-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          router.pathname.includes(item.href)
                            ? "border-customColorNIR   text-[14px]  text-gray-900 "
                            : " hover:border-gray-300 hover:text-gray-700 ",
                          "border-transparent text-gray-500 inline-flex items-center font-light px-1 pt-1 border-b-2 text-[14px] font-exo"
                        )}
                        aria-current={
                          router.pathname.includes(item.href)
                            ? "page"
                            : undefined
                        }
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              {/* promo */}
              <div className="hidden xl-between:pl-0 xl:flex 2xl-between:flex justify-between 3xl-between:pl-[100px]">
                {/* <div
                      className="flex flex-col justify-center item-center cursor-pointer"
                      onClick={() => setBackDrop(true)}
                    >
                      <h3 className="text-xl md:text-2xl pt-1">
                        Happy Halloweeen
                      </h3>
                      <p className=" text-sm font-medium pb-0.5 text-gray-800 text-center">
                        Get your
                        <span className="text-xl font-bold text-orange-500">{` $250 `}</span>
                        discount here!
                      </p>
                    </div> */}
              </div>
              {/* Buttons at right side */}
              <div className="flex items-center z-[2]">
                {/* Utils */}
                <div className="flex items-center space-x-5 ">
                  {isUserLoggedIn && userData ? (
                    <UserUtils avatarClassName="hidden ts:block" />
                  ) : (
                    <>
                      <LoginRegisterBtn
                        mode="white"
                        className="hidden text-gray-400 hover:text-sky-500 ts:block"
                      />
                      <CartQuickView />
                      <ComparisonHeaderButton />
                    </>
                  )}
                </div>

                {/* Mobile menu button */}
                <div className="ts:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-800 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none ">
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
          </div>

          <Disclosure.Panel className="ts:hidden">
            <div className="pt-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a>
                    <Disclosure.Button
                      className={classNames(
                        router.pathname.includes(item.href)
                          ? "text-[14px] text-sky-700 border-sky-500 bg-sky-50 font-light"
                          : "hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700",
                        "border-transparent text-gray-500 block pl-3 pr-4 py-2 border-l-4 text-[14px]  font-exo w-full text-left"
                      )}
                      aria-current={
                        router.pathname.includes(item.href) ? "page" : undefined
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  </a>
                </Link>
              ))}

              {userData && isUserLoggedIn ? (
                <UserUtilsMobile
                  className="border-transparent"
                  userInfoClassName="px-3"
                  itemClassName="font-exo hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 font-light text-gray-500 block px-3 py-2 border-l-4 border-transparent w-full text-left"
                />
              ) : (
                <>
                  <Link href="/login" passHref>
                    <a className="font-exo">
                      <Disclosure.Button
                        className={classNames(
                          "hover:bg-gray-50 font-light hover:border-gray-300 hover:text-gray-700",
                          "border-transparent text-gray-500 block pl-3 pr-4 py-2 border-l-4 text-sm font-exo w-full text-left"
                        )}
                      >
                        Login
                      </Disclosure.Button>
                    </a>
                  </Link>
                  {/* Link */}
                  <Link href="/register" passHref>
                    <a className="font-exo">
                      <Disclosure.Button
                        href="/register"
                        className={classNames(
                          "hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 font-ligh",
                          "border-transparent text-gray-500 block pl-3 pr-4 py-2 border-l-4 text-sm font-exo w-full text-left"
                        )}
                      >
                        Register
                      </Disclosure.Button>
                    </a>
                  </Link>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
