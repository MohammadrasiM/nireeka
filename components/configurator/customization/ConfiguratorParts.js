import { getPreUpgradeMap } from "functions/convertors";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import classNames from "../../../functions/classNames";
import ColorConfigStep from "./ColorConfigStep";
import MultiplePartConfigStep from "./MultiplePartConfigStep";
import SinglePartConfigStep from "./SinglePartConfigStep";
import SizeConfigStep from "./SizeConfigStep";

export default function ConfiguratorParts(props) {
  const selectedParts = useSelector((state) => state.configurator.selectedParts);
  const selectedMultipleParts = useSelector((state) => state.configurator.selectedMultipleParts);
  const colorPrices = useSelector((state) => state.configurator.configuratorData.price_colors);
  const preUpgradeParts = useSelector((state) => state.configurator.preUpgrades?.parts);

  const preUpgradePartsMap = getPreUpgradeMap(preUpgradeParts);

  const steps = useMemo(
    () => [
      "size-config-step",
      "color-config-step",
      ...props.steps.map((step) => `part-config-step-${step.category_part_id}`),
      ,
    ],
    [props.steps]
  );

  // const handleStepCompletion = (stepId) => {
  //   // Scrolling programmatically to the next step
  //   const stepIndex = steps.indexOf(stepId);
  //   if (steps.length - 2 > stepIndex)
  //     document.getElementById(steps[stepIndex + 1]).scrollIntoView({ behavior: "smooth" });
  // };
  console.log(props.steps);
  debugger;
  let lastIndex = props.steps.length - 1;
  return (
    <div className={classNames("divide-y space-y-8", props.className)}>
      <SizeConfigStep
        id="size-config-step"
        className="pt-8"
        // doAfterSizeSelect={() => handleStepCompletion("size-config-step")}
      />
      <ColorConfigStep
        id="color-config-step"
        colorPrices={colorPrices}
        className="pt-8"
        // doAfterColorSelect={() => handleStepCompletion("color-config-step")}
      />
      {props.steps.map((step, index) =>
        step.category.is_multiple_choice ? (
          <MultiplePartConfigStep
            index={index}
            lastIndex={lastIndex}
            id={`part-config-step-${step.category_part_id}`}
            key={step.id}
            step={step}
            className="pt-8"
            selectedParts={selectedMultipleParts[step.category_part_id]}
            preUpgradeIDs={
              Array.isArray(preUpgradePartsMap.get(step.category_part_id))
                ? preUpgradePartsMap.get(step.category_part_id)
                : [preUpgradePartsMap.get(step.category_part_id)]
            }
            // doAfterPartSelect={() =>
            //   handleStepCompletion(`part-config-step-${step.category_part_id}`)
            // }
          />
        ) : (
          <SinglePartConfigStep
            id={`part-config-step-${step.category_part_id}`}
            key={step.id}
            step={step}
            className="pt-8"
            selectedPart={selectedParts[step.category_part_id]}
            preUpgradeID={preUpgradePartsMap.get(step.category_part_id)}
            // doAfterPartSelect={() =>
            //   handleStepCompletion(`part-config-step-${step.category_part_id}`)
            // }
          />
        )
      )}
    </div>
  );
}
