import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { searchInForum } from "../../../app/api/forum";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef();

  const handleOutsideClick = () => {
    setInputValue("");
  };

  let parentRef = { current: null };
  if (typeof window !== "undefined") parentRef.current = window.document.body;

  useOutsideClick(containerRef, parentRef, handleOutsideClick);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (!inputValue) return;
    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      const searchResult = await searchInForum(inputValue);
      if (searchResult instanceof Error) {
        setIsLoading(false);
        return;
      }

      if (inputValue !== "") setSearchResult(searchResult.data);
      else setSearchResult([]);

      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <SearchIcon className="h-5 w-5 text-gray-400 icon-stroke-width-1" aria-hidden="true" />
        </div>
        <input
          id="search"
          name="search"
          className={`block w-full bg-white border border-gray-300 py-2 pl-10 pr-3 text-sm font-light placeholder-gray-500 focus:outline-none rounded-md focus:shadow-md ${
            inputValue === ""
              ? "focus:border-gray-300"
              : "focus:border-x-gray-300 focus:border-t-gray-300 rounded-b-none"
          }`}
          placeholder="Search"
          type="search"
          onChange={onInputChange}
          value={inputValue}
          autoComplete="off"
        />
      </div>
      {inputValue !== "" && (
        <WhiteShadowCard
          className={`w-full absolute z-20 shadow-2xl ${
            inputValue !== "" ? "sm:rounded-t-none border border-x-gray-300 border-b-gray-300" : ""
          }`}
        >
          <label htmlFor="search">
            <ul className="divide-y space-y-2">
              {isLoading && (
                <p className="text-gray-900 text-sm font-light space-x-3">
                  <span className="inline-block w-3 h-3 rounded-full border-t border-gray-900 animate-spin"></span>
                  <span>Searching...</span>
                </p>
              )}
              {!isLoading && searchResult.length === 0 && (
                <p className="text-sm text-gray-500">No results</p>
              )}
              {!isLoading &&
                searchResult.map((item, index) => (
                  <li
                    key={`searchresult-${index}-${item.channel.slug}-${item.id}`}
                    className="pt-2 first:pt-0"
                  >
                    <Link
                      href={`/forum/threads/${encodeURIComponent(
                        item.channel.slug
                      )}/${encodeURIComponent(item.id)}`}
                      passHref
                    >
                      <a className="text-gray-900 hover:text-blue-600 text-sm">
                        <p className="font-noraml">
                          {item.title}
                          <span className="text-gray-500"> in </span>
                          {item.channel.name}
                        </p>
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </label>
        </WhiteShadowCard>
      )}
    </div>
  );
};

export default SearchBar;
