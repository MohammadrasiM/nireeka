import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBikeSettingsByMac, setBikeSettingsByMac } from "../../../app/api/nsd";
import { setBikeSettings } from "../../../app/store/dashboardSlice";
import classNames from "../../../functions/classNames";
import NireekaSwitch from "../../Atoms/inputs/NireekaSwitch";
import SelectDropdown from "../../Atoms/inputs/SelectDropdown";
import TextInput from "../../Atoms/inputs/TextInput";

const hbModeList = [
  { id: 0, name: "Leisure" },
  { id: 1, name: "Sport" },
];

const HeartbeatAssistSettings = (props) => {
  const MAX_ALLOWED_BPM = 220;
  const MIN_ALLOWED_BPM = 40;

  const dispatch = useDispatch();
  const bikeSettings = useSelector((state) => state.dashboard.bikeSettings);
  const [errorMessage, setErrorMessage] = useState("");

  // BLE enable/disable
  const [isBleEnablerLoading, setIsBleEnablerLoading] = useState(false);
  const handleBleEnablerChange = async (toSet) => {
    setIsBleEnablerLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      ble: toSet ? 1 : 0,
    });
    if (res instanceof Error) {
      console.log('error')
      setIsBleEnablerLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}

    setIsBleEnablerLoading(false);
  };

  // Min heartbeat
  const [minHeartbeatValue, setMinHeartbeatValue] = useState(
    bikeSettings && bikeSettings.min_hr ? bikeSettings.min_hr : 60
  );
  const [isMinHBInputLoading, setIsMinHBInputLoading] = useState(false);
  const [shouldMinHBFieldUpdate, setShouldMinHBFieldUpdate] = useState(false);
  const handleMinHBChange = async (newValue) => {
    setIsMinHBInputLoading(true);

    const res = await setBikeSettingsByMac(props.macId, {
      min_hr: +newValue,
    });
    if (res instanceof Error) {
      setIsMinHBInputLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}

    setIsMinHBInputLoading(false);
  };
  useEffect(() => {
    setShouldMinHBFieldUpdate(true);
    setErrorMessage("");
    const timeoutId = setTimeout(() => {
      if (!shouldMinHBFieldUpdate) return;

      if (+minHeartbeatValue !== Math.floor(+minHeartbeatValue))
        setMinHeartbeatValue(Math.floor(+minHeartbeatValue));
      if (+minHeartbeatValue < MIN_ALLOWED_BPM)
        setErrorMessage(`Min heartbeat cannot be less than ${MIN_ALLOWED_BPM}bpm.`);
      else if (+minHeartbeatValue > +maxHeartbeatValue)
        setErrorMessage("Min heartbeat cannot be greater than max heartbeat.");
      else handleMinHBChange(minHeartbeatValue);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [minHeartbeatValue]);

  // Max heartbeat
  const [maxHeartbeatValue, setMaxHeartbeatValue] = useState(
    bikeSettings && bikeSettings.max_hr ? bikeSettings.max_hr : 120
  );
  const [isMaxHBInputLoading, setIsMaxHBInputLoading] = useState(false);
  const [shouldMaxHBFieldUpdate, setShouldMaxHBFieldUpdate] = useState(false);
  const handleMaxHBChange = async (newValue) => {
    setIsMaxHBInputLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      max_hr: +newValue,
    });
    if (res instanceof Error) {
      setIsMaxHBInputLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}

    setIsMaxHBInputLoading(false);
  };
  useEffect(() => {
    setShouldMaxHBFieldUpdate(true);
    setErrorMessage("");

    const timeoutId = setTimeout(() => {
      if (!shouldMaxHBFieldUpdate) return;

      if (+maxHeartbeatValue !== Math.floor(+maxHeartbeatValue))
        setMaxHeartbeatValue(Math.floor(+maxHeartbeatValue));
      if (+maxHeartbeatValue > MAX_ALLOWED_BPM)
        setErrorMessage(`Max heartbeat cannot be greater than ${MAX_ALLOWED_BPM}bpm.`);
      else if (+maxHeartbeatValue < +minHeartbeatValue)
        setErrorMessage("Max heartbeat cannot be less than min heartbeat.");
      else handleMaxHBChange(maxHeartbeatValue);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [maxHeartbeatValue]);

  // Heartbeast assist mode
  const [isHbModeLoading, setIsHeartbeatLoading] = useState(false);
  const [selectedHbMode, setSelectedHbMode] = useState(() => {
    if (bikeSettings === null) return null;

    for (let i = 0; i < hbModeList.length; i++) {
      if (hbModeList[i].id === bikeSettings.mode_hr) {
        return hbModeList[i];
      }
    }
    return hbModeList[0];
  });
  const handleHbModeChange = async (newlySelected) => {
    setIsHeartbeatLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      mode_hr: newlySelected.id,
    });
    if (res instanceof Error) {
      setIsHeartbeatLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}
  
    setSelectedHbMode(() => {
      for (let i = 0; i < hbModeList.length; i++) {
        if (hbModeList[i].id === bikeSettingsRes.data.settings.mode_hr) {
          return hbModeList[i];
        }
      }
      return hbModeList[0];
    });
    setIsHeartbeatLoading(false);
  };

  return (
    <div className={classNames("divide-y", props.className)}>
      <h2 className="font-medium">Heartbeat Assist Settings</h2>

      {/* BLE enable/disable */}
      <div className="pt-3">
        <NireekaSwitch
          label="Enabled"
          width={50}
          height={25}
          isLoading={isBleEnablerLoading}
          enabled={bikeSettings && bikeSettings.ble === 0 ? false : true}
          disabled={bikeSettings === null}
          onChange={handleBleEnablerChange}
          isInline
        />
      </div>

      {/* Min Heartbeat */}
      <div className="pt-3">
        <TextInput
          inputMode="full-border"
          label="Min Heartbeat"
          type="number"
          step={1}
          value={minHeartbeatValue}
          onChange={(e) => setMinHeartbeatValue(e.target.value)}
          isLoading={isMinHBInputLoading}
          inputClassName="w-32"
          helpText={`(Min: ${MIN_ALLOWED_BPM}bpm)`}
          isInline
          disabled={!bikeSettings || bikeSettings.ble === 0 ? true : false}
        />
      </div>

      {/* Max Heartbeat */}
      <div className="pt-3">
        <TextInput
          inputMode="full-border"
          label="Max Heartbeat"
          type="number"
          step={1}
          value={maxHeartbeatValue}
          onChange={(e) => setMaxHeartbeatValue(e.target.value)}
          isLoading={isMaxHBInputLoading}
          inputClassName="w-32"
          helpText={`(Max: ${MAX_ALLOWED_BPM}bpm)`}
          isInline
          disabled={!bikeSettings || bikeSettings.ble === 0 ? true : false}
        />
      </div>

      {/* Heartbeat Assist Mode */}
      <div className="pt-3">
        <SelectDropdown
          label="Mode"
          list={hbModeList}
          isLoading={isHbModeLoading}
          selected={selectedHbMode}
          onSelect={handleHbModeChange}
          inputClassName="w-32"
          isInline
          disabled={!bikeSettings || bikeSettings.ble === 0 ? true : false}
        />
      </div>

      {!!errorMessage && (
        <div className="pt-3">
          <p className="text-red-600">Error: {errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default HeartbeatAssistSettings;
