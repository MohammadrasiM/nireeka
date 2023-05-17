import { CONFIGURATOR_EDIT_UPGRADE_MODE } from "app/constants/configuratorModes";
import { configuratorKeys } from "app/constants/localStorageKeys";
import Image from "next/image";
import { useRouter } from "next/router";

const CheckoutUpgradeListItem = (props) => {
  const router = useRouter();
  const handleEditClick = () => {
    sessionStorage.setItem(configuratorKeys.UPGRADES_IN_CART, JSON.stringify(props.item.upgrades));
    router.push({
      pathname: `/configurator/${props.item.bike_slug}`,
      query: { orderBikeID: props.item.order_bike_id, mode: CONFIGURATOR_EDIT_UPGRADE_MODE },
    });
  };

  return (
    <div className="relative flex items-center px-6 py-5 mx-1 my-2 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
      <div className="flex-shrink-0">
        <Image
          width={80}
          height={64}
          className="rounded-lg"
          src={props.item.image}
          alt={props.item.title}
          objectFit="contain"
        />
      </div>
      <div className="flex-1 min-w-0 mr-2">
        <p className="text-sm text-gray-900">{props.item.title}</p>
        {props.item.upgrades && (
          <div>
            {props.item.upgrades?.map((upgrade) => (
              <div className="flex space-x-2 justify-between" key={upgrade.title}>
                <span className="py-1 text-sm font-light text-gray-700">{upgrade.title}</span>
                <span className="py-1 text-sm font-light text-gray-700">${upgrade.price}</span>
              </div>
            ))}

            <span
              className="text-blue-600 text-sm cursor-pointer hover:underline transition-all"
              onClick={handleEditClick}
            >
              Edit
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutUpgradeListItem;
