import { getChannelsList, getPostsByChannel } from "../../../../app/api/forum";
import { useEffect, useState, useCallback } from "react";
import ForumLayout from "@/components/Forum/layout/ForumLayout";
import Pagination from "@/components/Atoms/pagination/Pagination";
import SecondaryNav from "@/components/Forum/layout/SecondaryNav";
import TertiaryColumn from "@/components/Forum/layout/TertiaryColumn";
import dynamic from "next/dynamic";
import { paginate } from "../../../../functions/paginate";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getForumLayoutProps } from "../../../../functions/getForumLayoutProps";
import { toast } from "react-toastify";
import ForumPostSkeleton from "@/components/Atoms/skeletonLoading/ForumPostSkeleton";
import Head from "next/head";

const QuickPost = dynamic(() => import("@/components/Forum/post/QuickPost"));
const Post = dynamic(() => import("@/components/Forum/post/Post"), { loading: ForumPostSkeleton });

const Channel = (props) => {
  const router = useRouter();
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const currentChannelSlug = router.query.channel_slug;

  const [isFetchingLoading, setIsFetchingLoading] = useState(false);
  // State to show newly fetched feed data
  const [posts, setPosts] = useState(props.posts);
  // Pagination Logic
  const pageCount = Math.ceil(props.pagination.total / props.pagination.page_size);
  const pagination = paginate(props.pagination.current, pageCount);
  const paginationLinks = pagination.indexes.map((pageIndex) => {
    if (pageIndex === -1) return "#";
    return { pathname: `/forum/channels/${currentChannelSlug}/${pageIndex}` };
  });

  const fetchFeedPosts = useCallback(async () => {
    setIsFetchingLoading(true);
    const feedDataRes = await getPostsByChannel(router.query.channel_slug, router.query.page_num);
    if (feedDataRes instanceof Error) {
      console.log("error");
      setPosts([]);
      setIsFetchingLoading(false);
      return;
    }

    setPosts(feedDataRes.data.threads);
    setIsFetchingLoading(false);
  }, [router.query.channel_slug, router.query.page_num]);

  useEffect(() => {
    fetchFeedPosts();
  }, [fetchFeedPosts]);

  return (
    <>
      <Head>
        <title>{router.query.channel_slug} - Channels - Nireeka Forum</title>
        <meta
          name="description"
          content={`Nireeka Forum - ${router.query.channel_slug} Page ${router.query.page_num} - Ask and answer questions about any Nireeka Product with the large community of E-Bike riders!`}
        />
      </Head>
      <ForumLayout
        leftColumn={<SecondaryNav channels={props.channels} />}
        rightColumn={<TertiaryColumn trending={props.trending} leaderboard={props.leaderboard} />}
      >
        {/* Rendering the QuickPost component if the user is logged in */}
        {isUserLoggedIn && <QuickPost channels={props.channels} refreshFeed={fetchFeedPosts} />}
        {/* Rendering posts in feed */}
        {!isFetchingLoading ? (
          posts.map((item, index) => (
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
    const { params } = context;

    responses = await Promise.all([getPostsByChannel(params.channel_slug, params.page_num), getForumLayoutProps()]);
    posts = responses[0];
    layoutProps = responses[1];
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
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const channels = await getChannelsList();

  // Looping through fetched channels list and making an API call for each slug to fetch pagination
  let channelPosts;
  let pagination;
  let totalPageCount;
  const paths = [];

  const requestsToExecute = [];
  for (let i = 0; i < channels.data.length; i++) requestsToExecute.push(getPostsByChannel(channels.data[i].slug, 1));

  const responses = await Promise.all(requestsToExecute);

  for (let i = 0; i < channels.data.length; i++) {
    try {
      channelPosts = responses[i];
      pagination = channelPosts.data.pagination;
      totalPageCount = Math.ceil(pagination.total / pagination.page_size);
      for (let j = 1; j <= totalPageCount; j++) {
        paths.push({
          params: {
            channel_slug: channels?.data[i]?.slug,
            page_num: `${j}`,
          },
        });
      }
    } catch (error) {
      console.log("Error fetching posts in getStaticPaths", error);
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export default Channel;
