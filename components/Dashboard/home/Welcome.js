import { FireIcon, CreditCardIcon, TicketIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useSelector } from "react-redux";
import WhiteButton from "../../Atoms/buttons/WhiteButton";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import ConditionalLink from "../../Atoms/links/ConditionalLink";

const Welcome = () => {
  const userData = useSelector((state) => state.auth.userData);

  const stats = [
    {
      label: "Points",
      value: userData.points,
      icon: <FireIcon className="icon-stroke-width-1 w-7 h-7 text-red-600" />,
    },
    {
      label: "Payments",
      value: userData.payments,
      href: "/dashboard/payments",
      icon: <CreditCardIcon className="icon-stroke-width-1 w-7 h-7 text-sky-600" />,
    },
    {
      label: "Tickets",
      value: userData.tickets.all,
      href: "/dashboard/support",
      icon: <TicketIcon className="icon-stroke-width-1 w-7 h-7 text-green-600" />,
    },
  ];

  return (
    <section aria-labelledby="profile-overview-title">
      <WhiteShadowCard noPadding className="overflow-hidden">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0 flex items-center justify-center">
                <Image
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full"
                  objectFit="cover"
                  src={userData.avatar}
                  alt={userData.name + " " + userData.last_name}
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">Welcome back,</p>
                <p className="text-xl font-medium text-gray-900 sm:text-2xl flex items-center justify-center flex-col sm:flex-row ">
                  <span>{userData.name + " " + userData.last_name}</span>
                  <span className="text-sm font-light sm:ml-2">@{userData.user_name}</span>
                </p>
                <p className="text-sm font-medium text-gray-600">{userData.email}</p>
              </div>
            </div>
            <WhiteButton
              className="mt-5 mx-auto sm:mx-0 sm:ml-auto sm:mt-0"
              href="/dashboard/profile"
            >
              View profile
            </WhiteButton>
          </div>
        </div>
        <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {stats.map((stat) => (
            <div key={stat.label}>
              <ConditionalLink href={stat.href} condition={!!stat.href} className="w-full h-full">
                <div className="px-6 py-5 text-sm font-light flex flex-col items-center">
                  {stat.icon}
                  <span className="text-gray-900 text-5xl mt-2 mb-1">{stat.value}</span>{" "}
                  <span className="text-gray-600">{stat.label}</span>{" "}
                </div>
              </ConditionalLink>
            </div>
          ))}
        </div>
      </WhiteShadowCard>
    </section>
  );
};

export default Welcome;
