import { toggleUserPreferredUnitSystem } from "app/api/user";
import { METRIC_SYSTEM } from "app/constants/units";
import { userDataPending } from "app/store/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBikeSettingsByMac, setBikeSettingsByMac } from "../../../app/api/nsd";
import { setBikeSettings } from "../../../app/store/dashboardSlice";
import classNames from "../../../functions/classNames";
import NireekaSwitch from "../../Atoms/inputs/NireekaSwitch";
import SelectDropdown from "../../Atoms/inputs/SelectDropdown";
import LoadingNireeka from "../../Atoms/LoadingNireeka";

const brightnessList = [
  { id: 0, name: "Auto" },
  { id: 25, name: "25" },
  { id: 50, name: "50" },
  { id: 75, name: "75" },
  { id: 100, name: "100" },
];

const wheelSizeList = [
  { id: 26, name: "26" },
  { id: 27, name: "27" },
  { id: 29, name: "29" },
  { id: 30, name: "30" },
];

const GeneralSettings = (props) => {
  const dispatch = useDispatch();
  const bikeSettings = useSelector((state) => state.dashboard.bikeSettings);
  const userUnit = useSelector((state) => state.auth.userData.unit);
  const selectedUnit = bikeSettings?.unit ? bikeSettings.unit : userUnit;

  // Unit stuff
  const [isUnitChangeLoading, setIsUnitChangeLoading] = useState(false);
  const handleUnitCheckboxChange = async (e) => {
    setIsUnitChangeLoading(true);
    if (bikeSettings) {
      const res = await setBikeSettingsByMac(props.macId, {
        unit: +e.target.value,
      });
      if (res instanceof Error) {
        console.log(error)
        setIsUnitChangeLoading(false);
        return;
      }

      try {
        const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
        dispatch(setBikeSettings(bikeSettingsRes.data.settings));
      } catch (error) {}
    } else {
      try {
        const res = await toggleUserPreferredUnitSystem();
        dispatch(userDataPending());
      } catch (error) {
        console.log(error)
      }
    }

    setIsUnitChangeLoading(false);
  };

  // Brightness stuff
  const [selectedBrightness, setSelectedBrightness] = useState(() => {
    if (bikeSettings === null) return null;

    for (let i = 0; i < brightnessList.length; i++) {
      if (brightnessList[i].id === bikeSettings.brightness) {
        return brightnessList[i];
      }
    }
    return brightnessList[0];
  });
  const [isBrightnessLoading, setIsBrightnessLoading] = useState(false);
  const handleBrightnessChange = async (newlySelected) => {
    setIsBrightnessLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      brightness: newlySelected.id,
    });
    if (res instanceof Error) {
      console.log('error')
      setIsBrightnessLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}

    setSelectedBrightness(() => {
      for (let i = 0; i < brightnessList.length; i++) {
        if (brightnessList[i].id === bikeSettingsRes.data.settings.brightness) {
          return brightnessList[i];
        }
      }
      return brightnessList[0];
    });
    setIsBrightnessLoading(false);
  };

  // Auto Off
  const [isAutoOffLoading, setIsAutoOffLoading] = useState(false);
  const handleAutoOffChange = async (toSet) => {
    setIsAutoOffLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      auto_off: toSet ? 1 : 0,
    });
    if (res instanceof Error) {
      setIsAutoOffLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}

    setIsAutoOffLoading(false);
  };

  // Wheel Size
  const [selectedWheelSize, setSelectedWheelSize] = useState(() => {
    if (bikeSettings === null) return null;

    for (let i = 0; i < wheelSizeList.length; i++) {
      if (wheelSizeList[i].id === bikeSettings.wheel) {
        return wheelSizeList[i];
      }
    }
    return wheelSizeList[0];
  });
  const [wheelSizeIsLoading, setWheelSizeIsLoading] = useState(false);
  const handleWheelSizeChange = async (newlySelected) => {
    setWheelSizeIsLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      wheel: newlySelected.id,
    });
    if (res instanceof Error) {
      setSelectedWheelSize(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));

      setSelectedWheelSize(() => {
        for (let i = 0; i < wheelSizeList.length; i++) {
          if (wheelSizeList[i].id === bikeSettingsRes.data.settings.wheel) {
            return wheelSizeList[i];
          }
        }
        return wheelSizeList[0];
      });
    } catch (error) {}

    setWheelSizeIsLoading(false);
  };

  return (
    <div className={classNames("divide-y", props.className)}>
      <h2 className="font-medium">General Settings</h2>
      {/* Unit change */}
      <div className="pt-3">
        <div className="flex mt-1 text-sm text-gray-900">
          <label className="text-sm font-medium text-gray-700 flex space-x-4 items-center">
            <span>Unit System</span>
            {isUnitChangeLoading && <LoadingNireeka className="w-4 h-4 border-gray-600" />}
          </label>
          <span className="inline-flex items-center mr-4 ml-auto cursor-pointer">
            <input
              id="metric-unit-checkbox"
              type="radio"
              value="0"
              name="unit-checkbox"
              className="cursor-pointer disabled:cursor-not-allowed"
              onChange={handleUnitCheckboxChange}
              defaultChecked={selectedUnit === METRIC_SYSTEM}
              // disabled={bikeSettings === null}
            />
            <label
              htmlFor="metric-unit-checkbox"
              className={classNames(
                "ml-1 cursor-pointer"
                // bikeSettings === null ? "cursor-not-allowed text-gray-500" : "cursor-pointer"
              )}
            >
              Metric
            </label>
          </span>
          <span className="inline-flex items-center mr-4 cursor-pointer">
            <input
              id="imperial-unit-checkbox"
              type="radio"
              value="1"
              name="unit-checkbox"
              className="cursor-pointer disabled:cursor-not-allowed"
              onChange={handleUnitCheckboxChange}
              defaultChecked={selectedUnit === 1}
              // disabled={bikeSettings === null}
            />
            <label
              htmlFor="imperial-unit-checkbox"
              className={classNames(
                "ml-1 cursor-pointer"
                // bikeSettings === null ? "cursor-not-allowed text-gray-500" : "cursor-pointer"
              )}
            >
              Imperial
            </label>
          </span>
        </div>
      </div>

      {/* Brightness */}
      <div className="pt-3">
        <SelectDropdown
          label="Brightness"
          list={brightnessList}
          isLoading={isBrightnessLoading}
          selected={selectedBrightness}
          onSelect={handleBrightnessChange}
          inputClassName="min-w-[8rem]"
          isInline
          disabled={bikeSettings === null}
        />
      </div>

      {/* Auto Off */}
      <div className="pt-3">
        <NireekaSwitch
          label="Auto Off"
          width={50}
          height={25}
          isLoading={isAutoOffLoading}
          enabled={bikeSettings && bikeSettings.auto_off === 0 ? false : true}
          onChange={handleAutoOffChange}
          isInline
          disabled={bikeSettings === null}
        />
      </div>

      {/* Wheel Size */}
      <div className="pt-3">
        <SelectDropdown
          label="Wheel Size"
          list={wheelSizeList}
          selected={selectedWheelSize}
          onSelect={handleWheelSizeChange}
          isLoading={wheelSizeIsLoading}
          inputClassName="min-w-[8rem]"
          isInline
          disabled={bikeSettings === null}
        />
      </div>
    </div>
  );
};

export default GeneralSettings;
