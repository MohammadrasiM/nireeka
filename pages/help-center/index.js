import HeaderHelpCenter from "@/components/HelpCenter/HeaderHelpCenter";
import FooterHelpCenter from "@/components/HelpCenter/FooterHelpCenter";
import MainHelpCenter from "@/components/HelpCenter/MainHelpCenter";
import { useDispatch } from "react-redux";
// import { setSearchData } from "../../app/HelpCenterSlice";
import { getHelp } from "../../app/api/help";
import { getSearch } from "../../app/api/help/search";
import { useSelector } from "react-redux";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import CustomHead from "@/components/seo/CustomHead";

const HelpCenter = ({ Help }) => {
  const state = useSelector((state) => state);
  let { searchData } = state.helpCenter;
  const [loading, setLoading] = useState(false);
  console.log(Help);

  return (
    <>
      {/* <Head>
        <title>Nireeka Help Center</title>
      </Head> */}
      <CustomHead
        selfTitle
        title="Help Center | Nireeka Help Center"
        name="Help Center | Nireeka Help Center"
      />

      {loading ? (
        <div className="w-full h-screen mx-auto my-auto ">
          <LoadingNireeka className="w-10 h-10 mt-10 border-gray-600" />
        </div>
      ) : (
        <div>
          <HeaderHelpCenter />
          <MainHelpCenter Help={Help} />
          {/* <FooterHelpCenter /> */}
        </div>
      )}
    </>
  );
};

export default HelpCenter;

export async function getServerSideProps({ context }) {
  let data = await getHelp();
  return {
    props: { Help: data },
  };
}

// id:
// slug:
// title:
// description:
