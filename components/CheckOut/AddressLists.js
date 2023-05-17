import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import NireekaCombobox from "../Atoms/inputs/NireekaCombobox";
import LoadingNireeka from "../Atoms/LoadingNireeka";

export default function AddressLists(props) {
  const dispatch = useDispatch();

  const [defaultAddressIndex, setDefaultAddressIndex] = useState(null);

  // Destructing onAddressSelect, because it's a useEffect dependency
  const { onAddressSelect } = props;
  const { onCountrySelect } = props;

  const addressList = useMemo(
    () =>
      props.addresses.map((address) => {
        let addressName = "";
        if (address.address) addressName += address.address + ", ";
        if (address.unit) addressName += address.unit + ", ";
        if (address.city) addressName += address.city + ", ";
        if (address.state) addressName += address.state + ", ";
        if (address?.country?.title) addressName += address.country.title;

        return {
          data: address,
          title: addressName,
          id: address.id,
        };
      }),
    [props.addresses]
  );

  const handleAddressSelect = useCallback(
    (addressSelected) => {
      if (!!onCountrySelect) {
        onCountrySelect(addressSelected.data.country);
      }
      onAddressSelect(addressSelected);
    },
    [onAddressSelect, onCountrySelect]
  );

  useEffect(() => {
    if (defaultAddressIndex) return;
    // Setting the default address as the initial value
    // Starting from the end of the array, because it is more probable to be the latest one
    // If not found, set the last address as the initial/default value to the last address
    let theFoundAddressIndex = props.addresses.length - 1;
    for (let i = props.addresses.length - 1; i >= 0; i--) {
      if (props.addresses[i].is_default) {
        theFoundAddressIndex = i;
        break;
      }
    }

    setDefaultAddressIndex(theFoundAddressIndex);
    handleAddressSelect(addressList[theFoundAddressIndex]);
  }, [
    dispatch,
    props.addresses,
    addressList,
    defaultAddressIndex,
    handleAddressSelect,
  ]);

  return (
    <div className={props.className}>
      {props.label && (
        <div className="flex items-center">
          <label className="font-light cursor-pointer">{props.label}</label>
        </div>
      )}

      {!!defaultAddressIndex ? (
        <div>
          <NireekaCombobox
            list={addressList}
            defaultSelected={addressList[defaultAddressIndex]}
            onSelect={handleAddressSelect}
          />
        </div>
      ) : (
        <LoadingNireeka className="w-5 h-5 border-gray-700" />
      )}
    </div>
  );
}
