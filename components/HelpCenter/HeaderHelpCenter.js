import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NireekaLogo from "../../public/images/logo_nireeka_white.svg";
import LoginRegisterBtn from "../Atoms/login/LoginRegisterBtn";
import CartQuickView from "../Atoms/shopping/CartQuickView";
import UserUtils from "../Header/UserUtils";
import SearchHelpCenter from "./Search";
import { Disclosure, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import UserUtilsMobile from "../Header/UserUtilsMobile";
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
  { name: "Contact", href: "/contact", current: false },
];
const HeaderHelpCenter = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const userData = useSelector((state) => state.auth.userData);

  const router = useRouter();

  return (
    <div>
      <header className="bg-gradient-to-r from-black to-blueHelpCenter h-fit ">
        <div>
          <div className="absolute flex justify-end left-4 top-[40px] md:hidden show z-[3]">
            <button className="ml-auto text-gray-200 md:hidden" onClick={() => router.back()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
          <div>
            <div className="relative flex justify-center lg:justify-start ">
              {/* <img src="{{ asset('images/logo_nireeka_white.svg') }}" alt="" className="w-64 px-8 py-8"> */}
              <div className="px-8 z-[5] ">
                <Link href="/" passHref>
                  <a target="_self">
                    <Image alt="nireeka-logo" src={NireekaLogo} width={200} height={100} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-transparent w-full absolute top-[12px]   ">
            <Disclosure as="nav" className="relative bg-transparent">
              <div>
                <div className="md:col-span-2 col-span-4 z-[2]">
                  <div className="flex justify-end px-6 py-6 md:hidden">
                    <Disclosure.Button className="text-white rounded-md hover:text-gray-500 focus:outline-none">
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="w-6 h-6" aria-hidden="true" />
                    </Disclosure.Button>
                  </div>
                  <div className="flex justify-end px-6 py-6">
                    {isUserLoggedIn && userData ? (
                      <div className="hidden -mt-1 space-x-5 md:flex">
                        <UserUtils iconClassName="text-white" />
                      </div>
                    ) : (
                      <>
                        <div className="hidden md:flex">
                          <LoginRegisterBtn
                            mode="light"
                            className="px-1 hover:border-b hover:border-red-500"
                          />
                          <div className="flex -mt-[6px] px-1">
                            <CartQuickView className="text-white" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Disclosure.Panel className="absolute inset-x-0 top-0 z-30 p-2 transition origin-top-right transform md:hidden">
                  <div className="bg-black divide-y-2 rounded-lg shadow-lg ring-1 ring-white ring-opacity-5 divide-gray-50">
                    <div className="px-5 pt-5 pb-6 sm:pb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="w-48 ">
                            <Image src={NireekaLogo} alt="Nireeka logo" />
                          </div>
                        </div>
                        <div className="-mr-2">
                          <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-transparent rounded-md hover:text-gray-500 hover:bg-gray-100">
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
                          <UserUtilsMobile className="w-full pt-2 text-white border-t border-gray-700" />
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
          <div className="pt-16 pb-40 ">
            <div className="relative flex flex-col items-center justify-center">
              <input type="hidden" />
              <Link href="/help-center">
                <a>
                  <h1 className="pb-6 text-4xl font-light text-white">Help Center</h1>
                </a>
              </Link>
              <SearchHelpCenter />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderHelpCenter;
