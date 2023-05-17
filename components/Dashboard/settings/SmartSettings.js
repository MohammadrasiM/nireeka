import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getBikeSettingsByMac,
  setBikeSettingsByMac,
} from "../../../app/api/nsd";
import { setBikeSettings } from "../../../app/store/dashboardSlice";
import classNames from "../../../functions/classNames";
import NireekaSwitch from "../../Atoms/inputs/NireekaSwitch";
import SelectDropdown from "../../Atoms/inputs/SelectDropdown";
import TextInput from "../../Atoms/inputs/TextInput";

const securityModeList = [
  {
    id: 0,
    name: "none",
  },
  {
    id: 1,
    name: "pin",
  },
];

const SmartSettings = (props) => {
  const dispatch = useDispatch();
  const bikeSettings = useSelector((state) => state.dashboard.bikeSettings);

  // Auto Brake stuff
  const [isAutoBrakeLoading, setIsAutoBrakeLoading] = useState(false);
  const handleAutoBrake = async (toSet) => {
    setIsAutoBrakeLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      auto_break: toSet ? 1 : 0,
    });
    if (res instanceof Error) {
      console.log('error')
      setIsAutoBrakeLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}

    setIsAutoBrakeLoading(false);
  };

  // Location Service
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const handleGpsEnablerChange = async (toSet) => {
    setIsGpsLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      gps: toSet ? 1 : 0,
    });
    if (res instanceof Error) {
      setIsGpsLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}

    setIsGpsLoading(false);
  };

  // Alarm
  const [isAlarmLoading, setIsAlarmLoading] = useState(false);
  const handleAlarmEnablerChange = async (toSet) => {
    setIsAlarmLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      alarm: toSet ? 1 : 0,
    });
    if (res instanceof Error) {
      setIsAlarmLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}

    setIsAlarmLoading(false);
  };

  // Lights
  const [isLightsEnablerLoading, setIsLightsEnablerLoading] = useState(false);
  const handleLightsEnablerChange = async (toSet) => {
    setIsLightsEnablerLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      lights: toSet ? 1 : 0,
    });
    if (res instanceof Error) {
      setIsLightsEnablerLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}

    setIsLightsEnablerLoading(false);
  };

  // Security
  const [isSecurityModeLoading, setIsSecurityModeLoading] = useState(false);
  const [selectedSecurityMode, setSelectedSecurityMode] = useState(() => {
    if (bikeSettings === null) return null;

    for (let i = 0; i < securityModeList.length; i++) {
      if (securityModeList[i].id === bikeSettings.security_mode) {
        return securityModeList[i];
      }
    }
    return securityModeList[0];
  });
  const handleSecurityModeChange = async (newlySelected) => {
    setIsSecurityModeLoading(true);
    const res = await setBikeSettingsByMac(props.macId, {
      security_mode: newlySelected.id,
    });
    if (res instanceof Error) {
      setIsSecurityModeLoading(false);
      return;
    }

    try {
      const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
      dispatch(setBikeSettings(bikeSettingsRes.data.settings));
    } catch (error) {}

    setSelectedSecurityMode(() => {
      for (let i = 0; i < securityModeList.length; i++) {
        if (
          securityModeList[i].id === bikeSettingsRes.data.settings.security_mode
        ) {
          return securityModeList[i];
        }
      }
      return securityModeList[0];
    });
    setIsSecurityModeLoading(false);
  };

  //  Pin
  // const [isPinLoading, setIsPinLoading] = useState(false);
  // const [pinValue, setPinValue] = useState(bikeSettings.pin);
  // const [shouldPinFieldUpdate, setShouldPinFieldUpdate] = useState(false);
  // const handlePinValueChange = async (newValue) => {
  //   setIsPinLoading(true);
  //   const res = await setBikeSettingsByMac(props.macId, {
  //     pin: +newValue,
  //   });
  //   if (res instanceof Error) {
  //     toast.error(
  //       "Sorry, we can't process your request right now. Try again later."
  //     );
  //     setIsPinLoading(false);
  //     return;
  //   }

  //   try {
  //     const bikeSettingsRes = await getBikeSettingsByMac(props.macId);
  //     dispatch(setBikeSettings(bikeSettingsRes.data.settings));
  //   } catch (error) {}
  //   setIsPinLoading(false);
  // };
  // useEffect(() => {
  //   setShouldPinFieldUpdate(true);
  //   const timeoutId = setTimeout(() => {
  //     if (shouldPinFieldUpdate) handlePinValueChange(pinValue);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [pinValue]);

  return (
    <div className={classNames(props.className, "divide-y")}>
      <h2 className="font-medium text-lg">Smart Settings</h2>

      {/* Auto Brake */}
      <div className="pt-3">
        <NireekaSwitch
          label="Auto Brake"
          width={50}
          height={25}
          isLoading={isAutoBrakeLoading}
          enabled={bikeSettings && bikeSettings.auto_break === 0 ? false : true}
          onChange={handleAutoBrake}
          isInline
          disabled={bikeSettings === null}
        />
      </div>

      {/* Location Service */}
      <div className="pt-3">
        <NireekaSwitch
          label="Location Service"
          width={50}
          height={25}
          isLoading={isGpsLoading}
          enabled={
            bikeSettings && bikeSettings.gps === 0 ? false : true
          }
          onChange={handleGpsEnablerChange}
          isInline
          disabled={bikeSettings === null}
        />
      </div>

      {/* Alarm */}
      <div className="pt-3">
        <NireekaSwitch
          label="Alarm"
          width={50}
          height={25}
          isLoading={isAlarmLoading}
          enabled={
            bikeSettings && bikeSettings.alarm === 0 ? false : true
          }
          onChange={handleAlarmEnablerChange}
          isInline
          disabled={bikeSettings === null}
        />
      </div>

      {/* Lights */}
      <div className="pt-3">
        <NireekaSwitch
          label="Lights"
          width={50}
          height={25}
          isLoading={isLightsEnablerLoading}
          enabled={
            bikeSettings && bikeSettings.lights === 0 ? false : true
          }
          onChange={handleLightsEnablerChange}
          isInline
          disabled={bikeSettings === null}
        />
      </div>

      {/* Security */}
      <div className="pt-3">
        <SelectDropdown
          label="Security"
          list={securityModeList}
          isLoading={isSecurityModeLoading}
          selected={selectedSecurityMode}
          onSelect={handleSecurityModeChange}
          isInline
          inputClassName="w-32"
          disabled={bikeSettings === null}
        />
      </div>
    </div>
  );
};

export default SmartSettings;
