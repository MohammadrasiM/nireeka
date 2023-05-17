import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { searchPending } from "../../app/store/helpCenterSlice";
import LoadingNireeka from "../Atoms/LoadingNireeka";

const SearchHelpCenter = () => {
  const router = useRouter();

  const state = useSelector((state) => state);
  let { searchData, resultSuccess } = state.helpCenter;
  const dispatch = useDispatch();

  const [backDrop, setBackDrop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChangeForm = (inputValue) => {
    const data = { inputValue };
    dispatch(searchPending(data));
    setBackDrop(true);
  };
  const handleSubmitForm = (inputValue) => {
    const data = { inputValue };
    dispatch(searchPending(data));
    router.push(`/help-center/search?q=${inputValue.search}`);

    setBackDrop(false);
  };

  // const handleKeyDown = (evt) => {
  //   if (evt.key === "Enter") {
  //     evt.preventDefault();
  //     dispatch(searchPending(data));
  //   }
  //   setBackDrop(true);
  // };

  return (
    <div>
      {backDrop ? (
        <div
          className="fixed bg-black w-200VW h-200VH opacity-30"
          style={{ transform: "translate(-50%, -32%)" }}
          onClick={() => setBackDrop(false)}
        ></div>
      ) : null}
      <div>
        <form
          className="relative flex search-form"
          onChange={handleSubmit(handleChangeForm)}
          onSubmit={handleSubmit(handleSubmitForm)}
          autoComplete="off"
        >
          <input
            type="text"
            className="relative py-2 pl-10 pr-8 font-light rounded w-w-90 lg:w-1100"
            placeholder="Find anything (eg. returns)"
            name="search"
            id="search"
            required
            {...register(`search`, {
              required: {
                value: true,
                minLength: {
                  value: 8,
                  message: `comment is not valid.`,
                },
              },
            })}
            // onKeyDown={handleKeyDown}

            // onChange={(e)=>setInputValue(e.target.value)}
          />
          <button className="absolute flex items-center justify-center px-2 top-2">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
          {backDrop ? (
            <div
              className="absolute z-50 py-2 bg-white rounded-md shadow-sm w-w-90 lg:w-1100 top-12"
              id="search-result"
            >
              <div className="flex justify-between border-b border-gray-300 ">
                <h3 className="px-4 py-2 mb-2 text-xl font-light text-gray-500">
                  Top product suggestions
                </h3>
                <button
                  className="px-5 text-xs font-light text-red-500 absoloute"
                  onClick={() => setBackDrop(false)}
                >
                  close
                </button>
              </div>
              <div>
                {!searchData || search.length < 3 ? (
                  <ul className="px-4 py-2 mx-auto results">
                    <li className="result-item p-2.5 text-lg font-light text-gray-700 result-item__hover">
                      <LoadingNireeka className="w-5 h-5 border-gray-600" />
                    </li>
                  </ul>
                ) : (
                  // <div className="flex justify-between border-gray-300 ">
                  <ul className="px-4 py-2 results">
                    {searchData.map((item) => {
                      let strUrl = item.slug;
                      strUrl = strUrl.replace(/\s+/g, "-").toLowerCase();
                      strUrl = strUrl.replace(/\//g, "").toLowerCase();
                      strUrl = strUrl.replace(/["']/g, "").toLowerCase();
                      return (
                        <li
                          key={item.id}
                          className="result-item p-2.5 text-sm font-light text-gray-700 hover:bg-gray-200 w-full cursor-pointer"
                        >
                          <Link href={`/help-center/topic/${strUrl}`} passHref>
                            <a className="cursor-pointer hover:text-customColorNIR">
                              {item.title}
                              <span className="text-sm text-gray-400 cursor-pointer">
                                {` `} - {item.category}
                              </span>
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  // </div>
                )}
                {/* {!searchData[] && (
                  <ul className="px-4 py-2 text-center results ">
                    <li className="result-item p-2.5 text-sm font-light text-gray-700 result-item__hover">
                   note found
                    </li>
                  </ul>
                )} */}
                {!searchData ||
                  search.length > 3 ||
                  (searchData.length === 0 && (
                    <ul className="px-4 py-2 results ">
                      <li className="result-item p-2.5 text-md font-light text-gray-700 hover:bg-gray-200 w-full cursor-pointer">
                        Note Found
                      </li>
                    </ul>
                  ))}
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default SearchHelpCenter;
