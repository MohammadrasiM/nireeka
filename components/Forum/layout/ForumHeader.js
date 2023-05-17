import { Fragment } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { navigation } from "./data";
import SearchBar from "../UI/SearchBar";
import UserUtils from "../../Header/UserUtils";
import LoginRegisterBtn from "../../Atoms/login/LoginRegisterBtn";
import UserUtilsMobile from "../../Header/UserUtilsMobile";
import BackButton from "../../Header/BackButton";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const ForumHeader = () => {
  const router = useRouter();
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const userData = useSelector((state) => state.auth.userData);

  return (
    <Popover
      as="header"
      className={({ open }) => {
        `${open ? "fixed inset-0 z-40 overflow-y-auto" : ""}
          bg-white shadow-sm lg:static lg:overflow-y-visible`;
      }}
    >
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex justify-between lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Back button on small screens */}
              <BackButton className="lg:hidden" />
              {/* Logo */}
              <div className="flex items-center mx-auto lg:static lg:mx-0 lg:col-span-3 xl:col-span-2">
                <Link passHref href="/">
                  <a>
                    <img
                      className="block w-auto h-5 cursor-pointer sm:h-6"
                      src="/images/logo_nireeka_dark.svg"
                      alt="Nireeka"
                    />
                  </a>
                </Link>
              </div>
              {/* Search bar */}
              <div className="flex-1 hidden min-w-0 lg:block md:px-8 lg:px-0 lg:col-span-7 xl:col-span-6">
                <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 lg:px-0">
                  <SearchBar />
                </div>
              </div>
              {/* Mobile menu button */}
              <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                <Popover.Button className="inline-flex items-center justify-center p-2 -mx-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
              {/* Profile icon, notification OR Login and register buttons */}
              <div className="hidden space-x-3 lg:flex lg:items-center lg:justify-end lg:col-span-2 xl:col-span-4">
                {isUserLoggedIn && userData ? (
                  <UserUtils />
                ) : (
                  <LoginRegisterBtn mode="dark" className="hover:text-blue-600" />
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel as="nav" className="lg:hidden relative z-20" aria-label="Global">
              {/* Navigation */}
              <div className="max-w-3xl px-2 pt-2 pb-3 mx-auto space-y-1 sm:px-4">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} passHref>
                    <a
                      aria-current={item.current ? "page" : undefined}
                      className={`${
                        item.current ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50"
                      } flex items-center rounded-md py-2 px-3 text-sm font-light`}
                    >
                      <item.icon className="w-5 h-5 mr-2 icon-stroke-width-1" />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              {/* Profile XOR login and register buttons */}
              <div className="py-4 border-t border-gray-200">
                {isUserLoggedIn && userData ? (
                  <UserUtilsMobile
                    className="max-w-3xl px-4 sm:px-6"
                    itemClassName="text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  />
                ) : (
                  <div className="flex max-w-3xl mx-auto justify-evenly">
                    <Link href="/register" passHref>
                      <a className="flex justify-center flex-1">
                        <button
                          type="button"
                          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm w-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Register
                        </button>
                      </a>
                    </Link>
                    <Link
                      href={{ pathname: "/login", query: { nireekaContinue: router.asPath } }}
                      passHref
                    >
                      <a className="flex justify-center flex-1">
                        <button
                          type="button"
                          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Login
                        </button>
                      </a>
                    </Link>
                  </div>
                )}
              </div>
              {/* Search bar */}
              <div className="max-w-3xl px-2 mx-auto mt-6 sm:px-4">
                <SearchBar />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ForumHeader;
