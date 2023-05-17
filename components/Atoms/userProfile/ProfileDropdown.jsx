import { Fragment } from "react";
import { useDispatch } from "react-redux";
import {
  UserIcon,
  LogoutIcon,
  CogIcon,
  CubeTransparentIcon,
  ChartBarIcon,
  ChartPieIcon,
  CreditCardIcon,
  CashIcon,
  TagIcon,
  SupportIcon,
} from "@heroicons/react/outline";
import { logoutPending } from "../../../app/store/authSlice";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import CartQuickView from "../shopping/CartQuickView";
import Image from "next/image";
import classNames from "functions/classNames";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const handleSignOut = async () => {
    dispatch(logoutPending());
  };

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-30 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          <Link href="/dashboard" passHref>
            <a>
              <div
                className="flex items-center px-2 py-2 space-x-2 text-sm font-light text-gray-700 border-b font-exo hover:bg-gray-100"
              >
                <div className="flex-shrink-0">
                  <Image
                    width={33}
                    height={33}
                    className="rounded-full"
                    src={userData?.avatar}
                    alt={userData?.user_name}
                    objectFit="cover"
                  />
                </div>
                <div className="ml-3">
                  <div
                    className="text-sm font-light "
                  >
                    {userData?.name} {userData?.last_name}
                  </div>
                  <div className="text-xs font-light text-gray-500">
                    {userData?.email && userData?.email.length > 18
                      ? `${userData.email.substring(0, 19)}...`
                      : userData?.email}
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/dashboard" passHref>
            <a className="flex items-center px-4 py-2 space-x-2 text-sm font-light text-gray-700 font-exo hover:bg-gray-100">
              <ChartPieIcon className="w-4 h-4 icon-stroke-width-1" />
              <span>Dashboard</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/dashboard/profile" passHref>
            <a className="flex items-center px-4 py-2 space-x-2 text-sm font-light text-gray-700 font-exo hover:bg-gray-100">
              <UserIcon className="w-4 h-4 icon-stroke-width-1" />
              <span>Profile</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/dashboard/orders" passHref>
            <a className="flex items-center px-4 py-2 space-x-2 text-sm font-light text-gray-700 font-exo hover:bg-gray-100">
              <TagIcon className="w-4 h-4 icon-stroke-width-1" />
              <span>Orders</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/dashboard/settings" passHref>
            <a className="flex items-center px-4 py-2 space-x-2 text-sm font-light text-gray-700 font-exo hover:bg-gray-100">
              <CogIcon className="w-4 h-4 icon-stroke-width-1" />
              <span>Settings</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/dashboard/payments" passHref>
            <a className="flex items-center px-4 py-2 space-x-2 text-sm font-light text-gray-700 font-exo hover:bg-gray-100">
              <CreditCardIcon className="w-4 h-4 icon-stroke-width-1" />
              <span>Payments</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/dashboard/credits" passHref>
            <a className="flex items-center px-4 py-2 space-x-2 text-sm font-light text-gray-700 font-exo hover:bg-gray-100">
              <CashIcon className="w-4 h-4 icon-stroke-width-1" />
              <span>Credits</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/dashboard/support" passHref>
            <a className="flex items-center px-4 py-2 space-x-2 text-sm font-light text-gray-700 font-exo hover:bg-gray-100">
              <SupportIcon className="w-4 h-4 icon-stroke-width-1" />
              <span>Support</span>
            </a>
          </Link>
        </Menu.Item>
        {!!userData && userData?.is_admin === 9 && (
          <Menu.Item>
            <Link href="/backoffice" passHref>
              <a className="flex items-center px-4 py-2 space-x-2 text-sm font-light text-gray-700 font-exo hover:bg-gray-100">
                <CubeTransparentIcon className="w-4 h-4 icon-stroke-width-1" />
                <span>Admin Panel</span>
              </a>
            </Link>
          </Menu.Item>
        )}
        <Menu.Item>
          <a
            className="flex items-center px-4 py-2 space-x-2 text-sm font-light text-red-600 cursor-pointer hover:bg-gray-100 font-exo"
            onClick={handleSignOut}
          >
            <LogoutIcon className="w-4 h-4 icon-stroke-width-1" />
            <span>Sign out</span>
          </a>
        </Menu.Item>
      </Menu.Items>
    </Transition>
  );
};

export default ProfileDropdown;
