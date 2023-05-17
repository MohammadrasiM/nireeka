import {
  CONFIGURATOR_EDIT_CART_MODE,
  CONFIGURATOR_EDIT_UPGRADE_MODE,
} from "app/constants/configuratorModes";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeCartItemPending } from "app/store/cartServer";
import { getCheckoutPending } from "app/store/checkoutSlice";
import { commafy } from "functions/numbers";
import {removeFromCart} from "app/store/cartSlice";

export default function CheckoutCartItem(props) {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const delItemCartReqSuccess = useSelector((state) => state.cartServer.delItemCartReqSuccess);

  const handleRemoveFromCart = (product) => {
    if(isUserLoggedIn) dispatch(removeCartItemPending(product.id));
    else dispatch(removeFromCart(product));
    dispatch(getCheckoutPending());
    if (delItemCartReqSuccess) {
      toast.info(`${product.title || "The item"} was removed from the cart`);
    }
  };

  return (
    <div className="relative flex flex-col space-y-3 px-6 py-5 my-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400">
      <div className="relative grow w-full h-32">
        {!!(props.item?.image || props.item?.thumbnail) && (
          <Image
            layout="fill"
            className="rounded-lg"
            src={props.item.image || props.item?.thumbnail}
            alt={props.item?.title}
            objectFit="contain"
          />
        )}
      </div>
      <div className="flex space-x-2 items-center">
        {/* <button
          className="transition duration-300 ease-in-out hover:scale-110 hover:text-red-600"
          onClick={() => handleRemoveFromCart(props.item)}
        >
          <XIcon className="w-5 h-5 text-red-400" />
        </button> */}

        <div className="flex-grow min-w-0 mr-2">
          {!!props.item?.title && <p className="text-sm text-gray-900">{props.item.title}</p>}
          {props.item.options && (
            <div>
              {props.item.options.color && (
                <p className="py-1 text-sm font-light text-gray-500 truncate">
                  Color: {props.item.options.color}
                </p>
              )}
              {props.item.options.size && (
                <p className="py-1 text-sm font-light text-gray-500 truncate">
                  Size: {props.item.options.size}
                </p>
              )}

              {props.item.options?.upgrades?.map((upgrade) => (
                <div className="flex space-x-2" key={upgrade?.title}>
                  <span className="py-1 text-xs font-light text-gray-500 truncate">
                    {upgrade?.title}
                  </span>
                  {/* <span className="py-1 text-xs font-light text-gray-500">${upgrade.price}</span> */}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between space-x-2">
          <p className="font-light text-gray-600 text-md mx-0.5">x{props.item.count || props.item?.cartQuantity}</p>
          <p className="font-light text-gray-400 text-md mx-0.5">
            ${commafy(props.item.total_price || +props.item.price * +props.item.cartQuantity)}
          </p>
        </div>
      </div>
      <div className={`flex space-x-2 items-center ${!props.item.bike_slug && "justify-end"}`}>
        {props.item.bike_slug && (
          <Link
            href={{
              pathname: `/configurator/${props.item.bike_slug}`,
              query: {
                orderBikeID: props.item.title === null ? props.item.order_bike_id : null,
                cartID: props.item.id,
                mode:
                  props.item.title === null
                    ? CONFIGURATOR_EDIT_UPGRADE_MODE
                    : CONFIGURATOR_EDIT_CART_MODE,
              },
            }}
          >
            <a className="flex-grow min-w-0 mr-2">
              <span className="text-blue-600 text-sm">Edit</span>
            </a>
          </Link>
        )}
        <button
          className="flex justify-between text-sm space-x-2 pr-2 text-gray-400 hover:text-red-400"
          onClick={() => handleRemoveFromCart(props.item)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
