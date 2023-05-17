import { Fragment } from "react";
import dynamic from "next/dynamic";
import { Disclosure, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import NireekaLogo from "../../public/images/logo_nireeka_white.svg";
import NireekaLogoDark from "../../public/images/logo_nireeka_dark.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import LoginRegisterBtn from "../Atoms/login/LoginRegisterBtn";
import classNames from "functions/classNames";

const CartQuickView = dynamic(() => import("../Atoms/shopping/CartQuickView"), {ssr: false});
const UserUtilsMobile = dynamic(() => import("../Header/UserUtilsMobile"), {ssr: false});
const UserUtils = dynamic(() => import("../Header/UserUtils"), {ssr: false});


const navigation = [
  {
    name: "E-Bikes",
    href: "/configurator",
  },
  {
    name: "Accessories",
    href: "/accessories",
  },
  {
    name: "Spare Parts",
    href: "/spares",
  },
  {
    name: "Help Center",
    href: "/help-center",
  },
  {
    name: "Forum",
    href: "/forum",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  { name: "Contact", href: "/contact" },
];

const MainPageHeader = ({ darkHeader, bgTransparent }) => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const userData = useSelector((state) => state.auth.userData);

  return (
    <div className="relative w-full py-6 px-6 font-exo z-[2] ">
      <Disclosure as="nav">
        <div
          className="absolute inset-0 z-30 pointer-events-none"
          aria-hidden="true"
        />
        <div className="grid grid-cols-12 gap-4">
          {/* Logo */}
          <div className="col-span-5 md:col-span-2">
            <Link href="/">
              <a className="flex">
                <span className="sr-only">Nireeka</span>
                <div className="absolute h-8 w-52 sm:h-10 ">
                  {darkHeader ? (
                    <Image src={NireekaLogoDark} alt="Nireeka logo" />
                  ) : (
                    <Image src={NireekaLogo} alt="Nireeka logo" />
                  )}
                </div>
              </a>
            </Link>
          </div>

          {/* Navigation */}
          <div className="col-span-3 mx-auto md:col-span-8">
            <div className="hidden space-x-6 tb:block">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} passHref>
                  <a>
                    <span
                      className={`py-2 px-[2px] text-sm font-light ${
                        darkHeader && "text-gray-900"
                      } text-white border-b border-transparent cursor-pointer hover:border-red-500`}
                    >
                      {item.name}
                    </span>
                  </a>
                </Link>
              ))}
            </div>
          </div>

          {/* Buttons at right side */}
          <div className="flex justify-end col-span-4 md:col-span-2">
           
            {/* Utils */}
            <div>
              {isUserLoggedIn && userData ? (
                <div className="flex justify-end">
                  <div className="space-x-5 flex items-center">
                    <UserUtils
                      avatarClassName="hidden tb:block"
                      iconClassName={classNames(
                        darkHeader ? "text-gray-900" : "text-white"
                      )}
                      fill={darkHeader ? "#313847" : "#aaaaaa"}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-end space-x-5">
                  <div className="hidden tb:flex">
                    <LoginRegisterBtn
                      mode={darkHeader ? "dark" : "light"}
                      className="px-1 hover:border-b hover:border-red-500"
                    />
                  </div>
                  <div>
                    <CartQuickView
                      className={classNames(darkHeader ? "text-gray-900" : "text-white")}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Hamburger menu button */}
            <div className="flex justify-end px-3 tb:hidden tb:px-6">
              <Disclosure.Button className="text-gray-400 rounded-md hover:text-gray-500 focus:outline-none">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="w-6 h-6" aria-hidden="true" />
              </Disclosure.Button>
            </div>
          </div>
        </div>

        {/* Hamburger menu dropdown */}
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Disclosure.Panel className="absolute inset-x-0 top-0 z-30 p-2 transition origin-top-right transform tb:hidden">
            <div className="bg-black divide-y-2 rounded-lg shadow-lg ring-1 ring-white ring-opacity-5 divide-gray-50">
              <div className="px-5 pt-5 pb-6 sm:pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-48 ">
                      <Image src={NireekaLogo} alt="Nireeka logo" />
                    </div>
                  </div>
                  <div className="-mr-2">
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="w-6 h-6" aria-hidden="true" />
                    </Disclosure.Button>
                  </div>
                </div>
                <div className="flex flex-col">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href} passHref>
                      <a className="px-1 my-2 text-sm font-light text-white border-b border-transparent cursor-pointer text-md hover:border-red-500">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                  {isUserLoggedIn && userData ? (
                    <UserUtilsMobile
                      className="w-full pt-2 text-white border-t border-gray-700"
                      itemclassName="text-gray-300 border-b border-transparent hover:border-red-500"
                      profileNameclassName="text-gray-300"
                      iconClassName="text-white hover:text-gray-400"
                    />
                  ) : (
                    <Link href="/login" passHref>
                      <a className="px-1 my-2 font-light text-white border-b border-transparent cursor-pointer text-md hover:border-red-500">
                        Login
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
  );
};

export default MainPageHeader;
