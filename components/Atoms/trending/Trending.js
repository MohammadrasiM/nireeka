import WhiteShadowCard from "../cards/WhiteShadowCard";
import PostSummary from "./PostSummary";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useState, Fragment, useCallback, useEffect } from "react";
import { getTrendingPosts } from "../../../app/api/forum";
import Link from "next/link";
import WhiteButton from "../buttons/WhiteButton";
import { getAllTrendingPosts } from "functions/getAllTrendingPosts";

const sortByMenu = [
  {
    text: "Comments",
    keyInAPI: "comment",
    icon: <i className="font-fontello icon-comment-empty" />,
  },
  {
    text: "Likes",
    keyInAPI: "popularity",
    icon: <i className="font-fontello icon-heart-empty" />,
  },
  {
    text: "Views",
    keyInAPI: "view",
    icon: <i className="font-fontello icon-eye" />,
  },
];

const Trending = (props) => {
  const [trendingPosts, setTrendingPosts] = useState(props.posts);
  const [sortTrendingBy, setSortTrendingBy] = useState(null);
  const defaultSortKey = "comment";
  const defaultSortText = "Comments";

  const handleSortTrendingClick = (sortKey) => {
    setSortTrendingBy(sortKey);
  };

  const refreshTrending = useCallback(async () => {
    // Checks if trending posts already exist, if it true it won't fetch them anymore
    if (!!trendingPosts) return;
    // Fetching trending posts
    const trendingToSet = getAllTrendingPosts();

    setTrendingPosts(trendingToSet);
  }, []);

  useEffect(() => {
    refreshTrending();
  }, [refreshTrending]);

  return (
    <section aria-labelledby="trending" className="hidden lg:block">
      <WhiteShadowCard>
        <div className="flex items-center">
          <h2 className="text-base font-medium text-gray-900">Trending</h2>
          {/* Sorting Menu */}
          <div className="flex ml-auto">
            <Menu as="div" className="relative text-left font-light">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-light text-gray-700 hover:bg-gray-50">
                  Sorted By {sortTrendingBy ? sortTrendingBy.text : defaultSortText}
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5 icon-stroke-width-1"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    {sortByMenu.map((item, index) => (
                      <Menu.Item key={`trendingSortMenu-${index}`}>
                        {({ active }) => (
                          <p
                            className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} ${
                              sortTrendingBy && item.keyInAPI === sortTrendingBy.keyInAPI
                                ? "text-blue-500"
                                : ""
                            } block px-4 py-2 text-sm font-light space-x-3 cursor-pointer`}
                            onClick={() => handleSortTrendingClick(item)}
                          >
                            {item.icon}
                            <span>{item.text}</span>
                          </p>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="mt-6 flow-root">
          <ul className="divide-y divide-gray-200">
            {!!trendingPosts &&
            !!trendingPosts[sortTrendingBy ? sortTrendingBy.keyInAPI : defaultSortKey] ? (
              trendingPosts[sortTrendingBy ? sortTrendingBy.keyInAPI : defaultSortKey].map(
                (post) => (
                  <PostSummary
                    key={`trending-${post.id}`}
                    keyInAPI={sortTrendingBy ? sortTrendingBy.keyInAPI : defaultSortKey}
                    user={post.user}
                    lastUpdateDate={post.updated_at}
                    channel={post.channel}
                    postTitle={post.title}
                    postSlug={post.slug}
                    postId={post.id}
                    postBody={post.body}
                    viewCount={post.visit_count}
                    likeCount={post.like_count}
                    commentCount={post.comment_count}
                  />
                )
              )
            ) : (
              <span className="text-sm">Nothing to display</span>
            )}
          </ul>
        </div>
        <WhiteButton className="mt-6 w-full font-light" href="/forum/trending">
          View all
        </WhiteButton>
      </WhiteShadowCard>
    </section>
  );
};

export default Trending;
