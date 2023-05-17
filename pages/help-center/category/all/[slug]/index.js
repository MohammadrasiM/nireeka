import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getAllCategory } from "../../../../../app/api/help/all";
import Breadcrumbs from "@/components/HelpCenter/Breadcrumbs";
import FooterHelpCenter from "@/components/HelpCenter/FooterHelpCenter";
import HeaderHelpCenter from "@/components/HelpCenter/HeaderHelpCenter";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import CustomHead from "@/components/seo/CustomHead";

export default function All({ articles }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  console.log(articles);

  return (
    <>
      {" "}
      <CustomHead
        selfTitle
        title={`Help Center | ${articles.data.title}`}
        name={`Help Center | ${articles.data.title}`}
        description={articles.data.description}
      />
      {loading ? (
        <>
          <div className="w-full h-screen mx-auto my-auto ">
            <LoadingNireeka className="w-10 h-10 mt-10 border-gray-600" />
          </div>
        </>
      ) : (
        <>
          <HeaderHelpCenter />
          <div className="bg-gray-100">
            <Breadcrumbs {...articles} />
            {/* section description */}
            <div className="w-11/12 pb-2 mx-auto border-b border-gray-300 lg:w-8/12">
              <div className="flex-col pt-2 pb-2 text-left bg-gray-100 align-center">
                <h2 className="py-1 text-4xl font-light">
                  {articles.data.title}
                </h2>
                <p className="py-1 pt-2 text-sm font-light text-gray-500 ">
                  {articles.data.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap w-11/12 px-4 py-8 mx-auto lg:w-8/12 ">
              {/* map */}
              {articles.data.topics.map((card) => {
                return (
                  <div className="w-full p-4 md:w-1/2 " key={card.id}>
                    <div
                      className="cursor-pointer "
                      onClick={() =>
                        router.push(`/help-center/topic/${card.slug}`)
                      }
                    >
                      <div>
                        <div className="px-6 py-10 pt-8 transition-all bg-white border rounded-md border-customColorNIR hover:border-indigo-700">
                          <h6 className="text-xl font-light ">{card.title}</h6>
                          <p className="pt-2 text-sm font-light text-gray-500 ">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* map */}
            </div>
          </div>
          <FooterHelpCenter />
        </>
      )}
    </>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  let data = await getAllCategory(slug);
  return {
    props: { articles: data, slug },
  };
}
