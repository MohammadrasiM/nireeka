import {Fragment} from "react";
import {Dialog, Disclosure, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/outline";
import {ChevronDownIcon} from "@heroicons/react/solid";
import classNames from "functions/classNames";
import MultiRange from "@/components/Atoms/inputs/MultiRange";

function ConfiguratorFilterMobile({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  bikeModels, toggleQuery,
  getRange,
  getLabel,
  hasQuery,
  bikesFilters,
  getRangeValue,
  filters,
  updateRangeQuery,
  motorsList,
  batteriesList,
  frameSizesList,
  suspensionList,
  tireSizeList
}) {
    return (
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-[999999] flex lg:hidden"
                onClose={setMobileFiltersOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <div
                        className="relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl">
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-lg font-light text-gray-900">
                                Filters
                            </h2>
                            <button
                                type="button"
                                className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 hover:text-gray-500"
                                onClick={() => setMobileFiltersOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XIcon className="w-6 h-6" aria-hidden="true"/>
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="space-y-5 divide-y divide-gray-200">
                            <form className="mt-4">
                                <Disclosure
                                    as="div"
                                    key="bikeModel"
                                    className="pt-4 pb-1 border-t border-gray-200"
                                >
                                    {({open}) => (
                                        <fieldset>
                                            <legend className="w-full px-2">
                                                <Disclosure.Button
                                                    className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500">
                                <span className="font-light text-gray-900 text-1remi">
                                  Models
                                </span>
                                                    <span className="flex items-center ml-6 h-7">
                                  <ChevronDownIcon
                                      className={classNames(
                                          open ? "-rotate-180" : "rotate-0",
                                          "h-5 w-5 transform"
                                      )}
                                      aria-hidden="true"
                                  />
                                </span>
                                                </Disclosure.Button>
                                            </legend>
                                            <Disclosure.Panel className="px-4 pt-2 pb-2">
                                                <div className="space-y-6">
                                                    {bikeModels.map(
                                                        (model, optionIdx) => (
                                                            <div key={model.id} className="flex items-center">
                                                                <input
                                                                    id={`${model.id}-${optionIdx}`}
                                                                    name={model.title}
                                                                    value={model.id}
                                                                    onChange={() => toggleQuery('model', model.id)}
                                                                    type="checkbox"
                                                                    checked={hasQuery('model', model.id)}
                                                                    className="w-4 h-4 font-light text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                                                                />
                                                                <label htmlFor={`${model.id}-${optionIdx}`}
                                                                       className="ml-3 font-light text-gray-500">
                                                                    {model.title}
                                                                </label>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </Disclosure.Panel>
                                        </fieldset>
                                    )}
                                </Disclosure>
                                {/* ))} */}
                            </form>
                            {(bikesFilters?.filters || filters)?.price &&
                                <MultiRange label={getLabel("price")} name="price" min={getRange('price', 'min')}
                                            max={getRange('price', 'max')} defaultValue={getRangeValue('price')}
                                            className="pt-4 px-6"
                                            onChange={(value) => updateRangeQuery('price', value)}/>}
                            {(bikesFilters?.filters || filters)?.speed &&
                                <MultiRange label={`max ${getLabel("speed")}`} name="speed"
                                            min={getRange('speed', 'min')} max={getRange('speed', 'max')}
                                            defaultValue={getRangeValue('speed')} className="pt-4 px-6"
                                            onChange={(value) => updateRangeQuery('speed', value)}/>}
                            {(bikesFilters?.filters || filters)?.range &&
                                <MultiRange label={getLabel("range")} name="range" min={getRange('range', 'min')}
                                            max={getRange('range', 'max')} defaultValue={getRangeValue('range')}
                                            className="pt-4 px-6"
                                            onChange={(value) => updateRangeQuery('range', value)}/>}
                            {(bikesFilters?.filters || filters)?.weight &&
                                <MultiRange label={getLabel("weight")} name="weight" min={getRange('weight', 'min')}
                                            max={getRange('weight', 'max')} defaultValue={getRangeValue('weight')}
                                            className="py-4 px-6"
                                            onChange={(value) => updateRangeQuery('weight', value)}/>}
                        </div>
                        <form className="mt-4">
                            {/* {filters.map((section) => ( */}
                            <Disclosure
                                as="div"
                                key="bikeModel"
                                className="pt-4 pb-1 border-t border-gray-200"
                            >
                                {({open}) => (
                                    <fieldset>
                                        <legend className="w-full px-2">
                                            <Disclosure.Button
                                                className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500">
                                <span className="font-light text-gray-900 text-1remi">
                                  Motors
                                </span>
                                                <span className="flex items-center ml-6 h-7">
                                  <ChevronDownIcon
                                      className={classNames(
                                          open ? "-rotate-180" : "rotate-0",
                                          "h-5 w-5 transform"
                                      )}
                                      aria-hidden="true"
                                  />
                                </span>
                                            </Disclosure.Button>
                                        </legend>
                                        <Disclosure.Panel className="px-4 pt-2 pb-2">
                                            <div className="space-y-6">
                                                {motorsList.map(
                                                    (motor, optionIdx) => (
                                                        <div key={motor.id} className="flex items-center">
                                                            <input
                                                                id={`${motor.id}-${optionIdx}`}
                                                                name={motor.title}
                                                                value={motor.id}
                                                                onChange={() => toggleQuery('motor', motor.title)}
                                                                type="checkbox"
                                                                checked={hasQuery('motor', motor.title)}
                                                                className="w-4 h-4 font-light text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                                                            />
                                                            <label htmlFor={`${motor.id}-${optionIdx}`}
                                                                   className="ml-3 font-light text-gray-500">
                                                                {motor.title}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </Disclosure.Panel>
                                    </fieldset>
                                )}
                            </Disclosure>
                            {/* ))} */}
                        </form>
                        <form className="mt-4">
                            {/* {filters.map((section) => ( */}
                            <Disclosure
                                as="div"
                                key="Category"
                                className="pt-4 pb-4 border-t border-gray-200"
                            >
                                {({open}) => (
                                    <fieldset>
                                        <legend className="w-full px-2">
                                            <Disclosure.Button
                                                className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500">
                                <span className="font-light text-gray-900 text-1remi">
                                  Battry
                                </span>
                                                <span className="flex items-center ml-6 h-7">
                                  <ChevronDownIcon
                                      className={classNames(
                                          open ? "-rotate-180" : "rotate-0",
                                          "h-5 w-5 transform"
                                      )}
                                      aria-hidden="true"
                                  />
                                </span>
                                            </Disclosure.Button>
                                        </legend>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2">
                                            <div className="space-y-6">
                                                {batteriesList?.map(
                                                    (battry, optionIdx) => (
                                                        <div
                                                            key={battry.id}
                                                            className="flex items-center"
                                                        >
                                                            <input
                                                                id={`${battry.id}-${optionIdx}`}
                                                                name={`${battry.id}[]`}
                                                                value={battry.id}
                                                                onChange={() => toggleQuery('battry', battry.title)}
                                                                type="checkbox"
                                                                checked={hasQuery('battry', battry.title)}
                                                                className="w-4 h-4 font-light text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`${battry.id}-${optionIdx}`}
                                                                className="ml-3 font-light text-gray-500"
                                                            >
                                                                {battry.title}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </Disclosure.Panel>
                                    </fieldset>
                                )}
                            </Disclosure>
                            {/* ))} */}
                        </form>
                        <form className="mt-4">
                            {/* {filters.map((section) => ( */}
                            <Disclosure
                                as="div"
                                key="Category"
                                className="pt-4 pb-4 border-t border-gray-200"
                            >
                                {({open}) => (
                                    <fieldset>
                                        <legend className="w-full px-2">
                                            <Disclosure.Button
                                                className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500">
                                <span className="font-light text-gray-900 text-1remi">
                                  FrameSize
                                </span>
                                                <span className="flex items-center ml-6 h-7">
                                  <ChevronDownIcon
                                      className={classNames(
                                          open ? "-rotate-180" : "rotate-0",
                                          "h-5 w-5 transform"
                                      )}
                                      aria-hidden="true"
                                  />
                                </span>
                                            </Disclosure.Button>
                                        </legend>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2">
                                            <div className="space-y-6">
                                                {frameSizesList?.map(
                                                    (frameSize, optionIdx) => (
                                                        <div
                                                            key={frameSize.id}
                                                            className="flex items-center"
                                                        >
                                                            <input
                                                                id={`${frameSize.id}-${optionIdx}`}
                                                                name={`${frameSize.id}[]`}
                                                                value={frameSize.id}
                                                                onChange={() => toggleQuery('frameSize', frameSize.title)}
                                                                type="checkbox"
                                                                checked={hasQuery('frameSize', frameSize.title)}
                                                                className="w-4 h-4 font-light text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`${frameSize.id}-${optionIdx}`}
                                                                className="ml-3 font-light text-gray-500"
                                                            >
                                                                {frameSize.title}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </Disclosure.Panel>
                                    </fieldset>
                                )}
                            </Disclosure>
                            {/* ))} */}
                        </form>
                        <form className="mt-4">
                            {/* {filters.map((section) => ( */}
                            <Disclosure
                                as="div"
                                key="Category"
                                className="pt-4 pb-4 border-t border-gray-200"
                            >
                                {({open}) => (
                                    <fieldset>
                                        <legend className="w-full px-2">
                                            <Disclosure.Button
                                                className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500">
                                <span className="font-light text-gray-900 text-1remi">
                                  Suspension
                                </span>
                                                <span className="flex items-center ml-6 h-7">
                                  <ChevronDownIcon
                                      className={classNames(
                                          open ? "-rotate-180" : "rotate-0",
                                          "h-5 w-5 transform"
                                      )}
                                      aria-hidden="true"
                                  />
                                </span>
                                            </Disclosure.Button>
                                        </legend>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2">
                                            <div className="space-y-6">
                                                {suspensionList?.map(
                                                    (suspension, optionIdx) => (
                                                        <div key={suspension} className="flex items-center">
                                                            <input
                                                                id={`${suspension}-${optionIdx}`}
                                                                name={`${suspension}[]`}
                                                                value={suspension}
                                                                onChange={() => toggleQuery('suspension', suspension)}
                                                                type="checkbox"
                                                                checked={hasQuery('suspension', suspension)}
                                                                className="w-4 h-4 font-light text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                                                            />
                                                            <label htmlFor={`${suspension}-${optionIdx}`}
                                                                   className="ml-3 font-light text-gray-500">
                                                                {suspension}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </Disclosure.Panel>
                                    </fieldset>
                                )}
                            </Disclosure>
                        </form>
                        <form className="mt-4">
                            <Disclosure
                                as="div"
                                key="Category"
                                className="pt-4 pb-4 border-t border-gray-200"
                            >
                                {({open}) => (
                                    <fieldset>
                                        <legend className="w-full px-2">
                                            <Disclosure.Button
                                                className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500">
                                <span className="font-light text-gray-900 text-1remi">
                                  Tire Size
                                </span>
                                                <span className="flex items-center ml-6 h-7">
                                  <ChevronDownIcon
                                      className={classNames(
                                          open ? "-rotate-180" : "rotate-0",
                                          "h-5 w-5 transform"
                                      )}
                                      aria-hidden="true"
                                  />
                                </span>
                                            </Disclosure.Button>
                                        </legend>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2">
                                            <div className="space-y-6">
                                                {tireSizeList?.map(
                                                    (tireSize, optionIdx) => (
                                                        <div key={tireSize} className="flex items-center">
                                                            <input
                                                                id={`${tireSize}-${optionIdx}`}
                                                                name={`${tireSize}[]`}
                                                                value={tireSize}
                                                                onChange={() => toggleQuery('tire_size', tireSize)}
                                                                type="checkbox"
                                                                checked={hasQuery('tire_size', tireSize)}
                                                                className="w-4 h-4 font-light text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`${tireSize}-${optionIdx}`}
                                                                className="ml-3 font-light text-gray-500"
                                                            >
                                                                {tireSize}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </Disclosure.Panel>
                                    </fieldset>
                                )}
                            </Disclosure>
                            {/* ))} */}
                        </form>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}

export default ConfiguratorFilterMobile

