import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { SanitizeHTML } from "../../SafeHtml/WithoutTag";
import { toast } from "react-toastify";
import {
  removeCartItemPending,
  getCartPending,
  updateItemCountPending,
} from "app/store/cartServer";
import { commafy } from "functions/numbers";
import WhiteShadowCard from "../cards/WhiteShadowCard";
import {
  CONFIGURATOR_EDIT_CART_MODE,
  CONFIGURATOR_EDIT_UPGRADE_MODE,
} from "app/constants/configuratorModes";
import LoadingNireeka from "../LoadingNireeka";
import { setModalCart } from "app/store/cartSlice";
import Image from "next/image";

const productStyles = {
  position: "relative",
  overflow: "hidden",

  // "@media (max-width: 900px)": {
  //   height: "6rem",
  //   width: "6rem",
  // },
};
function ShoppingCartServer({ handleModalClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [cartTotal, setCartTotal] = useState(0);

  const cartData = useSelector((state) => state?.cartServer.cartData);
  const isAddToCartLoading = useSelector(
    (state) => state?.cartServer.isAddToCartLoading
  );
  const isGetCartLoading = useSelector(
    (state) => state?.cartServer.isGetCartLoading
  );
  const updateItemCountSuccess = useSelector(
    (state) => state?.cartServer.updateItemCountSuccess
  );
  const removeItemSuccess = useSelector(
    (state) => state?.cartServer.removeItemSuccess
  );

  const cartItems = cartData?.items;

  const handleItemRemoveClick = (product) => {
    dispatch(removeCartItemPending(product.id));

    if (removeItemSuccess) {
      toast.error(`${product.title} was removed from the cart`);
    }
  };

  const handleDecreaseCart = (product) => {
    const newCount = product.count - 1;
    if (newCount > 0) {
      dispatch(updateItemCountPending({ id: product.id, count: newCount }));

      if (updateItemCountSuccess) {
        toast.info(`Decrease ${product.title} cart quantity`);
      }
    }
  };

  const handleIncreaseCart = (product) => {
    const counts = product.count + 1;
    let products = { ...product, count: counts };

    dispatch(updateItemCountPending(products));
    dispatch(getCartPending());

    toast.info(`An additional ${product.title} has been added to the cart`);
  };

  const handleQuantityInputChange = (e, product) => {
    dispatch(
      updateItemCountPending({ id: product.id, count: +e.target.value })
    );
    dispatch(getCartPending());
  };

  const handlePaymentClick = (e) => {
    e.preventDefault();
    handleModalClose();
    // router.push("/cart/checkout");
    console.log(cartItems);
    const hasExternalLink = cartItems?.find(
      ({ has_external_link }) => has_external_link === true
    );
    console.log("hasExternalLink", hasExternalLink);
    if (hasExternalLink) {
      router.push(hasExternalLink.external_link);
    } else {
      router.push("/cart/checkout");
    }
  };

  const handleStartShoppingClick = (e) => {
    e.preventDefault();
    handleModalClose();
    router.push("/configurator");
  };

  const closeModal = () => {
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    dispatch(setModalCart({ open: false }));
  };

  useEffect(() => {
    if (cartItems) {
      let sum = 0;
      for (let item of cartItems) {
        sum += item.total_price;
      }
      setCartTotal(sum);
    }
  }, [cartItems]);

  return (
    <WhiteShadowCard>
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500"
          onClick={handleModalClose}
        >
          <span className="sr-only">Close</span>
          <XIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {/* Cart Items */}
      <section aria-labelledby="cart-heading">
        <h2 id="cart-heading" className="sr-only">
          Items in your shopping cart
        </h2>

        <ul role="list" className="divide-y divide-gray-200">
          {isAddToCartLoading || isGetCartLoading ? (
            <div className="flex justify-center">
              <LoadingNireeka className="w-10 h-10 border-gray-600" />
            </div>
          ) : (
            !!cartItems &&
            cartItems.map((product) => (
              // TODO: Create a separate component for this (sth like ShoppingCartItem)
              <li
                key={product.id}
                className="flex flex-col py-8 text-sm sm:flex-row sm:items-center"
              >
                <div
                  style={productStyles}
                  className="self-center max-w-[145px]  min-h-[94px] object-contain w-full h-full border border-gray-200 rounded-lg sm:flex-none "
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    // loading="eager"
                    priority={true}
                  />
                </div>

                {/* <img
                  src={product.image}
                  alt={product.title}
                  className="self-center object-contain w-24 h-24 border border-gray-200 rounded-lg sm:flex-none sm:w-32 sm:h-32"
                /> */}
                <div className="grid items-start flex-auto grid-cols-1 grid-rows-1 gap-y-3 gap-x-5 sm:ml-6 sm:flex sm:gap-0 sm:items-center">
                  <div className="flex-auto row-end-1 sm:pr-6">
                    <h3 className="font-medium text-gray-900">
                      {/* <a href={product.href}>{product.name}</a> */}
                      {product.title}
                    </h3>
                    <p className="flex-col mt-1 text-gray-500">
                      <SanitizeHTML
                        html={product.description?.substring(0, 25)}
                      />
                      {product.description?.length > 25 && (
                        <span> {`...`}</span>
                      )}
                      {product.options && (
                        <div>
                          {product.options.color && (
                            <p className="py-1 text-sm font-light text-gray-500 truncate">
                              Color: {product.options.color}
                            </p>
                          )}
                          {product.options.size && (
                            <p className="py-1 text-sm font-light text-gray-500 truncate">
                              Size: {product.options.size}
                            </p>
                          )}

                          {product.options?.upgrades?.map((upgrade) => (
                            <div className="flex space-x-2" key={upgrade.title}>
                              <span className="py-1 text-xs font-light text-gray-500 truncate">
                                {upgrade.title}
                              </span>
                              {/* <span className="py-1 text-xs font-light text-gray-500">${upgrade.price}</span> */}
                            </div>
                          ))}
                        </div>
                      )}{" "}
                    </p>
                  </div>
                  <p className="row-span-2 row-end-2 font-medium text-gray-900 sm:ml-6 sm:order-1 sm:flex-none sm:w-1/3 sm:text-right">
                    ${commafy(product.price * product.count)}
                  </p>
                  <div className="flex items-center sm:flex-none sm:block sm:text-center">
                    {product.title !== null && (
                      <div className="flex p-1 border rounded-md justify-evenly">
                        <button
                          type="button"
                          onClick={() => handleDecreaseCart(product)}
                          className="pl-1 pr-1.5 font-normal border-r"
                        >
                          -
                        </button>

                        <input
                          className="w-10 mx-auto text-center outline-none content-auto number-input-no-arrows"
                          type="number"
                          value={product.count}
                          minvalue={1}
                          onChange={(e) =>
                            handleQuantityInputChange(e, product)
                          }
                        />

                        <button
                          type="button"
                          onClick={() => handleIncreaseCart(product)}
                          className="pl-1.5 pr-1 font-normal  border-l"
                        >
                          +
                        </button>
                      </div>
                    )}

                    <div className="inline-flex space-x-3">
                      {!!product.bike_slug && (
                        <button
                          type="button"
                          className="ml-4 font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-2"
                        >
                          <Link
                            href={{
                              pathname: `/configurator/${product.bike_slug}`,
                              query: {
                                orderBikeID:
                                  product.title === null
                                    ? product.order_bike_id
                                    : null,
                                cartID: product.id,
                                mode:
                                  product.title === null
                                    ? CONFIGURATOR_EDIT_UPGRADE_MODE
                                    : CONFIGURATOR_EDIT_CART_MODE,
                              },
                            }}
                            passHref
                          >
                            <a>
                              <span>Edit</span>
                            </a>
                          </Link>
                        </button>
                      )}
                      <button
                        type="button"
                        className="ml-4 font-medium text-gray-400 hover:text-red-400 sm:ml-0 sm:mt-2"
                        onClick={() => handleItemRemoveClick(product)}
                        // onClick={handleDeleteClick}
                      >
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Cart billing list */}
      {!!cartItems && cartItems.length > 0 ? (
        <>
          <section aria-labelledby="summary-heading" className="mt-auto">
            <div className="p-6 bg-gray-50 sm:p-8 sm:rounded-lg">
              <h2 id="summary-heading" className="sr-only">
                Order summary
              </h2>

              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200">
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600 text-sm">Subtotal</dt>
                    <dd className="font-medium text-sm text-gray-900">
                      ${commafy(cartTotal)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600 text-sm">Shipping</dt>
                    <dd className="font-medium text-sm text-gray-900">
                      ${commafy(cartData?.shipping || 0)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600 text-sm">Tax</dt>
                    <dd className="font-medium text-sm text-gray-900">
                      ${commafy(cartData?.tax || 0)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="font-medium text-sm text-gray-900">
                      Order total
                    </dt>
                    <dd className="font-medium text-sm text-gray-900">
                      $
                      {commafy(
                        cartTotal +
                          (cartData?.tax || 0) +
                          (cartData?.shipping || 0)
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
          <div className="flex justify-end mt-8">
            <button
              onClick={closeModal}
              className="mr-3 px-4 py-2 text-xs sm:text-sm font-medium text-[14px] text-indigo-600 bg-white border border-indigo-600 rounded-md shadow-sm hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              Continue Shopping
            </button>
            <button
              onClick={handlePaymentClick}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              Continue to Payment
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="pt-8 pb-1 text-xl font-light text-center text-gray-700">
            There is no item in your shopping cart!
          </h3>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleStartShoppingClick}
              type="button"
              className="px-4 py-2 mb-6 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              Start Shopping
            </button>
          </div>
        </>
      )}
    </WhiteShadowCard>
  );
}

export default ShoppingCartServer;
