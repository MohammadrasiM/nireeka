import WhiteShadowCard from "../Atoms/cards/WhiteShadowCard"
import FollowListItem from "../Forum/UI/FollowListItem";

const whoToFollow = [
  {
    full_name: "Leonard Krasner",
    username: "leonardkrasner",
    href: "#",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    full_name: "Leonard Krasner",
    username: "leonardkrasner",
    href: "#",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    full_name: "Leonard Krasner",
    username: "leonardkrasner",
    href: "#",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const WhoToFollow = () => {
  return (
    <section aria-labelledby="who-to-follow">
      <WhiteShadowCard>
        <h2 className="text-base font-medium text-gray-900">Who to follow</h2>
        <div className="mt-6 flow-root">
          <ul role="list" className="-my-4 divide-y divide-gray-200">
            {whoToFollow.map((user, index) => (
              <FollowListItem key={`usertofollow-${index}`} user={user} />
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <a
            href="#"
            className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-light rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View all
          </a>
        </div>
      </WhiteShadowCard>
    </section>
  );
};

export default WhoToFollow;
