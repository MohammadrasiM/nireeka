import React, { useEffect, useState } from "react";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { resultPending } from "../../app/store/helpCenterSlice";

export default function CenteredPageNumbers({ pagesNumber }) {
  const router = useRouter();
  const pathSearchQ = router.query.q;
  const pathSearchPage = router.query.page;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let { resultData, resultSuccess, searchReqSuccess } = state.helpCenter;

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  let index = [];

  useEffect(() => {
    for (let step = 0; step < pagesNumber; step++) {
      index = [...index, step + 1];
    }

    setPages([...index]);
  }, [pagesNumber]);

  return (
    <nav className="flex items-center justify-between px-6 pb-5 sm:px-0">
      <div className="flex flex-1 w-0">
        <Link
          href={`/help-center/search?q=${pathSearchQ}&page=${
            page > 1 ? page - 1 : page
          }`}
          passHref
        >
          <a
            onClick={() => {
              setPage(page > 1 ? page - 1 : page);

              dispatch(
                resultPending({
                  result: pathSearchQ,
                  id: page > 1 ? page - 1 : page,
                })
              );
            }}
            className="inline-flex items-center pt-4 pr-1 text-sm font-light text-gray-500 border-t-2 border-transparent cursor-pointer hover:text-gray-700 hover:border-gray-300"
          >
            <ArrowNarrowLeftIcon
              className="w-5 h-4 mr-3 font-light text-gray-400 cursor-pointer"
              aria-hidden="true"
            />
            Previous
          </a>
        </Link>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pagesNumber > 3 ? (
          <>
            {pages.map((item) => {
              return (
                <Link
                  href={`/help-center/search?q=${pathSearchQ}&page=${item}`}
                  passHref
                  key={item}
                >
                  <div>
                    <a
                      className={
                        page === item
                          ? "cursor-pointer border-customColorNIR text-customColorNIR border-b-2 pt-4 px-4 inline-flex items-center text-sm font-light"
                          : "cursor-pointer border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 pt-4 px-4 inline-flex items-center text-sm font-light"
                      }
                      onClick={() => {
                        setPage(item);
                        dispatch(
                          resultPending({ result: pathSearchQ, id: item })
                        );
                      }}
                    >
                      {item}
                    </a>
                  </div>
                </Link>
              );
            })}
          </>
        ) : (
          <>
            {pages.map((item) => {
              return (
                <Link
                  href={`/help-center/search?q=${pathSearchQ}&page=${item}`}
                  passHref
                  key={item}
                >
                  <div>
                    <a
                      className={
                        page === item
                          ? "cursor-pointer border-customColorNIR text-customColorNIR border-b-2 pt-4 px-4 inline-flex items-center text-sm font-light"
                          : "cursor-pointer border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 pt-4 px-4 inline-flex items-center text-sm font-light"
                      }
                      onClick={() => {
                        setPage(item);
                        dispatch(
                          resultPending({ result: pathSearchQ, id: item })
                        );
                      }}
                    >
                      {item}
                    </a>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
      <div className="flex justify-end flex-1 w-0 -mt-px">
        <Link
          href={`/help-center/search?q=${pathSearchQ}&page=${
            page < pagesNumber ? page + 1 : page
          }`}
        >
          <a
            onClick={() => {
              setPage(page < pagesNumber ? page + 1 : page);
              dispatch(
                resultPending({
                  result: pathSearchQ,
                  id: page < pagesNumber ? page + 1 : page,
                })
              );
            }}
            className="inline-flex items-center pt-4 pl-1 text-sm font-light text-gray-500 border-t-2 border-transparent cursor-pointer hover:text-gray-700 hover:border-gray-300"
          >
            Next
            <ArrowNarrowRightIcon
              className="w-5 h-4 ml-3 font-light text-gray-400 cursor-pointer"
              aria-hidden="true"
            />
          </a>
        </Link>
      </div>
    </nav>
  );
}
