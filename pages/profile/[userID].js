import { getUserProfileByUserID } from "../../app/api/user/profile";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import ForumActivity from "@/components/Dashboard/profile/ForumActivity";
import ProfileLayout from "@/components/Profile/ProfileLayout";
import { getDashboardLayoutProps } from "../../functions/getDashboardLayoutProps";
import { UserIcon } from "@heroicons/react/outline";
import PrimaryButton from "@/components/Atoms/buttons/PrimaryButton";
import { useSelector } from "react-redux";
import Head from "next/head";
import Image from "next/image";
const profileStyles = {
  position: "relative",
  overflow: "hidden",

  "@media (max-width: 900px)": {
    height: "6rem",
    width: "6rem",
  },
};
export default function UserProfilePage(props) {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <>
      <Head>
        <title>{props.user.display_name + "'s profile" + " - Nireeka"}</title>
      </Head>
      <ProfileLayout trending={props.trending} leaderboard={props.leaderboard}>
        <WhiteShadowCard noPadding className="pb-6">
          {/* Cover image */}
          <div>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                height: "32vh",
                maxHeight: "12rem",
                minHeight: "8rem",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="cover"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                // loading="eager"
                priority={true}
                className="h-32 w-full object-cover lg:h-48 rounded-t-lg"
              />
            </div>
            {/* <img
              className="h-32 w-full object-cover lg:h-48 rounded-t-lg"
              src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt=""
            /> */}
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              {/* Profile pic */}
              <div className="flex relative">
                {/* <img
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 object-cover"
                  src={!!props.user.avatar ? props.user.avatar : "#"}
                  alt=""
                /> */}
                <div
                  style={profileStyles}
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 object-cover"
                >
                  <Image
                    src={!!props.user.avatar ? props.user.avatar : "#"}
                    alt="avatar"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    // loading="eager"
                    priority={true}
                  />
                </div>
              </div>
              {/* Data NEXT TO profile pic (on larger screens) */}
              <div className="flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-center sm:space-x-6 space-y-4 md:space-y-0 sm:pb-1">
                <div className="sm:hidden md:block min-w-0 flex-1">
                  <h1 className="text-2xl font-medium text-gray-900 truncate">
                    {!!props.user.display_name && props.user.display_name}
                  </h1>
                  <span className="text-gray-600 font-light">
                    {!!props.user.username && "@" + props.user.username}
                  </span>
                </div>
                <div className="sm:hidden md:block space-x-2">
                  {!!userData && userData?.is_admin === 9 && (
                    <PrimaryButton
                      href={`https://api.nireeka.com/backoffice/users/${props.user.id}`}
                    >
                      <UserIcon
                        className="-ml-1 mr-2 h-5 w-5 text-white icon-stroke-width-1"
                        aria-hidden="true"
                      />
                      <span>View on Admin Panel</span>
                    </PrimaryButton>
                  )}
                </div>
              </div>
            </div>
            {/* Data BELLOW profile pic (on larger screens) */}
            <div className="hidden sm:flex md:hidden mt-4 min-w-0 flex-1">
              <div>
                <h1 className="text-2xl font-medium text-gray-900 truncate">
                  {!!props.user.display_name && props.user.display_name}
                </h1>
                <span className="text-gray-600 font-light">
                  {!!props.user.username && props.user.username}
                </span>
              </div>
              <div className="ml-auto">
                {!!userData && userData?.is_admin === 9 && (
                  <PrimaryButton
                    href={`https://api.nireeka.com/backoffice/users/${props.user.id}`}
                  >
                    <UserIcon
                      className="-ml-1 mr-2 h-5 w-5 text-gray-700 icon-stroke-width-1"
                      aria-hidden="true"
                    />
                    <span>View on Admin Panel</span>
                  </PrimaryButton>
                )}
              </div>
            </div>
          </div>
        </WhiteShadowCard>
        <ForumActivity userID={props.user.id} />
      </ProfileLayout>
    </>
  );
}

export const getStaticProps = async (context) => {
  const userProfileRes = await getUserProfileByUserID(context.params.userID);
  const layoutProps = await getDashboardLayoutProps();

  return {
    props: { user: userProfileRes.data, ...layoutProps },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
