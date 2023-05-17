import { useRouter } from "next/router";
// import Breadcrumbs from "@/components/HelpCenter/Breadcrumbs";
import HeaderHelpCenter from "@/components/HelpCenter/HeaderHelpCenter";
import Topic from "@/components/HelpCenter/Topic";
import { getTopic } from "app/api/help/getTopic";
import Head from "next/head";
import { useEffect, useState } from "react";
import CustomHead from "@/components/seo/CustomHead";

export default function Index({ articles }) {
  const router = useRouter();
  const { topic } = router.query;

  const [isPageEmbedded, setIsPageEmbedded] = useState(false);

  const titleRouter = articles.data.topic.title;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location !== window.parent.location) setIsPageEmbedded(true);
    }
  }, []);


  return (
    <>
      <CustomHead
        selfTitle
        title={`Help Center | ${articles.data.topic.title}`}
        name={`Help Center | ${articles.data.topic.title}`}
      />
      <div>
        {!isPageEmbedded && <HeaderHelpCenter />}
        {topic.status === 404 ? (
          "Not Found"
        ) : (
          <Topic topics={articles} isPageEmbedded={isPageEmbedded} />
        )}
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { access_token } = context.req.cookies;
  const { topic } = params;
  let data = await getTopic(topic, access_token);

  return {
    props: { articles: data },
  };
}
