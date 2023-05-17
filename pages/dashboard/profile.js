import { getDashboardLayoutProps } from "../../functions/getDashboardLayoutProps";
import DashboardLayout from "@/components/Dashboard/layout/DashboardLayout";
import classNames from "../../functions/classNames";
import { useSelector } from "react-redux";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import ProfileHeader from "@/components/Dashboard/profile/ProfileHeader";
import dynamic from "next/dynamic";
import ProfilePageSkeleton from "@/components/Atoms/skeletonLoading/dashboard/ProfilePageSkeleton";
import InitialPasswordForm from "@/components/Dashboard/profile/InitialPasswordForm";
import UserProfileInfoSkeleton from "@/components/Atoms/skeletonLoading/dashboard/UserProfileInfoSkeleton";
import Head from "next/head";

const ShippingAddressesList = dynamic(() =>
  import("@/components/Dashboard/profile/ShippingAddressesList")
);
const ChangePassword = dynamic(() => import("@/components/Dashboard/profile/ChangePassword"));
const PrivacySettings = dynamic(() => import("@/components/Dashboard/profile/PrivacySettings"));
const ForumActivity = dynamic(() => import("@/components/Dashboard/profile/ForumActivity"));
const UserProfileDetails = dynamic(
  () => import("@/components/Dashboard/profile/UserProfileDetails"),
  { loading: UserProfileInfoSkeleton }
);

const tabs = [
  { id: 0, name: "Profile" },
  { id: 1, name: "Shipping Addresses" },
  { id: 2, name: "Privacy" },
  { id: 3, name: "Change Password" },
];
const DashboardProfile = (props) => {
  // State to handle active profile tab
  // 0 => profile, 1 => Shipping Addresses, 2 => Privacy, 3 => Change Password
  const [activeProfileTab, setActiveProfileTab] = useState(0);

  const userData = useSelector((state) => state.auth.userData);

  return (
    <>
      <Head>
        <title>Profile - Nireeka Dashboard</title>
        <meta
          name="description"
          content={
            "Edit your Nireeka account profile. Change your profile picture and other personal data. Add your physical info to make your bike work perfect for you."
          }
        />
      </Head>

      <DashboardLayout
        trending={props.trending}
        leaderboard={props.leaderboard}
        loading={ProfilePageSkeleton}
      >
        <WhiteShadowCard noPadding>
          <main className="flex-1 relative z-0 focus:outline-none xl:order-last">
            <div>
              <ProfileHeader />

              {/* Tabs */}
              <div className="mt-6 sm:mt-2 overflow-x-scroll sm:overflow-x-auto">
                <div className="border-b border-gray-200">
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                      <Swiper
                        slidesPerView={"auto"}
                        spaceBetween={0}
                        id="dashboard-profile-tab-swiper"
                        className="select-none"
                        modules={[FreeMode]}
                        freeMode={true}
                      >
                        {tabs.map((tab) => (
                          <SwiperSlide
                            className={classNames(
                              tab.id === activeProfileTab
                                ? "border-blue-500 text-gray-900"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                            )}
                            key={tab.name}
                            onClick={() => setActiveProfileTab(tab.id)}
                          >
                            <span>{tab.name}</span>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </nav>
                  </div>
                </div>
              </div>

              {/* User Profile */}
              {activeProfileTab === 0 && <UserProfileDetails />}
              {activeProfileTab === 1 && <ShippingAddressesList />}
              {activeProfileTab === 2 && <PrivacySettings />}
              {activeProfileTab === 3 ? (
                userData.has_password ? (
                  <ChangePassword />
                ) : (
                  <InitialPasswordForm />
                )
              ) : null}
            </div>
          </main>
        </WhiteShadowCard>

        {userData && <ForumActivity userID={userData.id} />}
      </DashboardLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const layoutProps = await getDashboardLayoutProps();

  return {
    props: {
      ...layoutProps,
    },
    revalidate: 60,
  };
};

export default DashboardProfile;
