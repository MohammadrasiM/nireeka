import { promoCodePost, promoCodeGuestPost } from "app/api/checkout/promoCode";
import { useState } from "react";
import { toast } from "react-toastify";
import { commafy } from "functions/numbers";
import classNames from "functions/classNames";
import LoadingNireeka from "../Atoms/LoadingNireeka";
import { useSelector } from "react-redux";

export default function PromoCodeField(props) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const cartGuestItems = useSelector((state) => state.cart?.cartItems);

  const handleRedeemClick = async () => {
    if (props.passValue.enteredPromoCode === inputValue) {
      toast.info("This code is already applied.");
      return;
    }

    try {
      setIsLoading(true);
      let response;
      if (isUserLoggedIn) response = await promoCodePost({ code: inputValue });
      else {
        const cartItems = cartGuestItems?.map(
          (product) =>
            product?.server || {
              product_id: product?.id,
              count: product?.cartQuantity,
            }
        );
        response = await promoCodeGuestPost({
          code: inputValue,
          items: cartItems,
        });
      }

      if (response.status) {
        props.setPromoCodeRedeemResult(response);
        toast.success(
          "Promo code was applied successfully. Discount: $" +
            commafy(response.discount)
        );

        props.setPassValue((prevValue) => {
          return { ...prevValue, enteredPromoCode: inputValue };
        });
      } else toast.error(response?.message || "This code not available");
    } catch (error) {
      console.log("Error in message field:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Sorry, we couldn't check. Try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="promo-code" className="sr-only">
        Promo Code
      </label>
      <div className="flex border border-gray-300 rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow">
          <input
            placeholder="Promo Code"
            id="promo-code"
            name="promo-code"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="block w-full pl-2 font-light border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
          />
        </div>
        <button
          onClick={() => handleRedeemClick()}
          className={classNames(
            "flex items-center space-x-3",
            "px-4 py-2 text-sm font-light border-l border-transparent shadow-sm cursor-pointer rounded-r-md focus:outline-none",
            "text-white bg-indigo-600 hover:bg-indigo-700",
            "disabled:bg-gray-400",
            isLoading && "cursor-wait"
          )}
          disabled={isLoading || inputValue.trim() === ""}
        >
          <span>REDEEM</span>
          {isLoading && <LoadingNireeka className="w-4 h-4 border-white" />}
        </button>
      </div>
    </div>
  );
}
