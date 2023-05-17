import Link from "next/link";
import { useRouter } from "next/router";
import { getCategory } from "../../../../app/api/help/category";
import Breadcrumbs from "@/components/HelpCenter/Breadcrumbs";
import FooterHelpCenter from "@/components/HelpCenter/FooterHelpCenter";
import HeaderHelpCenter from "@/components/HelpCenter/HeaderHelpCenter";
import Head from "next/head";
import { useEffect, useState } from "react";
import CustomHead from "@/components/seo/CustomHead";

export default function ArticleListCategory({ articles }) {
  const router = useRouter();
  const { slug } = router.query;

  const [isPageEmbedded, setIsPageEmbedded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location !== window.parent.location) setIsPageEmbedded(true);
    }
  }, []);

  return (
    <>
      <CustomHead
        selfTitle
        title={`Help Center | ${articles.data.title}`}
        name={`Help Center | ${articles.data.title}`}
        description={articles.data.description}
      />

      <div>
        {!isPageEmbedded && <HeaderHelpCenter />}
        <div className="bg-gray-100 ">
          {/* breadcrumbs */}
          <Breadcrumbs {...articles} />
          {/* section description */}
          <div className="w-full px-3 pb-1 mx-auto border-b border-gray-300 lg:pb-2 lg:w-8/12">
            <div className="flex-col pt-2 pb-1 bg-gray-100 lg:pb-5text-left align-center">
              <h2 className="py-2 text-3xl font-light md:text-4xl">
                {articles.data.title}
              </h2>
              <p className="py-2 text-sm font-light text-gray-500">
                {articles.data.description}
              </p>
            </div>
          </div>

          {articles.data.categories.length > 0 ? (
            articles.data.categories.map((item) => (
              <div
                key={`${item.slug}-${item.id}`}
                className="w-full pb-2 mx-auto mt-2 border-b border-gray-300 lg:w-8/12"
              >
                <div className="flex-col pt-1 pb-1 text-left bg-gray-100 lg:pt-4 align-center">
                  {/* <Link href={`${item.slug}/${item.id}`}> */}
                  <Link href={`/help-center/category/${item.slug}`}>
                    <a className="font-light cursor-pointer text-sky-700 hover:text-indigo-700">
                      <h2 className="px-3 py-2 text-2xl underline">
                        {item.title}
                      </h2>
                    </a>
                  </Link>

                  <div className="pb-2 bg-gray-100 lg:pb-6">
                    <div className="flex flex-wrap w-full px-0 py-0 mx-auto md:px-4 md:w-full">
                      {item.topics.map((topic) => {
                        let str = topic.title;
                        str = str.replace(/\s+/g, "-").toLowerCase();
                        str = str.replace(/\//g, "").toLowerCase();
                        str = str.replace(/["']/g, "").toLowerCase();

                        return (
                          <Link
                            href={`/help-center/topic/${topic.slug}`}
                            passHref
                            key={topic.id}
                          >
                            <div
                              className="w-full p-3 md:w-1/2 "
                              key={topic.id}
                            >
                              <a className="cursor-pointer ">
                                <div
                                  className="h-40 px-6 pt-8 bg-white border rounded-md border-customColorNIR hover:border-indigo-700"
                                  key={topic.id}
                                >
                                  <h6 className="text-xl font-light ">
                                    {topic.title}
                                  </h6>
                                  <p className="text-sm font-light text-gray-500 ">
                                    {topic.description}
                                  </p>
                                </div>
                              </a>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  {item.count > 6 ? (
                    <div className="flex-col px-3 text-left bg-gray-100 align-center">
                      <button className="flex justify-center px-4 py-2 mt-2 text-sm font-light text-white border border-transparent rounded-md shadow-sm bg-customColorNIR hover:border-customColorNIR hover:bg-transparent hover:text-customColorNIR focus:outline-none focus:ring-2 focus:ring-offset-2">
                        <Link href={`/help-center/category/all/${item.slug}`}>
                          <a>see all {item.count} article</a>
                        </Link>
                      </button>
                    </div>
                  ) : null}
                </div>
                {/* map */}
              </div>
            ))
          ) : (
            <div className="w-full px-4 pb-4 mx-auto mt-2 border-b border-gray-300 lg:w-8/12">
              <div className="flex-col pt-4 pb-1 text-left bg-gray-100 align-center">
                <div className="pb-6 bg-gray-100 lg:pb-12">
                  <h2 className="px-1 py-2 text-2xl font-light underline">
                    {articles.data.title}
                  </h2>
                  <div className="flex flex-wrap w-full px-1 py-5 mx-auto lg:py-12 lg:px-4 ">
                    {articles.data.topics.map((topic) => {
                      let str = topic.title;
                      str = str.replace(/\s+/g, "-").toLowerCase();
                      str = str.replace(/\//g, "").toLowerCase();
                      str = str.replace(/["']/g, "").toLowerCase();

                      return (
                        <>
                          <Link
                            href={`/help-center/topic/${topic.slug}`}
                            passHref
                          >
                            <div
                              className="w-full p-3 md:w-1/2 "
                              key={topic.id}
                            >
                              <a className="cursor-pointer ">
                                <div
                                  className="h-40 px-6 pt-8 bg-white border rounded-md border-customColorNIR hover:border-yellow-500"
                                  key={topic.id}
                                >
                                  <h6 className="text-xl font-light">
                                    {topic.title}
                                  </h6>
                                  <p className="pt-2 text-sm font-light text-gray-500 ">
                                    {topic.description}
                                  </p>
                                </div>
                              </a>
                            </div>
                          </Link>

                          {articles.data.count > 6 ? (
                            <div className="flex-col text-left bg-gray-100 align-center">
                              <button className="flex justify-center px-4 py-2 text-sm font-light text-white border border-transparent rounded-md shadow-sm mt-7 bg-customColorNIR hover:border-customColorNIR hover:bg-transparent hover:text-customColorNIR focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">
                                <Link
                                  href={`/help-center/category/all/${item.slug}`}
                                >
                                  <a>see all {item.count} article</a>
                                </Link>
                              </button>
                            </div>
                          ) : null}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <FooterHelpCenter /> */}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  let data = await getCategory(slug);
  return {
    props: { articles: data, slug },
  };
}
