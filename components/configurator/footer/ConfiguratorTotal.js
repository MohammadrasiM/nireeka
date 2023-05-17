import {CONFIGURATOR_EDIT_ORDER_MODE, CONFIGURATOR_EDIT_UPGRADE_MODE} from "app/constants/configuratorModes";
import { useSelector } from "react-redux";
import { commafy } from "functions/numbers";
import Counter from "@/components/Atoms/general/Counter";

export default function ConfiguratorTotal() {

  const totalPrice = useSelector((state) => state?.configurator.totalPrice);
  const configuratorMode = useSelector((state) => state?.configurator.mode);

  return (
    <div className="flex flex-col sm:items-end pr-3 flex-grow">
      <span className="flex flex-col sm:items-end">
        {configuratorMode !== CONFIGURATOR_EDIT_ORDER_MODE &&
          configuratorMode !== CONFIGURATOR_EDIT_UPGRADE_MODE && (
            <div className="text-xs md:text-sm font-normal sm:text-right whitespace-nowrap">
                Total:
                <span className="text-xl md:text-3xl mx-1">
                    $<Counter value={totalPrice} normalize={commafy}/>
                </span>
                USD
            </div>
          )}
      </span>
    </div>
  );
}
