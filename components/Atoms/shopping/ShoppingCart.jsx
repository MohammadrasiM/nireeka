import { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { SanitizeHTML } from "../../SafeHtml/WithoutTag";
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
  setCartItems, setModalCart,
} from "app/store/cartSlice";
import { useRouter } from "next/router";
import { commafy } from "functions/numbers";
import WhiteShadowCard from "../cards/WhiteShadowCard";
import { configuratorKeys } from "app/constants/localStorageKeys";
import LocalCartItem from "./LocalCartItem";
import classNames from "functions/classNames";

export default function ShoppingCart({
  handleModalClose,
  isInsideCheckoutPage,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  // redux
  const cart = useSelector((state) => state.cart);

  console.log(cart)

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart]);
  // get values products
  const valuesProduct = [];
  cart.cartItems.map((product) => {
    valuesProduct.push(product.product);
  });
  const handlePaymentClick = (e) => {
    console.log(valuesProduct)
    e.preventDefault();
    if (typeof handleModalClose !== "undefined") handleModalClose();
    const hasExternalLink = valuesProduct?.find(
      (valueProduct) => valueProduct?.has_external_link
    );
    console.log("hasExternalLink", hasExternalLink);
    if (hasExternalLink) {
      router.push(hasExternalLink?.external_link);
    } else {
      router.push("/cart/checkout");
    }
  };

  const handleStartShoppingClick = (e) => {
    e.preventDefault();
    if (typeof handleModalClose !== "undefined") handleModalClose();
    router.push("/configurator");
  };

  const closeModal = () => {
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    dispatch(setModalCart({ open: false }));
  }

  return (
    <WhiteShadowCard>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[14px] text-gray-900">
          Shopping Cart
        </h2>
        {!isInsideCheckoutPage && (
          <button
            as="div"
            type="button"
            className="text-gray-400 hover:text-gray-500"
            onClick={handleModalClose}
          >
            <span className="sr-only">Close</span>
            <XIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        )}
      </div>

      <section aria-labelledby="cart-heading">
        <h2 id="cart-heading" className="sr-only">
          Items in your shopping cart
        </h2>
        <ul role="list" className="divide-y divide-gray-200">
          {/* Bikes */}
          {/* Spares and accessories */}
          {cart.cartItems &&
            cart.cartItems.map((product) => (
              <LocalCartItem
                key={product.id}
                isInsideCheckoutPage={isInsideCheckoutPage}
                product={product}
              />
            ))}
        </ul>
      </section>

      {cart.cartItems.length > 0 ? (
        <>
          <section aria-labelledby="summary-heading" className="mt-auto">
            <div
              className={classNames(
                !isInsideCheckoutPage && "p-6 sm:p-8 bg-gray-50 sm:rounded-lg"
              )}
            >
              <h2 id="summary-heading" className="sr-only">
                Order summary
              </h2>

              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200">
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600 text-[14px]">Subtotal</dt>
                    <dd className="font-medium text-[14px] text-gray-900 ">
                      ${commafy(cart.cartTotalAmount)}
                    </dd>
                  </div>
                  {/* <div className="flex items-center justify-between py-4">
                      <dt className="text-gray-600">Shipping</dt>
                      <dd className="font-medium text-[14px] text-gray-900">
                        $0
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="text-gray-600">Tax</dt>
                      <dd className="font-medium text-[14px] text-gray-900">
                        $0
                      </dd>
                    </div> */}
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-base font-medium text-[14px] text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-[14px] text-gray-900">
                      ${commafy(cart.cartTotalAmount)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
          {!isInsideCheckoutPage && (
            <div className="flex justify-end mt-8">
              <button
                  onClick={closeModal}
                  className="mr-3 px-4 py-2 text-xs sm:text-sm font-medium text-[14px] text-indigo-600 bg-white border border-indigo-600 rounded-md shadow-sm hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Continue Shopping
              </button>
              <button
                  onClick={handlePaymentClick}
                  className="px-4 py-2 text-xs sm:text-sm font-medium text-[14px] text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Continue to Payment
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <h3 className="my-8 text-xl font-light text-center text-gray-700">
            There is no item in your shopping cart!
          </h3>
          <div className="flex justify-center ">
            <button
              onClick={handleStartShoppingClick}
              className="px-4 py-2 mb-6 text-sm font-medium text-[14px] text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              Start Shopping
            </button>
          </div>
        </>
      )}
    </WhiteShadowCard>
  );
}
