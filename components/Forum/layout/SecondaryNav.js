import Link from "next/link";
import { navigation } from "./data";

const SecondaryNav = (props) => {
  return (
    <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
      <div className="pb-8 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            passHref
            aria-current={item.current ? "page" : undefined}
          >
            <a
              className={`${
                item.current
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              } flex items-center px-3 py-2 text-sm rounded-md`}
            >
              <item.icon
                className={`${
                  item.current
                    ? "text-gray-500"
                    : "text-gray-400 group-hover:text-gray-500"
                } flex-shrink-0 -ml-1 mr-3 h-6 w-6 icon-stroke-width-1`}
                aria-hidden="true"
              />
              <span className="truncate font-light">{item.name}</span>
            </a>
          </Link>
        ))}
      </div>
      <div className="pt-10">
        <p
          className="px-3 text-sm font-medium text-gray-500 uppercase tracking-wider"
          id="communities-headline"
        >
          Channels
        </p>
        <div className="mt-3 space-y-2" aria-labelledby="communities-headline">
          {props.channels.map((item) => (
            <Link
              key={`channel-${item.slug}`}
              href={`/forum/channels/${item.slug}/1`}
              passHref
            >
              <a
                className={`flex items-center px-3 py-2 text-sm font-light text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 ${
                  props.currentChannelSlug === item.slug ? "text-blue-600" : ""
                }`}
              >
                <span className="truncate">
                  {item.name} ({item.threads_count})
                </span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SecondaryNav;
