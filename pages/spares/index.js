import { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, PlusSmIcon } from "@heroicons/react/solid";
import Pagination from "@/components/Atoms/pagination/Pagination";
import { paginate } from "../../functions/paginate";
import classNames from "../../functions/classNames";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getSpareCategories, getSpares } from "app/api/spares";
import { toast } from "react-toastify";
import { getAllBikes } from "app/api/general";
import SearchSpare from "@/components/Atoms/shopping/SearchSpare";
import SpareProductCard from "@/components/spareShop/SpareProductCard";
import ProductInfoModal from "@/components/Atoms/modals/ProductInfoModal";
import SkeletonCardSpare from "@/components/Atoms/skeletonLoading/SkeletonCardSpare";
import { resetSearchResult, resultPending } from "app/store/spareSlice";
import Head from "next/head";
import { concat } from "lodash";
import CustomHead from "@/components/seo/CustomHead";
// import QuickViewModal from "@/components/Atoms/modals/QuickViewModal";

export default function Index({ categoryPart, resFilterBike }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const searchResultData = useSelector((state) => state.spares.resultData);
  const searchQuery = useSelector((state) => state.spares.searchQuery);
  const isSearchResultDataLoading = useSelector(
    (state) => state.spares.isResultLoading
  );

  // Holds selected bike models data to filter
  const [selectedBikeModels, setSelectedBikeModels] = useState(() => {
    if (router.query && Object.keys(router.query).length !== 0) {
      if (Array.isArray(router.query.parents)) return router.query.parents;
      else return [router.query.parents];
    }
    return ["all-models"];
  });

  // Holds selected categories data to filter
  const [selectedCategories, setSelectedCategories] = useState(() => {
    if (router.query && Object.keys(router.query).length !== 0) {
      if (Array.isArray(router.query.spare_categories))
        return router.query.spare_categories;
      else return [router.query.spare_categories];
    }
    return ["all-categories"];
  });

  // Hold page number
  const [currentPage, setCurrentPage] = useState(() => {
    if (router.query && router.query.page) {
      return router.query.page;
    }
    return 1;
  });

  const [currentSearchPage, setCurrentSearchPage] = useState(1);

  // Items that are fetched from server and meant to be rendered in shop
  const [shopProducts, setShopProducts] = useState([]);
  // Pagination object calculated for Pagination component
  const [productPagination, setProductPagination] = useState(null);
  // State to show loading component in shop when the items are being fetched from server
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  // State to handle product info modal visibility
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  // State to set product info modal data
  const [productModalData, setProductModalData] = useState(null);
  // State to set product id for  modal
  const [productId, setProductId] = useState(null);
  // State to set quickViewId id for  modal
  // const [quickViewId, setQuickViewId] = useState("");

  // const [quickViewShow, setQuickViewShow] = useState(false);
  // const [quickViewIdModalData, setQuickViewIdModalData] = useState(null);

  const handlePageIndexClick = (pageIndex) => {
    if (
      searchResultData &&
      searchResultData.pagination &&
      searchResultData.spares
    ) {
      dispatch(resultPending({ q: searchQuery.q, page: pageIndex }));
      setCurrentSearchPage(pageIndex);
    } else setCurrentPage(pageIndex);
  };
  // Gets called whenever the BIKE MODEL filters from sidebar changes
  const handleBikeFilterChange = (e) => {
    const value = e.target.value;
    let updatedSelectedBikeModels = [];

    if (selectedBikeModels.includes("all-models")) {
      // If "all-models" is already selected, remove all other selections
      updatedSelectedBikeModels = [
        value === "all-models" ? "all-models" : value,
      ];
    } else {
      if (value === "all-models") {
        // If "all-models" is being selected, remove all other selections
        updatedSelectedBikeModels = ["all-models"];
      } else {
        // Toggle the clicked value in the array
        if (selectedBikeModels.includes(value)) {
          updatedSelectedBikeModels = selectedBikeModels.filter(
            (model) => model !== value
          );
        } else {
          updatedSelectedBikeModels = [...selectedBikeModels, value];
        }
      }
    }

    // Update the state with the new selected bike models
    setSelectedBikeModels(
      updatedSelectedBikeModels.length != 0
        ? updatedSelectedBikeModels
        : "all-models"
    );
    setCurrentPage(1);
    setProductId([""]);
  };

  // Gets called whenever the CATEGORY filters from sidebar changes
  const handleChangeCategory = (e) => {
    const value = e.target.value;
    let updatedSelectedCategories = [];

    if (selectedCategories.includes("all-categories")) {
      // If "all-categories" is already selected, remove all other selections
      updatedSelectedCategories = [
        value === "all-categories" ? "all-categories" : value,
      ];
    } else {
      if (value === "all-categories") {
        // If "all-categories" is being selected, remove all other selections
        updatedSelectedCategories = ["all-categories"];
      } else {
        // Toggle the clicked value in the array
        if (selectedCategories.includes(value)) {
          updatedSelectedCategories = selectedCategories.filter(
            (model) => model !== value
          );
        } else {
          updatedSelectedCategories = [...selectedCategories, value];
        }
      }
    }

    // Update the state with the new selected bike models
    setSelectedCategories(
      updatedSelectedCategories.length != 0
        ? updatedSelectedCategories
        : "all-categories"
    );
    setCurrentPage(1);
    setProductId("");
  };

  // Fetches shopping items from server
  const fetchAndSetFilteredItems = async (
    selectedBikeModels,
    selectedCategories
  ) => {
    setIsProductsLoading(true);

    const parentsParam =
      selectedBikeModels == "all-models"
        ? resFilterBike.data.map((bike) => bike.id)
        : selectedBikeModels;
    const categoriesParam =
      selectedCategories == "all-categories"
        ? categoryPart.data.map((bike) => bike.id)
        : selectedCategories;
    const sparesRes = await getSpares({
      parents: parentsParam,
      spare_categories: categoriesParam,
      page: currentPage,
    });

    if (sparesRes instanceof Error) {
      setShopProducts([]);
      setIsProductsLoading(false);
      return;
    }

    // Pagination logic
    const pageCount = Math.ceil(
      sparesRes.data.pagination.total / sparesRes.data.pagination.page_size
    );
    const pagination = paginate(sparesRes.data.pagination.current, pageCount);

    setShopProducts(sparesRes.data.list);
    setProductPagination(pagination);
    setIsProductsLoading(false);
    setProductId("");
  };

  const clearBikeFilters = () => {
    setSelectedBikeModels(["all-models"]);
    setCurrentPage(1);
    setProductId("");
  };
  const clearCategoryFilters = () => {
    setSelectedCategories(["all-categories"]);
    setCurrentPage(1);
    setProductId("");
  };
  const clearAllFilters = () => {
    setSelectedBikeModels(["all-models"]);
    setSelectedCategories(["all-categories"]);
    setCurrentPage(1);
    setProductId("");
  };
  // Effect on filter state change
  useEffect(() => {
    dispatch(resetSearchResult());
    setProductId("");

    router.push(
      {
        pathname: "/spares",
        query: {
          parents: selectedBikeModels,
          spare_categories: selectedCategories,
          page: currentPage,
          id: productId,
          // QuickView: quickViewId,
        },
      },
      undefined,
      {
        shallow: true,
        scroll: true,
      }
    );

    fetchAndSetFilteredItems(
      selectedBikeModels,
      selectedCategories,
      currentPage
    );
  }, [selectedBikeModels, selectedCategories, currentPage]); // Don't add router in dependency array or you'll get infinite loop!

  useEffect(() => {
    // if (productId) {
    // console.log(router);

    router.push(
      {
        pathname: "/spares",
        query: {
          parents: selectedBikeModels,
          spare_categories: selectedCategories,
          page: currentPage,
          id: productId ? productId : router.query.id,
          // QuickView: quickViewId ? quickViewId : router.query.QuickView,
        },
      },
      undefined,
      {
        shallow: true,
        scroll: true,
      }
    );
    // }
  }, [productId]);

  // Search result pagination
  useEffect(() => {
    if (!!searchResultData && searchResultData.pagination) {
      const pageCount = Math.ceil(
        searchResultData.pagination.total /
          searchResultData.pagination.page_size
      );
      const pagination = paginate(
        searchResultData.pagination.current,
        pageCount
      );
      setProductPagination(pagination);
    }
  }, [searchResultData, currentSearchPage]);

  // console.log(productModalData.id);
  const bikeModels = useMemo(
    () =>
      concat([{ title: "All Models", id: "all-models" }], resFilterBike.data),
    [resFilterBike]
  );
  const categoriesBike = useMemo(
    () =>
      concat(
        [{ title: "All Categories", id: "all-categories" }],
        categoryPart.data
      ),
    [categoryPart]
  );
  // let keywords=Object.values?.(categoryPart.data)

  console.log(Object.values(resFilterBike.data).map((bike) => bike.title));

  return (
    <>
      <CustomHead
        selfTitle
        name="Spare Parts"
        description="Checkout out all the Nireeka spare parts in case you need to upgrade your bike after receiving it or if you need a replacement."
        keywords={[
          Object.values(resFilterBike.data).map((bike) => bike.title),
          Object.values(categoryPart.data).map((bike) => bike.title),
        ]}
        available
      />
      <div className="mt-1 bg-white">
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-40 flex lg:hidden"
                onClose={setMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-light text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XIcon className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4">
                      {/* {filters.map((section) => ( */}
                      <Disclosure
                        as="div"
                        key="bikeModel"
                        className="pt-4 pb-1 border-t border-gray-200"
                      >
                        {({ open }) => (
                          <fieldset>
                            <legend className="w-full px-2">
                              <Disclosure.Button className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500">
                                <span className="font-light text-gray-900 text-1remi">
                                  Bike Model
                                </span>
                                <span className="flex items-center ml-6 h-7">
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "-rotate-180" : "rotate-0",
                                      "h-5 w-5 transform"
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </legend>
                            <Disclosure.Panel className="px-4 pt-2 pb-2">
                              <div className="space-y-6">
                                {/* {selectedBikeModels.length > 0 &&
                                  selectedBikeModels != "all-models" && (
                                    <div className="flex items-center">
                                      <button
                                        className="flex justify-center item-center text-sm font-light text-red-600"
                                        onClick={clearBikeFilters}
                                      >
                                        <XIcon
                                          className="flex-shrink-0 w-3 h-3 mr-1 mt-1 text-red-400"
                                          aria-hidden="true"
                                        />
                                        Remove filter
                                      </button>
                                    </div>
                                  )} */}

                                {bikeModels &&
                                  bikeModels.map((category, optionIdx) => (
                                    <div
                                      key={category.id}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`${category.id}-${optionIdx}`}
                                        name={category.title}
                                        value={category.id}
                                        onChange={handleBikeFilterChange}
                                        type="checkbox"
                                        checked={
                                          selectedBikeModels.indexOf(
                                            category.id.toString()
                                          ) >= 0
                                        }
                                        className="w-4 h-4 font-light text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`${category.id}-${optionIdx}`}
                                        className="ml-3 font-light text-gray-500"
                                      >
                                        {category.title}
                                      </label>
                                    </div>
                                  ))}
                              </div>
                            </Disclosure.Panel>
                          </fieldset>
                        )}
                      </Disclosure>
                      {/* ))} */}
                    </form>
                    <form className="mt-4">
                      {/* {filters.map((section) => ( */}
                      <Disclosure
                        as="div"
                        key="Category"
                        className="pt-4 pb-4 border-t border-gray-200"
                      >
                        {({ open }) => (
                          <fieldset>
                            <legend className="w-full px-2">
                              <Disclosure.Button className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500">
                                <span className="font-light text-gray-900 text-1remi">
                                  Category
                                </span>
                                <span className="flex items-center ml-6 h-7">
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "-rotate-180" : "rotate-0",
                                      "h-5 w-5 transform"
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </legend>
                            <Disclosure.Panel className="px-4 pt-4 pb-2">
                              <div className="space-y-6">
                                {/* {categoriesBike.length > 0 &&
                                  selectedCategories != "all-categories" && (
                                    <div className="flex items-center">
                                      <button
                                        className="flex justify-center item-center text-sm font-light text-red-600"
                                        onClick={clearCategoryFilters}
                                      >
                                        <XIcon
                                          className="flex-shrink-0 w-3 h-3 mr-1 mt-1 text-red-400"
                                          aria-hidden="true"
                                        />
                                        Remove filter
                                      </button>
                                    </div>
                                  )} */}

                                {categoriesBike &&
                                  categoriesBike.map((category, optionIdx) => (
                                    <div
                                      key={category.id}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`${category.id}-${optionIdx}`}
                                        name={category.title}
                                        value={category.id}
                                        onChange={handleChangeCategory}
                                        checked={
                                          selectedCategories?.indexOf(
                                            category.id.toString()
                                          ) >= 0
                                        }
                                        type="checkbox"
                                        className="w-4 h-4 font-light text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`${category.id}-${optionIdx}`}
                                        className="ml-3 font-light text-gray-500"
                                      >
                                        {category.title}
                                      </label>
                                    </div>
                                  ))}
                              </div>
                            </Disclosure.Panel>
                          </fieldset>
                        )}
                      </Disclosure>
                      {/* ))} */}
                    </form>
                  </div>
                </Transition.Child>
              </Dialog>
            </Transition.Root>

            <main className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="pb-10 border-b border-gray-200">
                <h1 className="text-4xl font-light tracking-tight text-gray-900">
                  Nireeka Spare Parts
                </h1>
                <p className="mt-4 text-sm font-light text-gray-500 ">
                  Checkout out all the Nireeka spare parts in case you need to
                  upgrade your bike after receiving it or if you need a
                  replacement.
                </p>
                <div>
                  <SearchSpare />
                </div>
              </div>

              <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                <aside>
                  <h2 className="sr-only">Filters</h2>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center lg:hidden"
                      onClick={() => setMobileFiltersOpen(true)}
                    >
                      <span className="text-sm font-light text-gray-700">
                        Filters
                      </span>
                      <PlusSmIcon
                        className="flex-shrink-0 w-5 h-5 ml-1 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                    {(selectedBikeModels.length > 0 &&
                      selectedBikeModels != "all-models") ||
                    (selectedCategories.length > 0 &&
                      selectedCategories != "all-categories") ? (
                      <div className="flex items-center md:pb-[18px]">
                        <button
                          className="flex justify-center item-center text-sm font-light text-red-600"
                          onClick={clearAllFilters}
                        >
                          <XIcon
                            className="flex-shrink-0 w-3 h-3 mr-1 mt-1 text-red-400"
                            aria-hidden="true"
                          />
                          Remove filters
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <div className="hidden lg:block ">
                    <form
                      className="space-y-10 divide-y divide-gray-200"
                      // onChange={handleChangeForm}
                    >
                      {/* {filters.map((section, sectionIdx) => ( */}
                      <div
                        key="bikeModel"
                        // className={sectionIdx === 0 ? null : "pt-10"}
                      >
                        <fieldset>
                          <legend className="block font-light text-gray-900 text-1remi">
                            Bike Model
                          </legend>
                          <div className="pt-6 space-y-3">
                            {/* {selectedBikeModels.length > 0 &&
                              selectedBikeModels != "all-models" && (
                                <div className="flex items-center">
                                  <button
                                    className="flex justify-center item-center text-sm font-light text-red-600"
                                    onClick={clearBikeFilters}
                                  >
                                    <XIcon
                                      className="flex-shrink-0 w-3 h-3 mr-1 mt-1 text-red-400"
                                      aria-hidden="true"
                                    />
                                    Remove filter
                                  </button>
                                </div>
                              )} */}

                            {/* desktop */}
                            {bikeModels &&
                              bikeModels.map((bike, optionIdx) => (
                                <div
                                  key={bike.id}
                                  className="flex items-center font-light"
                                >
                                  <input
                                    id={`${bike.id}-${optionIdx}`}
                                    name={bike.title}
                                    value={bike.id}
                                    onChange={handleBikeFilterChange}
                                    type="checkbox"
                                    checked={
                                      selectedBikeModels.indexOf(
                                        bike.id.toString()
                                      ) >= 0
                                    }
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`${bike.id}-${optionIdx}`}
                                    className="ml-3 text-sm font-light text-gray-600 cursor-pointer"
                                  >
                                    {bike.title}
                                  </label>
                                </div>
                              ))}
                          </div>
                        </fieldset>
                      </div>
                      {/* ))} */}

                      <div className="mt-10 space-y-10 divide-y divide-gray-200">
                        {/* {filters.map((section, sectionIdx) => ( */}
                        <div
                          key="category"
                          // className={sectionIdx === 0 ? null : "pt-10"}
                        >
                          <fieldset>
                            <legend className="block pt-5 font-light text-gray-900 text-1remi">
                              Category{" "}
                            </legend>
                            <div className="pt-6 space-y-3">
                              {/* {selectedCategories.length > 0 &&
                                selectedCategories != "all-categories" && (
                                  <div className="flex items-center">
                                    <button
                                      className="flex justify-center item-center text-sm font-light text-red-600"
                                      onClick={clearCategoryFilters}
                                    >
                                      <XIcon
                                        className="flex-shrink-0 w-3 h-3 mr-1 mt-1 text-red-400"
                                        aria-hidden="true"
                                      />
                                      Remove filter
                                    </button>
                                  </div>
                                )} */}

                              {categoriesBike &&
                                categoriesBike.map((category, optionIdx) => (
                                  <div
                                    key={category.id}
                                    className="flex items-center font-light"
                                  >
                                    <input
                                      id={`${category.id}-${optionIdx}`}
                                      name={`${category.id}[]`}
                                      value={category.id}
                                      onChange={handleChangeCategory}
                                      checked={
                                        selectedCategories?.indexOf(
                                          category.id.toString()
                                        ) >= 0
                                      }
                                      type="checkbox"
                                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`${category.id}-${optionIdx}`}
                                      className="ml-3 text-sm font-light text-gray-600 cursor-pointer"
                                    >
                                      {category.title}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          </fieldset>
                        </div>
                        {/* ))} */}
                      </div>
                    </form>
                  </div>
                </aside>

                {/* Product grid */}
                <div className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
                  {!isProductsLoading && !isSearchResultDataLoading ? (
                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                      {!!searchResultData?.spares &&
                      !!searchResultData?.spares.length > 0 ? (
                        // Search result
                        searchResultData.spares.map((product) => (
                          <SpareProductCard
                            key={product.id}
                            product={product}
                            setIsProductModalVisible={setIsProductModalVisible}
                            setProductModalData={setProductModalData}
                            setProductId={setProductId}
                            productId={productId}
                            // setQuickViewId={setQuickViewId}
                            // setQuickViewIdModalData={setQuickViewIdModalData}
                            // setQuickViewShow={setQuickViewShow}
                          />
                        ))
                      ) : !searchResultData?.spares &&
                        shopProducts.length > 0 ? (
                        // Filter result
                        shopProducts.map((product) => (
                          <SpareProductCard
                            key={product.id}
                            product={product}
                            setIsProductModalVisible={setIsProductModalVisible}
                            setProductModalData={setProductModalData}
                            productId={productId}
                            setProductId={setProductId}
                            // setQuickViewId={setQuickViewId}
                            // setQuickViewIdModalData={setQuickViewIdModalData}
                            // setQuickViewShow={setQuickViewShow}
                          />
                        ))
                      ) : (
                        <p className="font-light">No products found...</p>
                      )}
                    </div>
                  ) : (
                    <SkeletonCardSpare />
                  )}

                  {/* modalSpare */}
                  <ProductInfoModal
                    open={isProductModalVisible}
                    setOpen={setIsProductModalVisible}
                    product={productModalData}
                    setProductId={setProductId}
                  />

                  {/* modal quickView */}

                  {/* <QuickViewModal
                    open={quickViewShow}
                    setOpen={setQuickViewShow}
                    product={quickViewIdModalData}
                    setQuickViewId={setQuickViewId}
                  /> */}
                  {/* pagination */}
                  {!!productPagination && (
                    <div className="mt-8">
                      <Pagination
                        pagination={productPagination}
                        onPageIndexClick={handlePageIndexClick}
                        noHref
                      />
                    </div>
                  )}
                  {/* pagination */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const responses = await Promise.all([getSpareCategories(), getAllBikes()]);

  const categoryPart = responses[0];
  const bikes = responses[1];

  return {
    props: { categoryPart, resFilterBike: bikes },
  };
}
