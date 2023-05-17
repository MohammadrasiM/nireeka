import Link from "next/link";
import classNames from "functions/classNames";

const Tabs = (props) => {
  return (
    <div>
      <div className="block">
        <nav
          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
          aria-label="Tabs"
        >
          {props?.tabs?.map((tab, tabIdx) => (
            <Link
              key={tab.name}
              href={!props.noHref ? tab.href : ""}
              passHref
              prefetch={false}
            >
              <a
                onClick={(e) => {
                  if (props.noHref) e.preventDefault();
                  if (typeof props.onTabClick === "function")
                    props.onTabClick(tabIdx);
                }}
                className={classNames(
                  tab.current
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700",
                  tabIdx === 0 ? "rounded-l-lg" : "",
                  tabIdx === props.tabs.length - 1 ? "rounded-r-lg" : "",
                  "relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-1 md:px-4 text-xs md:text-sm font-medium text-center hover:bg-gray-50 focus:z-10 flex items-center justify-center"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <span className="block">
                  {tab.name} {tab?.count ? `(${tab?.count})` : undefined}
                </span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    tab.current ? "bg-blue-600" : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )}
                />
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
