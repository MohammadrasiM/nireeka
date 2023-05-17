import { SanitizeHTML } from "@/components/SafeHtml/WithoutTag";
import { addToCart, decreaseCart, removeFromCart } from "app/store/cartSlice";
import classNames from "functions/classNames";
import { commafy } from "functions/numbers";
import Image from "next/image";
import { useDispatch } from "react-redux";

const productStyles = {
  position: "relative",
  overflow: "hidden",

  // "@media (max-width: 900px)": {
  //   height: "6rem",
  //   width: "6rem",
  // },
};

const LocalCartItem = (props) => {
  const dispatch = useDispatch();

  const handleChange = (e, product) => {
    dispatch(setCartItems({ val: +e.target.value, product: product }));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleIncreaseCart = (product) => {
    dispatch(addToCart(product));
  };

  console.log("props.product.", props.product);
  return (
    <li
      className={classNames(
        "flex flex-col py-8 text-sm sm:flex-row sm:items-center",
        props.isInsideCheckoutPage && "flex-col"
      )}
    >
      <div
        style={productStyles}
        className="self-center max-w-[145px]  min-h-[94px] object-contain w-full h-full border border-gray-200 rounded-lg sm:flex-none "
        >
        <Image
          className={classNames(
            "flex-none object-contain h-32",
            !props.isInsideCheckoutPage &&
              "border border-gray-200 rounded-lg w-24 h-24 sm:w-32 sm:h-32"
          )}
          src={props.product.thumbnail}
          alt={props.product.title}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          // loading="eager"
          priority={true}
        />
      </div>
      {/* <img
        src={props.product.thumbnail}
        alt={props.product.title}
        className={classNames(
          "flex-none object-contain h-32",
          !props.isInsideCheckoutPage &&
            "border border-gray-200 rounded-lg w-24 h-24 sm:w-32 sm:h-32"
        )}
      /> */}
      <div
        className={classNames(
          "flex w-full mt-5",
          !props.isInsideCheckoutPage && "ml-4 sm:ml-6"
        )}
      >
        <div className="flex-1">
          <h3 className="font-medium text-sm text-gray-900">
            {/* <a href={props.product.href}>{props.product.name}</a> */}
            {props.product.title}
          </h3>
          {props.product.description && (
            <p className="flex mt-1 text-gray-500">
              <SanitizeHTML
                html={props.product.description?.substring(0, 25)}
              />
            </p>
          )}
          {props?.product.description?.length > 25 ||
            (!props?.product?.description?.length && (
              <span className="px-1 font-light text-gray-500"> {`...`}</span>
            ))}
          {props.product.color && (
            <p className="py-1 text-sm font-light text-gray-500 truncate">
              Color: {props.product.color.title}
            </p>
          )}
          {props.product.size && (
            <p className="py-1 text-sm font-light text-gray-500 truncate">
              Size: {props.product.size.title}
            </p>
          )}
          {props.product.upgrades && (
            <p className="flex flex-col">
              {props.product.upgrades.map((upgrade) => (
                <span key={upgrade.id} className="text-sm font-light">
                  {upgrade.title}
                </span>
              ))}
            </p>
          )}
        </div>
        <div className="flex items-center sm:flex-none sm:block sm:text-center">
          <div className="flex p-1 border rounded-md justify-evenly">
            <button
              type="button"
              onClick={() => handleDecreaseCart(props.product)}
              className="pl-1 pr-1.5 font-normal border-r"
            >
              -
            </button>
            <input
              className="w-10 mx-auto text-center outline-none appearance-none content-auto"
              type="number"
              value={props.product.cartQuantity}
              onChange={(e) => handleChange(e, props.product)}
            />

            <button
              type="button"
              onClick={() => handleIncreaseCart(props.product)}
              className="pl-1.5 pr-1 font-normal  border-l"
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="ml-4 font-medium text-sm text-gray-400 hover:text-red-400 sm:ml-0 sm:mt-2"
            onClick={() => handleRemoveFromCart(props.product)}
          >
            <span>Remove</span>
          </button>
        </div>
        <p
          className={classNames(
            "font-medium text-sm text-gray-900 sm:flex-none sm:w-1/3 sm:text-right",
            !props.isInsideCheckoutPage && "sm:ml-6"
          )}
        >
          {/* ${parseFloat(props.product.price.replace(/\$|,/g, ""))} */}$
          {commafy(props.product.total_price)}
        </p>
      </div>
    </li>
  );
};

export default LocalCartItem;
