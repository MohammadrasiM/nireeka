import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Thumbnail from "../thumbnail/Thumbnail";
import { SanitizeHTML } from "../../SafeHtml/WithoutTag";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addToCart, setModalCart } from "app/store/cartSlice";
import { addToCartPending, getCartPending } from "app/store/cartServer";
import { toast } from "react-toastify";
import { commafy } from "functions/numbers";
import { useEffect } from "react";
import Image from "next/image";

export default function ProductInfoModal(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const stylesProps = {
    tabGroupClass: "flex flex-col-reverse",
    wrapperTabListClass:
      "hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none",
    tabListClass: "grid grid-cols-4 gap-6",
    TabCalss:
      "relative flex items-center justify-center h-24 text-sm font-medium text-gray-900 uppercase bg-white rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50",
    wrapperImageClass: "absolute inset-0 overflow-hidden rounded-md",
    imageClass: "object-cover object-center w-full h-full",
    defaultSelectImageClass:
      "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none",
    selectImageClass: "ring-indigo-500",
    thumbnailWrapperClass: "w-full aspect-w-1 aspect-h-1",
    thumbnailImageClass:
      "object-cover object-center w-full h-full sm:rounded-lg ",
  };

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const cartData = useSelector((state) => state.cartServer.cartData);

  // handle shopping Cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(props.product));
  };

  const handleAddToCartServer = (e) => {
    e.preventDefault();

    const items = [{ product_id: props.product.id, count: 1 }];

    dispatch(addToCartPending(items));

    const result =
      cartData &&
      cartData?.items?.find(
        ({ product_id }) => product_id === props.product.id
      );

    if (result) {
      toast.info(
        `An additional ${props.product.title} has been added to the cart`
      );
    } else {
      toast.success(`${props.product.title} added to cart`);
    }
  };

  //checkout
  const handleAddToCheckout = (e) => {
    e.preventDefault();
    dispatch(addToCart(props.product));
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    dispatch(setModalCart({ open: false }));

    router.push("/cart/checkout");
  };
  const handleAddToCheckoutServer = (e) => {
    e.preventDefault();

    const items = [{ product_id: props.product.id, count: 1 }];

    dispatch(addToCartPending(items));

    const result =
      cartData &&
      cartData?.items?.find(
        ({ product_id }) => product_id === props.product.id
      );

    if (result) {
      toast.info(
        `An additional ${props.product.title} has been added to the cart`
      );
      router.push("/cart/checkout");
    } else {
      toast.success(`${props.product.title} added to cart`);
      router.push("/cart/checkout");
    }
  };

  const handleClose = () => {
    props.setOpen(false);
    props.setProductId([""]);
  };
  if (!props.product) return <Fragment />;

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[60] overlayModal"
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="flex w-full text-base text-left transition transform md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl ">
              <div className="relative flex items-center w-full px-4 pb-8 overflow-y-auto bg-white shadow-2xl pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8 ">
                <div className="absolute top-0 right-0 pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="absolute text-gray-400 outline-none top-4 right-4 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="grid items-start w-full grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                  <div className="sm:col-span-4 lg:col-span-5">
                    {/* thumbnail */}
                    {props.product.files?.length === 0 ? (
                      <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
                        <div
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            // height: "100",
                            // maxHeight: "600px",
                            // minHeight: "400px",
                          }}
                          className={`min-h-[280px] max-w-[290px] md:min-h-[300px] max-h-[310px] w-full h-full`}
                        >
                          <Image
                            src={props.product.thumbnail}
                            alt={props.product.title}
                            className="object-cover object-center w-full"
                            layout="fill"
                            objectFit="contain"
                            objectPosition="center"
                            loading="eager"
                          />
                        </div>
                      </div>
                    ) : (
                      <Thumbnail
                        data={props.product.files}
                        stylesProps={stylesProps}
                      />
                    )}
                  </div>

                  <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-2xl font-light text-gray-900 sm:pr-12">
                      {props.product.title}
                    </h2>
                    <div className="mt-4">
                      <h4 className="sr-only">Description</h4>

                      <p className="text-sm text-gray-700 font-1remi">
                        <SanitizeHTML html={props.product.description} />
                      </p>
                    </div>
                    <section
                      aria-labelledby="information-heading"
                      className="mt-3"
                    >
                      <h3 id="information-heading" className="sr-only">
                        Product information
                      </h3>

                      <p className="text-2xl font-light text-gray-900 font-1remi">
                        {`$${commafy(props.product.price)}`}
                      </p>
                    </section>
                    <div className="mt-7  border-t">
                      <h2 className="pt-6">Bike Compatibility</h2>
                      <ul className="pt-3">
                        {props.product.parents.map((item) => (
                          <li
                            className="px-1 text-gray-700 font-light py-0.5"
                            key={item.title}
                          >
                            {`- `}
                            {item.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <section aria-labelledby="options-heading" className="mt-6">
                      <h3 id="options-heading" className="sr-only">
                        Product options
                      </h3>

                      <div>
                        <div className="mt-6">
                          {isUserLoggedIn ? (
                            <button
                              onClick={handleAddToCartServer}
                              type="submit"
                              className="flex items-center justify-center w-full px-8 py-3 text-base font-light text-white bg-indigo-600 border border-transparent rounded-md font-1remi hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <button
                              onClick={handleAddToCart}
                              type="submit"
                              className="flex items-center justify-center w-full px-8 py-3 text-base font-light text-white bg-indigo-600 border border-transparent rounded-md font-1remi hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>

                        <p className="absolute text-center top-4 left-4 sm:static sm:mt-6">
                          {isUserLoggedIn ? (
                            <button
                              onClick={handleAddToCheckoutServer}
                              type="button"
                              className="font-light text-indigo-600 font-1remi hover:text-indigo-500"
                            >
                              Continue to checkout
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={handleAddToCheckout}
                              className="font-light text-indigo-600 font-1remi hover:text-indigo-500"
                            >
                              Continue to checkout
                            </button>
                          )}
                          {/* <button
                            type="button"
                            onClick={() => router.push("/cart/checkout")}
                            className="font-light text-indigo-600 font-1remi hover:text-indigo-500"
                          >
                            Continue to checkout
                          </button> */}
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
