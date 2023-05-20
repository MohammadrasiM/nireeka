import { getFeedPostsByPage } from "../../app/api/forum";
import { useCallback, useEffect, useState } from "react";
import ForumLayout from "@/components/Forum/layout/ForumLayout";
import Pagination from "@/components/Atoms/pagination/Pagination";
// import Post from "@/components/Forum/post/Post";
import SecondaryNav from "@/components/Forum/layout/SecondaryNav";
import TertiaryColumn from "@/components/Forum/layout/TertiaryColumn";
import dynamic from "next/dynamic";
import { paginate } from "../../functions/paginate";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getForumLayoutProps } from "../../functions/getForumLayoutProps";
import { toast } from "react-toastify";
import Head from "next/head";
import ForumPostSkeleton from "@/components/Atoms/skeletonLoading/ForumPostSkeleton";

const QuickPost = dynamic(() => import("@/components/Forum/post/QuickPost"), { ssr: false });
const Post = dynamic(() => import("@/components/Forum/post/Post"), { loading: ForumPostSkeleton });

const Forum = (props) => {
  const router = useRouter();
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  const [isFetchingLoading, setIsFetchingLoading] = useState(false);
  // State to show newly fetched feed data
  const [posts, setPosts] = useState(props.posts);
  const fetchFeedPosts = useCallback(async () => {
    setIsFetchingLoading(true);
    const feedDataRes = await getFeedPostsByPage(router.query.page_num);

    if (feedDataRes instanceof Error) {
      console.log("Error in fetching user's data", feedDataRes.response);
      setIsFetchingLoading(false);
      return;
    }

    setPosts(feedDataRes.data.threads);
    setIsFetchingLoading(false);
  }, [router.query.page_num]);

  useEffect(() => {
    fetchFeedPosts();
  }, [fetchFeedPosts]);

  // Pagination Logic
  const pageCount = Math.ceil(props?.pagination?.total / props?.pagination?.page_size);
  const pagination = paginate(props?.pagination?.current, pageCount);
  const paginationLinks = pagination.indexes.map((pageIndex) => {
    if (pageIndex === -1) return "#";
    return { pathname: `/forum/${pageIndex}` };
  });

  return (
    <>
      <Head>
        <title>Nireeka Forum</title>
        <meta
          name="description"
          content={`Nireeka Forum - Page ${router.query.page_num} - Ask and answer questions about any Nireeka Product with the large community of E-Bike riders!`}
        />
        <meta property="og:title" content="Nireeka Forum" />
        <meta property="og:type" content="page" />
        <meta property="og:url" content={`https://nireeka.com/forum/${router.query.page_num}`} />
      </Head>

      <ForumLayout
        leftColumn={<SecondaryNav channels={props.channels} />}
        rightColumn={<TertiaryColumn trending={props.trending} leaderboard={props.leaderboard} />}
      >
        {/* Rendering the QuickPost component if the user is logged in */}
        {isUserLoggedIn && <QuickPost channels={props.channels} refreshFeed={fetchFeedPosts} />}

        {/* Rendering posts in feed */}
        {!isFetchingLoading ? (
          posts?.map((item, index) => (
            <Post
              key={`post-${Math.random()}-${index}`}
              user={item.user}
              channel={item.channel}
              postTitle={item.title}
              postBody={item.body}
              postFiles={item.files}
              imagePath={item.image_path}
              lastUpdateDate={item.updated_at}
              postSlug={item.slug}
              threadId={item.id}
              lastComment={item?.last_comment}
              viewCount={item.visit_count}
              likeCount={item.like_count}
              commentCount={item.comment_count}
              isLiked={item.is_like}
              isThreadHidden={item.is_hidden}
              isSubscribed={item.is_subscribe}
            />
          ))
        ) : (
          <>
            <ForumPostSkeleton />
            <ForumPostSkeleton />
            <ForumPostSkeleton />
            <ForumPostSkeleton />
            <ForumPostSkeleton />
            <ForumPostSkeleton />
            <ForumPostSkeleton />
            <ForumPostSkeleton />
            <ForumPostSkeleton />
          </>
        )}
        <Pagination pagination={pagination} links={paginationLinks} />
      </ForumLayout>
    </>
  );
};

export const getStaticProps = async (context) => {
  let responses;
  let posts;
  let layoutProps;
  try {
    leaderboardData = await fetchLeaderboardData();
    const { page_num } = context.params;
    responses = await Promise.all([getFeedPostsByPage(page_num), getForumLayoutProps()]);
    posts = responses[0];
    layoutProps = responses[1];
    console.log(responses, "responsesresponses");
  } catch (error) {
    posts = null;
    layoutProps = null;
  }

  return {
    props: {
      posts: posts?.data?.threads || null,
      pagination: posts?.data?.pagination || null,
      ...layoutProps,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  let posts;
  let pageCount;
  let paths;

  try {
    posts = await getFeedPostsByPage(1);

    pageCount = Math.ceil(posts?.data?.pagination?.total / posts?.data?.pagination?.page_size);
    paths = [];
    for (let i = 1; i <= pageCount; i++) paths.push({ params: { page_num: `${i}` } });
  } catch (error) {
    paths = [];
  }
  return {
    paths,
    fallback: false,
  };
};

export default Forum;
