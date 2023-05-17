import { useEffect, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import classNames from "../../../functions/classNames";
import Image from "next/image";

// List has to be in this format:
// [
//   {
//     id: 1,
//     name: "Leslie Alexander",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     id: 2,
//     name: "Leslie Alexander",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
// ];

const NireekaComboboxState = (props) => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(props.defaultSelected);

  const filteredList =
    query === ""
      ? props.list
      : props.list.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleItemSelect = (selected) => {
    setSelectedItem(selected);
    if (props.onSelect) {
      props.onSelect(selected);
    }
    if (props.formik) {
      props.formik.setFieldValue(props.name, selected);
    }
    props.setSelectIdCountry(selected);
  };

  useEffect(() => {
    if (props.manuallySelectedItem) setSelectedItem(props.manuallySelectedItem);
  }, [props.manuallySelectedItem]);

  return (
    <Combobox
      as="div"
      value={selectedItem}
      onChange={handleItemSelect}
      disabled={props.disabled}
    >
      <Combobox.Label className="block text-sm font-light text-gray-700">
        {props.label}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className={classNames(
            "w-full rounded-md  py-2 pl-3 pr-10 shadow-sm  focus:outline-none focus:ring-indigo-500 sm:text-sm",
            "border border-gray-300 bg-white focus:border-indigo-500 focus:ring-indigo-500",
            "disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
          )}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(item) => (item?.name ? item.name : "")}
          autoComplete="off"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredList.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredList.map((item) => (
              <Combobox.Option
                key={item.id}
                value={item}
                className={({ active }) =>
                  classNames(
                    "relative cursor-pointer select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      {!!item.image && (
                        <Image
                          width={24}
                          height={24}
                          objectFit="cover"
                          src={item.image}
                          alt=""
                          className="h-6 w-6 flex-shrink-0 rounded-full"
                        />
                      )}
                      <span
                        className={classNames(
                          "ml-3 truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {item.name}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
      {!!props.helpText && (
        <p className="mt-2 text-sm text-gray-500">{props.helpText}</p>
      )}

      {!props.noFormik &&
        props?.formik?.errors[props.name] &&
        props.formik.touched[props.name] && (
          <div
            id="formError"
            className="mx-1 mt-0.5 text-sm font-light text-red-500"
          >
            {!!props.formik.errors[props.name].id
              ? props.formik.errors[props.name].id
              : props.formik.errors[props.name].name
              ? props.formik.errors[props.name].name
              : "Select a state from the list."}
          </div>
        )}
    </Combobox>
  );
};

export default NireekaComboboxState;
