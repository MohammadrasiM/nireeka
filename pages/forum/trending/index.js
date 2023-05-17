import { useState, useEffect, useCallback } from "react";
import { getAllTrendingPosts } from "../../../app/api/forum";
import ForumLayout from "@/components/Forum/layout/ForumLayout";
import SecondaryNav from "@/components/Forum/layout/SecondaryNav";
import TertiaryColumn from "@/components/Forum/layout/TertiaryColumn";
import { getForumLayoutProps } from "../../../functions/getForumLayoutProps";
import Post from "@/components/Forum/post/Post";
import { toast } from "react-toastify";
import Head from "next/head";

const TrendingPage = (props) => {
  // State to show newly fetched feed data
  const [posts, setPosts] = useState(props.posts);
  const fetchAllTrendingPosts = useCallback(async () => {
    const allTrendingRes = await getAllTrendingPosts();
    if (allTrendingRes instanceof Error) {
      console.log('error')
      return;
    }
    setPosts(allTrendingRes.data.populars);
  }, []);

  useEffect(() => {
    fetchAllTrendingPosts();
  }, [fetchAllTrendingPosts]);

  return (
    <>
      <Head>
        <title>Trending - Nireeka Forum</title>
        <meta
          name="description"
          content={`Nireeka Forum - Ask and answer questions about any Nireeka Product with the large community of E-Bike riders!`}
        />
      </Head>
      <ForumLayout
        leftColumn={<SecondaryNav channels={props.channels} />}
        rightColumn={<TertiaryColumn trending={props.trending} leaderboard={props.leaderboard} />}
      >
        {posts.map((item, index) => (
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
            viewCount={item.visit_count}
            likeCount={item.like_count}
            commentCount={item.comment_count}
            isLiked={item.is_like}
            isThreadHidden={item.is_hidden}
            isSubscribed={item.is_subscribe}
          />
        ))}
      </ForumLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const responses = await Promise.all([getForumLayoutProps(), getAllTrendingPosts()]);
  const layoutProps = responses[0];
  const allTrendingPosts = responses[1];

  return {
    props: {
      posts: allTrendingPosts.data.populars,
      ...layoutProps,
    },
    revalidate: 60,
  };
};

export default TrendingPage;
