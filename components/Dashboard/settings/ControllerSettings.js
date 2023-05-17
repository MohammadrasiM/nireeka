import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBikeSettingsByMac, setBikeSettingsByMac } from "../../../app/api/nsd";
import { setBikeSettings } from "../../../app/store/dashboardSlice";
import classNames from "../../../functions/classNames";
import { convertImperialToMetic, convertMetricToImperial } from "../../../functions/convertors";
import NireekaSwitch from "../../Atoms/inputs/NireekaSwitch";
import SelectDropdown from "../../Atoms/inputs/SelectDropdown";
import TextInput from "../../Atoms/inputs/TextInput";

const pasModeList = [
  { id: 3, name: "3" },
  { id: 5, name: "5" },
  { id: 9, name: "9" },
];

const ControllerSettings = (props) => {
  const dispatch = useDispatch();
  const bikeSettings = useSelector((state) => state.dashboard.bikeSettings);

  const [isSpeedLimitLoading, setIsSpeedLimitLoading] = useState(false);
  const [shouldSpeedLimitFieldUpdate, setShouldSpeedLimitFieldUpdate] = useState(false);
  const [speedLimitValue, setSpeedLimitValue] = useState(
    !bikeSettings
      ? null
      : bikeSettings.unit === 0
      ? bikeSettings.speed_limit
      : convertMetricToImperial.kmph2mph(bikeSettings.speed_limit)
  );

  const [isZeroStartLoading, setIsZeroStartLoading] = useState(false);

  const [isStartPasLoading, setIsStartPasLoading] = useState(false);

  const [selectedPasMode, setSelectedPasMode] = useState(() => {
    if (bikeSettings === null) return null;

    for (let i = 0; i < pasModeList.length; i++) {
      if (pasModeList[i].id === bikeSettings.wheel) {
        return pasModeList[i];
      }
    }
    return pasModeList[0];
  });
  const [pasModeIsLoading, setPasModeIsLoading] = useState(false);

  const handleSpeedLimitChange = async (newValue) => {
    try {
      setIsSpeedLimitLoading(true);
      const speedLimitInMetric =
        bikeSettings.unit === 0
          ? Math.floor(+newValue)
          : Math.floor(convertImperialToMetic.mph2kmph(+newValue));

      const res = await setBikeSettingsByMac(props.macId, {
        speed_limit: speedLimitInMetric,
      });

      dispatch(setBikeSettings({ ...bikeSettings, speed_limit: speedLimitInMetric }));
    } catch (error) {
      console.log(error)
    } finally {
      setIsSpeedLimitLoading(false);
    }
  };

  const handlePasModeChange = async (newlySelected) => {
    try {
      setPasModeIsLoading(true);
      const res = await setBikeSettingsByMac(props.macId, {
        pas_mode: newlySelected.id,
      });

      dispatch(setBikeSettings({ ...bikeSettings, pas_mode: newlySelected.id }));

      setSelectedPasMode(newlySelected);
    } catch (error) {
      console.log(error)
    } finally {
      setPasModeIsLoading(false);
    }
  };

  const handleStartPasChange = async (toSet) => {
    setIsStartPasLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      start_pas: toSet ? 1 : 0,
    });
    if (res instanceof Error) {
      setIsStartPasLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}

    setIsStartPasLoading(false);
  };

  const handleZeroStartChange = async (toSet) => {
    setIsZeroStartLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      zero_start: toSet ? 1 : 0,
    });
    if (res instanceof Error) {
      setIsZeroStartLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}

    setIsZeroStartLoading(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (shouldSpeedLimitFieldUpdate) handleSpeedLimitChange(speedLimitValue);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [speedLimitValue]);

  // Unit change listener
  useEffect(() => {
    if (bikeSettings === null) return;

    setShouldSpeedLimitFieldUpdate(false);
    setSpeedLimitValue((prevState) => {
      if (bikeSettings.unit === 0) {
        if (prevState !== bikeSettings.speed_limit)
          return convertImperialToMetic.mph2kmph(+prevState);
      } else {
        if (prevState !== convertMetricToImperial.kmph2mph(+bikeSettings.speed_limit))
          return convertMetricToImperial.kmph2mph(+prevState);
      }

      return prevState;
    });
  }, [bikeSettings ? bikeSettings.unit : bikeSettings]);

  return (
    <div className={classNames(props.className, "divide-y")}>
      <h2 className="font-medium">Controller Settings</h2>

      {/* Speed Limit */}
      <div className="pt-3">
        <TextInput
          inputMode="full-border"
          label={
            "Speed Limit " + (bikeSettings ? (bikeSettings.unit === 0 ? "(km/h)" : "(mph)") : "")
          }
          type="number"
          value={speedLimitValue}
          onChange={(e) => {
            setShouldSpeedLimitFieldUpdate(true);
            setSpeedLimitValue(e.target.value);
          }}
          isLoading={isSpeedLimitLoading}
          inputClassName="w-32"
          step={1}
          isInline
          disabled={bikeSettings === null}
        />
      </div>

      {/* PAS Mode */}
      <div className="pt-3">
        <SelectDropdown
          label="PAS Mode"
          list={pasModeList}
          selected={selectedPasMode}
          onSelect={handlePasModeChange}
          isLoading={pasModeIsLoading}
          inputClassName="w-32"
          isInline
          disabled={bikeSettings === null}
        />
      </div>

      {/* Start PAS */}
      <div className="pt-3">
        <NireekaSwitch
          label="Start PAS"
          width={50}
          height={25}
          isLoading={isStartPasLoading}
          enabled={bikeSettings && bikeSettings.start_pas === 0 ? false : true}
          enabledText="1"
          disabledText="N"
          onChange={handleStartPasChange}
          isInline
          disabled={bikeSettings === null}
        />
      </div>

      {/* Zero Start */}
      <div className="pt-3">
        <NireekaSwitch
          label="Zero Start"
          height={25}
          width={50}
          isLoading={isZeroStartLoading}
          enabled={bikeSettings && bikeSettings.zero_start === 0 ? false : true}
          onChange={handleZeroStartChange}
          isInline
          disabled={bikeSettings === null}
        />
      </div>
    </div>
  );
};

export default ControllerSettings;
