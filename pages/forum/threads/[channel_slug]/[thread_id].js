import Post from "@/components/Forum/post/Post";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import ForumLayout from "@/components/Forum/layout/ForumLayout";
import SecondaryNav from "@/components/Forum/layout/SecondaryNav";
import TertiaryColumn from "@/components/Forum/layout/TertiaryColumn";
import { getFeedPostsByPage, getThreadData } from "app/api/forum";
import { paginate } from "functions/paginate";
import { useRouter } from "next/router";
import CommentContext from "app/store/CommentContext";
import Head from "next/head";
import { getForumLayoutProps } from "functions/getForumLayoutProps";
import classNames from "functions/classNames";
import ForumPostSkeleton from "@/components/Atoms/skeletonLoading/ForumPostSkeleton";
import Pagination from "@/components/Atoms/pagination/Pagination";

const EditPost = dynamic(() => import("@/components/Forum/post/EditPost"), { ssr: false });
const Comment = dynamic(() => import("@/components/Forum/comment/Comment"), { ssr: false });
const AddComment = dynamic(() => import("@/components/Forum/comment/AddComment"), { ssr: false });

const renderComments = (
  comments,
  imgAlt,
  refreshThreadData,
  visibleCommentIndexStart = -1,
  visibleCommentIndexEnd = -1
) => {
  // if visibleCommentIndexStart or visibleCommentIndexEnd have negative values,
  // it means that the comment stack is not a root stack, it has to be a reply stack
  const isReplyStack = visibleCommentIndexStart < 0 || visibleCommentIndexEnd < 0;
  return comments.map((item, index) => {
    // If the comment object (item) didn't have any reply
    if (!item.hasOwnProperty("replies") || item.replies === undefined || item.replies.length === 0) {
      return (
        <Comment
          key={`commentid-${item.id}`}
          commentBody={item.body}
          imgPath={item.image_path}
          imgAlt={imgAlt}
          user={item.user}
          lastUpdatedDate={item.created_at}
          commentId={item.id}
          likeCount={item.like_count}
          isLiked={item.is_like}
          isCommentHidden={item.is_hidden}
          isVisible={index >= visibleCommentIndexStart && index < visibleCommentIndexEnd}
          isReply={isReplyStack}
          refreshThreadData={refreshThreadData}
        />
      );
    } else {
      // If the comment object (item) had at least one reply
      return (
        <Comment
          key={`commentid-${item.id}`}
          commentBody={item.body}
          imgPath={item.image_path}
          imgAlt={imgAlt}
          user={item.user}
          lastUpdatedDate={item.created_at}
          commentId={item.id}
          likeCount={item.like_count}
          isLiked={item.is_like}
          isCommentHidden={item.is_hidden}
          isVisible={!isReplyStack && index >= visibleCommentIndexStart && index < visibleCommentIndexEnd}
          isReply={isReplyStack}
          refreshThreadData={refreshThreadData}
        >
          {renderComments(item.replies, imgAlt, refreshThreadData)}
        </Comment>
      );
    }
  });
};

