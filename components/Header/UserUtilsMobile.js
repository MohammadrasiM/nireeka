import Image from "next/image";
import Link from "next/link";
import {
  CogIcon,
  UserIcon,
  LogoutIcon,
  CubeTransparentIcon,
  TagIcon,
  CreditCardIcon,
  CashIcon,
  SupportIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import classNames from "../../functions/classNames";
import { useDispatch } from "react-redux";
import { logoutPending } from "../../app/store/authSlice";
import CartQuickView from "../Atoms/shopping/CartQuickView";
import ComparisonHeaderButton from "../comparator/ComparisonHeaderButton";

const UserUtilsMobile = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const handleSignOutClick = async () => {
    dispatch(logoutPending());
  };

  if (!userData) return <></>;

  return (
    <div className={classNames("mx-auto font-exo", props.className)}>
      <Link href="/dashboard" passHref>
        <a>
          <div className={classNames("flex items-center mt-3", props.userInfoClassName)}>
            <div className="flex-shrink-0">
              <Image
                width={40}
                height={40}
                className="rounded-full"
                src={userData?.avatar}
                alt={userData?.user_name}
                objectFit="cover"
              />
            </div>
            <div className="ml-3">
              <div
                className={classNames(
                  "text-base text-[14px] font-light",
                  props.profileNameClassName
                )}
              >
                {userData.name} {userData.last_name}
              </div>
              <div className="text-[14px] font-light text-gray-500">{userData.email}</div>
            </div>
            <div className="flex ml-auto space-x-4" onClick={(e) => e.preventDefault()}>
              <CartQuickView className={props.iconClassName} />
              <ComparisonHeaderButton className={props.iconClassName} />
            </div>
          </div>
        </a>
      </Link>
      <div className={classNames("mt-3 mx-auto", props.listClassName)}>
        <Link href="/dashboard/profile" passHref>
          <a
            className={classNames(
              "flex items-center py-2 text-[14px] font-light",
              props.itemClassName
            )}
          >
            <UserIcon className="w-5 h-5 mr-2 icon-stroke-width-1" />
            <span>Profile</span>
          </a>
        </Link>
        <Link href="/dashboard/orders" passHref>
          <a
            className={classNames(
              "flex items-center py-2 text-[14px] font-light",
              props.itemClassName
            )}
          >
            <TagIcon className="w-5 h-5 mr-2 icon-stroke-width-1" />
            <span>Orders</span>
          </a>
        </Link>
        <Link href="/dashboard/settings" passHref>
          <a
            className={classNames(
              "flex items-center py-2 text-[14px] font-light",
              props.itemClassName
            )}
          >
            <CogIcon className="w-5 h-5 mr-2 icon-stroke-width-1" />
            <span>Settings</span>
          </a>
        </Link>
        <Link href="/dashboard/payments" passHref>
          <a
            className={classNames(
              "flex items-center py-2 text-[14px] font-light",
              props.itemClassName
            )}
          >
            <CreditCardIcon className="w-5 h-5 mr-2 icon-stroke-width-1" />
            <span>Payments</span>
          </a>
        </Link>
        <Link href="/dashboard/credits" passHref>
          <a
            className={classNames(
              "flex items-center py-2 text-[14px] font-light",
              props.itemClassName
            )}
          >
            <CashIcon className="w-5 h-5 mr-2 icon-stroke-width-1" />
            <span>Credits</span>
          </a>
        </Link>
        <Link href="/dashboard/support" passHref>
          <a
            className={classNames(
              "flex items-center py-2 text-[14px] font-light",
              props.itemClassName
            )}
          >
            <SupportIcon className="w-5 h-5 mr-2 icon-stroke-width-1" />
            <span>Support</span>
          </a>
        </Link>
        {!!userData && userData?.is_admin === 9 && (
          <Link href="/backoffice" passHref>
            <a
              className={classNames(
                "flex items-center py-2 text-[14px] font-light",
                props.itemClassName
              )}
            >
              <CubeTransparentIcon className="w-5 h-5 mr-2 icon-stroke-width-1" />
              <span>Admin Panel</span>
            </a>
          </Link>
        )}
        <Link href="" passHref>
          <a
            className={classNames(
              "flex items-center py-2 text-[14px] font-light text-red-500 hover:text-red-600 font-exo",
              props.itemClassName
            )}
            onClick={handleSignOutClick}
          >
            <LogoutIcon className="w-5 h-5 mr-2 icon-stroke-width-1" />
            <span className="font-exo text-[14px]">Sign out</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default UserUtilsMobile;
