import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import classNames from "functions/classNames";

const SelectBox = ({
  label,
  options,
  selected,
  onChange,
  disabled,
}) => {
  const [query, setQuery] = useState("");

  const filteredList = options.filter((item) =>
    item.name?.toLowerCase().includes(query.toLowerCase())
  );

  const handleItemSelect = (item) => {
    onChange(item);
  };

  return (
    <>
    <Combobox
      as="div"
      value={selected}
      
      onChange={handleItemSelect}
      disabled={disabled}
    >
      <Combobox.Label className="block text-sm font-light text-gray-700">
        {label}
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
                  "relative cursor-pointer select-none py-2 pl-3 pr-9 " +
                  (active ? "bg-indigo-600 text-white" : "text-gray-900")
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      <span
                        className={
                          "ml-3 truncate " + (selected ? "font-semibold" : "")
                        }
                      >
                        {item.name}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={
                          "absolute inset-y-0 right-0 flex items-center pr-4 " +
                          (active ? "text-white" : "text-indigo-600")
                        }
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
    </Combobox>
    
    </>
  );
};

export default SelectBox;
