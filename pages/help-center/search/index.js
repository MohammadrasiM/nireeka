import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resultPending } from "../../../app/store/helpCenterSlice";
import HeaderHelpCenter from "@/components/HelpCenter/HeaderHelpCenter";
import CenteredPageNumbers from "@/components/HelpCenter/CenteredPageNumbers";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import TopicItem from "@/components/HelpCenter/TopicItem";
import CustomHead from "@/components/seo/CustomHead";

export default function Index() {
  const router = useRouter();
  const pathSearchQ = router.query.q;
  const pathSearchPage = router.query.page;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let { resultData, resultSuccess, searchReqSuccess } = state.helpCenter;
  useEffect(() => {
    if (pathSearchQ) {
      dispatch(resultPending({ result: pathSearchQ, id: pathSearchPage || 1 }));
    }
  }, [pathSearchQ]);

  //
  const Knowledge = () => {
    {
      !resultData && (
        <div className="w-full mx-auto h-50 ">
          <LoadingNireeka className="w-10 h-10 mt-10 border-gray-600" />
        </div>
      );
    }
    if (resultData?.topics.length === 0) {
      return (
        <p className="pb-8 mt-3 font-light">
          No results for {` `}
          <span className="font-light text-customColorNIR">
            {`${pathSearchQ}`}
          </span>
          {` `}
          <Link href="/help-center" passHref>
            <a className="font-light underline cursor-pointer">
              Browse knowledge base
            </a>
          </Link>
        </p>
      );
    } else {
      <p className="mt-3">
        <span className="font-light text-customColorNIR">
          {" "}
          {`${pathSearchQ}`}
        </span>
        {` `}
        <Link href="/help-center" passHref>
          <a className="font-light underline cursor-pointer">
            Browse knowledge base
          </a>
        </Link>
      </p>;
    }
  };

  let pagesNumber = Math.ceil(
    resultData ? resultData.pagination.total / 10 : 1
  );

  return (
    <>
      <CustomHead
        selfTitle
        title={`Help Center | Search`}
        name={`Help Center | Search`}
      />
      <div>
        <HeaderHelpCenter />

        <div className="bg-gray-100 ">
          <div className="w-full px-2 mx-auto lg:w-8/12 ">
            <div className="flex-col pt-2 pb-1 text-left bg-gray-100 align-center">
              <h2 className="py-1 mt-8 text-3xl font-light md:text-4xl">
                {resultData?.topics.length} results for {`${pathSearchQ}`}
              </h2>
            </div>
          </div>
          {/* {resultData} */}
          <div className="w-full px-2 mx-auto lg:w-8/12 ">
            <div className="flex-col pt-2 text-left bg-gray-100 pb- align-center">
              <h2 className="px-2 py-1 text-2xl font-light text-gray-700">
                Knowledge base
              </h2>
              {/* @if(count($topics) == 0) */}

              {Knowledge()}
              {/* @endif */}
            </div>

            <div className="bg-gray-100">
              <div className="flex-col w-full px-1 py-0 mx-auto md:px-4">
                {/* <!-- Input container -->
                    @foreach($topics as $topic) */}
                {!resultData && (
                  <div className="w-full h-screen mx-auto ">
                    <LoadingNireeka className="w-10 h-10 mt-10 border-gray-600" />
                  </div>
                )}
                {resultData?.topics.map((item) => {
                  return <TopicItem key={item.title} item={item} />;
                })}

                {/* @endforeach */}
              </div>
            </div>
            {pagesNumber > 0 && (
              <CenteredPageNumbers pagesNumber={pagesNumber} />
            )}
          </div>
        </div>
        {/* <FooterHelpCenter /> */}
      </div>
    </>
  );
}
