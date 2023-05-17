import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  resetSearchResult,
  resultPending,
  searchPending,
} from "../../../app/store/spareSlice";
import LoadingNireeka from "../LoadingNireeka";

const SearchSpare = () => {
  const dispatch = useDispatch();

  const searchData = useSelector((state) => state.spares.searchData);

  const [backDrop, setBackDrop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState({ search: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChangeForm = (inputValue) => {
    const data = { search: inputValue.search };

    dispatch(searchPending(data));
    setBackDrop(true);
    setInputValue({ ...inputValue });
    if (inputValue.search === "") {
      setBackDrop(false);
    }
  };
  const handleSubmitForm = () => {
    const data = inputValue;
    dispatch(resultPending({ q: data.search }));
    setBackDrop(false);
  };
  const handleClickItem = (e,item) => {
    // let item=e.target.innerText
    const data = item.title;
    dispatch(resultPending({ q: data }));
    setBackDrop(false);
  };

  const handleClearSearchClick = () => {
    dispatch(resetSearchResult());
    setInputValue({ search: "" });
    setBackDrop(false);
  };

  return (
    <div>
      {backDrop ? (
        <div
          className="fixed bg-black w-200VW h-200VH opacity-30 z-[8]"
          style={{ transform: "translate(-50%, -32%)" }}
          onClick={() => setBackDrop((pervState) => !pervState)}
        ></div>
      ) : null}
      <div className={`grid justify-start pt-[15px] `}>
        <form
          className={`relative w-full search-form ${backDrop && "z-[20]"}`}
          onChange={handleSubmit(handleChangeForm)}
          onSubmit={handleSubmit(handleSubmitForm)}
          autoComplete="off"
        >
          <input
            type="text"
            className="relative py-2 pl-10 pr-8 font-light border rounded w-full md:w-w-90 lg:w-1100 "
            placeholder="Find anything (eg. Battery)"
            name="search"
            id="search"
            required
            value={inputValue.search}
            {...register(`search`, {
              required: {
                // value: true,
                minLength: {
                  value: 8,
                  message: `comment is not valid.`,
                },
              },
            })}
            // onKeyDown={handleKeyDown}

            // onChange={(e)=>setInputValue(e.target.value)}
          />
          <button className="absolute flex items-center justify-center px-2 top-2 ">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
          <button
            className="px-4 w-4rem md:w-[5rem] ml-2  py-[0.61rem] transition ease-in-out text-sm font-light text-gray-400 bg-transparent border-gray-200  absolute top-[1.5px] right-[1px] border-l-2 hover:text-customColorNIR focus:outline-none focus:ring-sky-500"
            type="button"
            onClick={handleClearSearchClick}
            style={{backgroundColor:"white"}}
          >
            Clear
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
                          onClick={(e)=>handleClickItem(e,item)}
                          className="result-item p-2.5 text-sm font-light text-gray-700 hover:bg-gray-200 w-full cursor-pointer"
                        >
                        
                            <p className="cursor-pointer hover:text-customColorNIR">
                              {item.title}
                              <span className="text-sm text-gray-400 cursor-pointer">
                                {` `} - {item.category}
                              </span>
                            </p>
                         
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
                        Not Found
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

export default SearchSpare;
