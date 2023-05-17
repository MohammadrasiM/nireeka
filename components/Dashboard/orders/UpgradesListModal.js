import PrimaryButton from "@/components/Atoms/buttons/PrimaryButton";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import { CONFIGURATOR_EDIT_ORDER_MODE } from "app/constants/configuratorModes";
import { useRouter } from "next/router";

const UpgradesListModal = (props) => {
  const router = useRouter();

  const handleGetNewUpgradesClick = () => {
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    router.push({
      pathname: `/configurator/${props.bikeSlug}`,
      query: { orderBikeID: props.orderBikeId, mode: CONFIGURATOR_EDIT_ORDER_MODE },
    });
  };
  return (
    <WhiteShadowCard className="space-y-4">
      <span className="text-2xl">Upgrades</span>
      <div className="flex flex-col">
        {props.upgrades.map(
          (upgrade) =>
            upgrade.order_bike_id === props.orderBikeId && (
              <div key={upgrade.id} className="flex border-b last:border-none py-3">
                <span className="flex-1">{upgrade.category}</span>
                <span className="flex-1 text-sm font-light">{upgrade.title}</span>
                <span className="flex-1 text-sm font-light text-right">${upgrade.price}</span>
              </div>
            )
        )}
      </div>
      {props.isUpgradable && (
        <div>
          <PrimaryButton className="ml-auto" onClick={handleGetNewUpgradesClick}>
            Get New Upgrades
          </PrimaryButton>
        </div>
      )}
    </WhiteShadowCard>
  );
};

export default UpgradesListModal;