const Thread = (props) => {
  const router = useRouter();

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  // Fetching thread data after a change (edit)
  const [threadData, setThreadData] = useState(props.threadData);
  // Toggle edit mode logic
  const [isEditing, setIsEditing] = useState(true);
  // Visible/Hidden thread styles
  const [isThreadHidden, setIsThreadHidden] = useState(threadData?.is_hidden);
  // Controls showing a loading
  const [isThreadLoading, setIsThreadLoading] = useState(true);
  // Pagination for comments
  const [commentSectionPage, setCommentSectionPage] = useState(1);
  const COMMENTS_IN_EACH_PAGE = 10;
  const COMMENT_PAGE_COUNT = Math.ceil((threadData?.comments?.length || 0) / COMMENTS_IN_EACH_PAGE);
  const commentPagination = paginate(commentSectionPage, COMMENT_PAGE_COUNT);
  const COMMENT_INDEX_START = (commentSectionPage - 1) * COMMENTS_IN_EACH_PAGE;
  const COMMENT_INDEX_END = COMMENT_INDEX_START + COMMENTS_IN_EACH_PAGE;

  const refreshThreadData = useCallback(async () => {
    setIsThreadLoading(true);
    const res = await getThreadData(router.query.channel_slug, router.query.thread_id);

    if (res instanceof Error) {
      console.log("error");
      setIsThreadLoading(false);
      return;
    }

    setThreadData(res.data);
    setIsThreadHidden(res.data.is_hidden);
    setIsThreadLoading(false);
  }, [router.query.channel_slug, router.query.thread_id]);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const changeCommentPageHandler = useCallback((pageIndex) => {
    setCommentSectionPage(pageIndex);
  }, []);

  const togglePostVisibilityStyle = () => {
    setIsThreadHidden((prevState) => !prevState);
  };

  useEffect(() => {
    refreshThreadData();
  }, [refreshThreadData]);

  return (
    <>
      <Head>
        <title>{threadData?.title || ""} - Nireeka Forum</title>
        <meta name="description" content={threadData?.body?.substring(0, 160) || "Nireeka Forum"} />
        <meta property="og:title" content={threadData?.title || "Nireeka Forum"} />
        <meta property="og:type" content="article" />
        {!!threadData?.channel?.slug && !!threadData?.id && (
          <meta
            property="og:url"
            content={`https://nireeka.com/forum/threads/${threadData.channel.slug}/${threadData.id}`}
          />
        )}
        {!!threadData?.image_path ? (
          <meta property="og:image" content={threadData.image_path} />
        ) : !!threadData?.files[0] ? (
          <meta property="og:image" content={threadData.files[0].path} />
        ) : (
          <meta property="og:image" content="/images/logo_nireeka_white.svg" />
        )}
      </Head>
      <ForumLayout
        leftColumn={<SecondaryNav channels={props.channels} />}
        rightColumn={<TertiaryColumn trending={props.trending} leaderboard={props.leaderboard} />}
      >
        {isThreadLoading ? (
          <ForumPostSkeleton />
        ) : threadData ? (
          <>
            {isEditing ? (
              <Post
                user={threadData.user}
                channel={threadData.channel}
                postTitle={threadData.title}
                postBody={threadData.body}
                threadId={threadData.id}
                postFiles={threadData.files}
                imagePath={threadData.image_path}
                videoUrl={threadData.video_url}
                lastUpdateDate={threadData.updated_at}
                viewCount={threadData.visit_count}
                commentCount={threadData.comment_count}
                likeCount={threadData.like_count}
                isLiked={threadData.is_like}
                toggleEditMode={toggleEditMode}
                isThreadHidden={isThreadHidden}
                togglePostVisibilityStyle={togglePostVisibilityStyle}
                isSubscribed={threadData.is_subscribe}
              />
            ) : (
              <EditPost
                user={threadData.user}
                defaultChannelId={threadData.channel.id}
                defaultPostTitle={threadData.title}
                defaultPostBody={threadData.body}
                threadId={threadData.id}
                defaultPostPics={threadData.files}
                imagePath={threadData.image_path}
                videoUrl={threadData.video_url}
                lastUpdateDate={threadData.updated_at}
                viewCount={threadData.visit_count}
                commentCount={threadData.comment_count}
                likeCount={threadData.like_count}
                isLiked={threadData.is_like}
                channels={props.channels}
                toggleEditMode={toggleEditMode}
                isThreadHidden={isThreadHidden}
              />
            )}
            {(isUserLoggedIn || threadData.comments.length !== 0) && (
              <>
                {commentPagination.totalPages > 1 && (
                  <Pagination pagination={commentPagination} onPageIndexClick={changeCommentPageHandler} noHref />
                )}
                <WhiteShadowCard className={classNames(isThreadHidden && "bg-gray-200")}>
                  {isUserLoggedIn && <AddComment onSubmitUpdateUI={refreshThreadData} />}
                  {threadData.comments.length !== 0 && (
                    <CommentContext.Provider value={{ bubbleContentWidth: null }}>
                      <ul>
                        {renderComments(
                          threadData.comments,
                          threadData.title,
                          refreshThreadData,
                          COMMENT_INDEX_START,
                          COMMENT_INDEX_END
                        )}
                      </ul>
                    </CommentContext.Provider>
                  )}
                </WhiteShadowCard>
                {commentPagination.totalPages > 1 && (
                  <Pagination pagination={commentPagination} onPageIndexClick={changeCommentPageHandler} noHref />
                )}
              </>
            )}
          </>
        ) : (
          <p>
            Thread data is not available. This page is either deleted or you don&apos;t have the permission to view it.
          </p>
        )}
      </ForumLayout>
    </>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  let responses;
  let post;
  let layoutProps;
  try {
    responses = await Promise.all([getThreadData(params.channel_slug, params.thread_id), getForumLayoutProps()]);

    post = responses[0];
    layoutProps = responses[1];
  } catch (error) {
    post = null;
    layoutProps = null;
  }
  let propData = {};
  if (layoutProps) {
    propData = {
      threadData: post?.data || null,
      ...(layoutProps || null),
    };
  } else {
    propData = {
      threadData: post?.data || null,
    };
  }
  return {
    props: propData,
  };
};

export const getStaticPaths = async () => {
  let page1;
  let paths;

  try {
    page1 = await getFeedPostsByPage(1);

    paths = [];
    for (let thread of page1.data.threads) {
      paths.push({ params: { thread_id: thread?.id?.toString(), channel_slug: thread?.channel?.slug } });
    }
  } catch (error) {
    paths = [];
  }
  return {
    paths,
    fallback: "blocking",
  };
};

export default Thread;
