import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import classNames from "../../../functions/classNames";
import LoadingNireeka from "../LoadingNireeka";

// List has to be in this format
// const people = [
//   { id: 1, name: "Wade Cooper" },
//   { id: 2, name: "Arlene Mccoy" },
//   { id: 3, name: "Devon Webb" },
// ];

const SelectDropdown = (props) => {
  return (
    <Listbox value={props.selected} onChange={props.onSelect} disabled={props.disabled}>
      {({ open }) => (
        <div className={classNames(props.isInline && "flex items-center")}>
          <div className="inline-flex items-center">
            <Listbox.Label className="text-sm font-light text-gray-700 mr-4">
              {props.label}
            </Listbox.Label>
            {props.isLoading !== undefined && props.isLoading && (
              <LoadingNireeka className="w-5 h-5 border-gray-600" />
            )}
          </div>
          <div
            className={classNames(
              "relative",
              props.isInline ? "ml-auto" : "mt-1",
              props.inputClassName
            )}
          >
            <Listbox.Button className="relative w-full bg-white disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 ring-indigo-500 sm:text-sm">
              <span className="block truncate">{props.selected ? props.selected.name : "N/A"}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {props.list.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-8 pr-4"
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block"
                          )}
                        >
                          {item.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
          {!!props.helpText && (
            <p className="mt-2 text-sm text-gray-500">{props.helpText}</p>
          )}
        </div>
      )}
    </Listbox>
  );
};

export default SelectDropdown;
