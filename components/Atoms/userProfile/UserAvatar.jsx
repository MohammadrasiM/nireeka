import { Menu } from "@headlessui/react";
import classNames from "functions/classNames";
import Image from "next/image";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";

const UserAvatar = (props) => {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <Menu as="div" className={classNames("relative", props.className)}>
      <div>
        <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none">
          <span className="sr-only">Open user menu</span>
          {userData && (
            <>
              {/* {cartData && cartData.length !== 0 ? (
                <span className="absolute z-10 flex w-6 h-8 -top-1 -left-1">
                  <span className="absolute inline-flex w-3 h-3 bg-red-400 rounded-full opacity-75 animate-ping"></span>

                  <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
                </span>
              ) : null} */}

              <Image
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
                objectFit="cover"
                src={userData.avatar}
                alt=""
              />
            </>
          )}
        </Menu.Button>
      </div>
      <ProfileDropdown />
    </Menu>
  );
};

export default UserAvatar;
