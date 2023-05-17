import {
  CONFIGURATOR_EDIT_ORDER_MODE,
  CONFIGURATOR_EDIT_UPGRADE_MODE,
} from "app/constants/configuratorModes";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSelectedMultiplePart } from "../../../app/store/configuratorSlice";
import classNames from "../../../functions/classNames";
import IframeContentModal from "../../Atoms/modals/IframeContentModal";
import BlurBackdrop from "../../Atoms/overlays/BlurBackdrop";
import PartCard from "./PartCard";

const isPartSelected = (selectedParts, part) => {
  if (!selectedParts) return false;

  for (let i = 0; i < selectedParts.length; i++)
    if (part.id === selectedParts[i].id) return true;

  return false;
};

export default function MultiplePartConfigStep(props) {
  const dispatch = useDispatch();

  const [isRight4UModalVisible, setIsRight4UModalVisible] = useState(false);
  const configuratorMode = useSelector((state) => state.configurator.mode);

  const hasDefaultPart = !!props.step.default && !!props.step.default.id;

  const handlePartClick = (part) => {
    dispatch(toggleSelectedMultiplePart(part));
    if (props.doAfterPartSelect) props.doAfterPartSelect();
  };


  return (
    <div id={props.id} className={classNames(props.className)}>
      <span className="text-xl font-light mb-2">
        {props.step.category.title}
      </span>
      {!!props.step.category.url && !!props.step.category.description && (
        <span
          className="block text-sm font-light text-blue-500 hover:text-blue-600 cursor-pointer"
          onClick={() => setIsRight4UModalVisible(true)}
        >
          {props.step.category.description}
        </span>
      )}
      {/* ${props.id==="part-config-step-15"&&"mb-60"} */}
      <div
        className={`grid grid-cols-2 gap-3 mt-5 mb-20 ${
          props.index === props.lastIndex && "mb-60"
        }`}
      >
        {/* Default Part */}
        {hasDefaultPart && (
          <PartCard
            key="defaultPart"
            part={props.step.default}
            isSelected={isPartSelected(props.selectedParts, props.step.default)}
            isDisabled={
              props.preUpgradeIDs &&
              (configuratorMode === CONFIGURATOR_EDIT_ORDER_MODE ||
                configuratorMode === CONFIGURATOR_EDIT_UPGRADE_MODE)
                ? props.preUpgradeIDs.indexOf(props.step.default.id) !== -1
                : false
            }
            onClick={() => handlePartClick(props.step.default)}
          />
        )}

        {/* Upgrades */}
        {props.step.upgrades.map((part, index) => (
          <PartCard
            key={part.id}
            isWide={
              // One default part may already have been rendered
              props.step.upgrades.length % 2 === (hasDefaultPart ? 0 : 1) &&
              index === props.step.upgrades.length - 1
            }
            part={part}
            isSelected={isPartSelected(props.selectedParts, part)}
            isDisabled={
              props.preUpgradeIDs &&
              (configuratorMode === CONFIGURATOR_EDIT_ORDER_MODE ||
                configuratorMode === CONFIGURATOR_EDIT_UPGRADE_MODE)
                ? props.preUpgradeIDs.indexOf(part.id) !== -1
                : false
            }
            onClick={() => handlePartClick(part)}
          />
        ))}
      </div>

      <BlurBackdrop
        isVisible={isRight4UModalVisible}
        onClose={() => setIsRight4UModalVisible(false)}
        backdropMode="dark"
        className="w-full sm:w-900 h-900"
      >
        <IframeContentModal
          className="w-full h-full"
          url={props.step.category.url}
        />
      </BlurBackdrop>
    </div>
  );
}
