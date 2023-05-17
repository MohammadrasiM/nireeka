import ForumPostSkeleton from "@/components/Atoms/skeletonLoading/ForumPostSkeleton";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfileByUserID } from "../../../app/api/user/profile";
import Tabs from "../../Atoms/buttons/Tabs";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import Comment from "../../Forum/comment/Comment";
import Post from "../../Forum/post/Post";

const initialTabs = [
  { name: "Threads", href: "#", current: true },
  { name: "Comments", href: "#", current: false },
  { name: "Followings", href: "#", current: false },
];

const ForumActivity = (props) => {
  // State to handle selected tab content
  // 0 => forum posts, 1 => comments, 2 => followings
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState(initialTabs);

  // User data (inc. forum posts and comments)
  const [userData, setUserData] = useState(null);

  // State to show whether the component is being loaded or not
  const [isLoading, setIsLoading] = useState(true);

  const loggedInUserData = useSelector((state) => state.auth.userData);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    setTabs((prevState) => {
      const newState = [...prevState];

      for (let i = 0; i < newState.length; i++) {
        newState[i].current = i === tabIndex;
      }

      return newState;
    });
  };

  const getComponentData = useCallback(async () => {
    setIsLoading(true);
    try {
      const userDataRes = await getUserProfileByUserID(props.userID);
      setUserData(userDataRes.data);
    } catch (error) {
      console.log(error)
      return;
    }

    setIsLoading(false);
  }, [props.userID]);

  useEffect(() => {
    getComponentData();
  }, [getComponentData]);

  return (
    <div className="space-y-4 mt-10">
      <h3 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl pl-4 sm:pl-0">
        {activeTab === 0 && "Forum Posts"}
        {activeTab === 1 && "Forum Comments"}
        {activeTab === 2 && "Followings"}
      </h3>
      <Tabs noHref tabs={tabs} onTabClick={handleTabChange} />
      {isLoading ? (
        <ForumPostSkeleton />
      ) : (
        <>
          {activeTab === 0 &&
            (userData?.threads?.length === 0 ? (
              <WhiteShadowCard>
                <p className="text-sm">
                  {loggedInUserData?.id === props.userID ? "You haven't" : "This user has't"}{" "}
                  created any thread.
                </p>
              </WhiteShadowCard>
            ) : (
              userData?.threads?.map((post, index) => (
                <Post
                  key={`post-${Math.random()}-${index}`}
                  user={post.user}
                  channel={post.channel}
                  postTitle={post.title}
                  postBody={post.body}
                  postFiles={post.files}
                  imagePath={post.image_path}
                  lastUpdateDate={post.updated_at}
                  postSlug={post.slug}
                  threadId={post.id}
                  viewCount={post.visit_count}
                  likeCount={post.like_count}
                  commentCount={post.comment_count}
                  isLiked={post.is_like}
                  isThreadHidden={post.is_hidden}
                  isSubscribed={post.is_subscribe}
                />
              ))
            ))}
          {activeTab === 1 && (
            <WhiteShadowCard>
              <ul>
                {userData?.comments.length === 0 && (
                  <p className="text-sm">
                    {loggedInUserData?.id === props.userID ? "You haven't" : "This user has't"}{" "}
                    posted any comment.
                  </p>
                )}
                {userData?.comments.map((comment) => (
                  <Comment
                    key={`commentid-${comment.id}`}
                    commentBody={comment.body}
                    imgPath={comment.image_path}
                    user={comment.user}
                    lastUpdatedDate={comment.created_at}
                    commentId={comment.id}
                    likeCount={comment.like_count}
                    isLiked={comment.is_like}
                    isCommentHidden={comment.is_hidden}
                    isVisible={true}
                    isFullWidth
                    actionsAreHidden
                  />
                ))}
              </ul>
            </WhiteShadowCard>
          )}
          {activeTab === 2 && (
            <WhiteShadowCard>
              <p className="text-sm">Coming soon...</p>
            </WhiteShadowCard>
          )}
        </>
      )}
    </div>
  );
};

export default ForumActivity;
