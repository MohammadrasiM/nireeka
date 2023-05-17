import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "../../app/store/configuratorSlice";
import NireekaSwitch from "../Atoms/inputs/NireekaSwitch";
import { configuratorKeys } from "app/constants/localStorageKeys";

export default function ConfiguratorUnitSwitch(props) {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const configuratorUnit = useSelector((state) => state.configurator.unit);

  const handleUnitSwitchChange = async () => {
    dispatch(toggleUnit());
  };

  useEffect(() => {
    if (userData && userData.unit !== configuratorUnit) handleUnitSwitchChange();

    const unitFromLocalStorage = localStorage.getItem(configuratorKeys.CONFIGURATOR_UNIT);
    if (unitFromLocalStorage) {
      if (configuratorUnit.toString() !== unitFromLocalStorage) dispatch(toggleUnit());
    }
  }, []); // No dependency, it should only run on the first render

  useEffect(() => {
    localStorage.setItem(configuratorKeys.CONFIGURATOR_UNIT, configuratorUnit.toString());
  }, [configuratorUnit]);

  return (
    <NireekaSwitch
      onChange={handleUnitSwitchChange}
      enabledText="Metric"
      disabledText="Imperial"
      enabled={configuratorUnit === 0}
      width={50}
      height={25}
      className={props.className}
      alwaysOn
    />
  );
}
