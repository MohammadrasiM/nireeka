import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "@heroicons/react/outline";
import Link from "next/link";

/**
 * Import this component when you need to paginate something
 * It needs a prop named pagination. The value of the prop is the object
 *  returned from `paginate()` function inside functions.
 * In the case that you need hrefs to paginate, simply pass another prop named links;
 *  this is an array which each element is the value passed to href attribute of NextJS <Link /> component
 *  See: https://nextjs.org/docs/api-reference/next/link
 *       https://nextjs.org/docs/api-reference/next/link#with-url-object
 *  and the value of that is corresponding to the same index in `props.pagination.indexes`;
 *  For example:
 *    props.links === [{pathname:"/forum/1"}, {pathname:"/forum/2"}, {pathname: "#"}, {pathname: "/forum/17"}];
 *    props.pagination.indexes === [1, 2, -1, 17]
 *  If you pass noHref prop, the links are disabled.
 * You can also pass a callback function on onPageIndexCick prop.
 *  If this is function is passed, It will be executed on every click with the pageIndex as the first argument
 */

const OrdersPagination = (props) => {
  const pageIndexes = props.pagination.indexes;
  const inactiveStyle =
    "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t pt-4 px-4 inline-flex items-center text-sm font-light";
  const activeStyle = "border-blue-500 text-blue-600 border-t pt-4 px-4 inline-flex items-center text-sm font-light";

  const currentIndexInArray = pageIndexes.indexOf(props.pagination.currentPage);

  const prevPageIndexInArray = props.pagination.currentPage !== pageIndexes[0] ? currentIndexInArray - 1 : null;
  const nextPageIndexInArray =
    props.pagination.currentPage !== pageIndexes[pageIndexes.length - 1] ? currentIndexInArray + 1 : null;

  return (
    <nav className="flex items-center justify-between px-4 border-t border-gray-200 sm:px-0">
      <div className="flex flex-1 w-0 -mt-px">
        {!!(prevPageIndexInArray !== null) && (
          <Link shallow href={props.noHref ? "" : props.links[prevPageIndexInArray]} passHref>
            <a
              className="inline-flex items-center pt-4 pr-1 text-sm font-light text-gray-500 border-t border-transparent hover:text-gray-700 hover:border-gray-300"
              onClick={(e) => {
                if (props.noHref) e.preventDefault();
                if (props.onPageIndexClick) props.onPageIndexClick(pageIndexes[prevPageIndexInArray]);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <ArrowNarrowLeftIcon className="w-5 h-5 mr-3 text-gray-400 icon-stroke-width-1" aria-hidden="true" />
              Previous
            </a>
          </Link>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pageIndexes.map((pageIndex, indexInArray) => {
          return (
            <Link
              shallow
              key={`paginaiton-${indexInArray}`}
              href={!props.noHref ? props.links[indexInArray] : ""}
              passHref
            >
              <a
                className={pageIndex === props.pagination.currentPage ? activeStyle : inactiveStyle}
                onClick={(e) => {
                  if (props.noHref) e.preventDefault();
                  if (typeof props.onPageIndexClick === "function") props.onPageIndexClick(pageIndex);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {pageIndex === -1 ? "..." : pageIndex}
              </a>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-end flex-1 w-0 -mt-px">
        {!!(nextPageIndexInArray !== null) && (
          <Link shallow href={props.noHref ? "" : props.links[nextPageIndexInArray]} passHref>
            <a
              className="inline-flex items-center pt-4 pl-1 text-sm font-light text-gray-500 border-t border-transparent hover:text-gray-700 hover:border-gray-300"
              onClick={(e) => {
                if (props.noHref) e.preventDefault();
                if (props.onPageIndexClick) props.onPageIndexClick(pageIndexes[nextPageIndexInArray]);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next
              <ArrowNarrowRightIcon className="w-5 h-5 ml-3 text-gray-400 icon-stroke-width-1" aria-hidden="true" />
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default OrdersPagination;
