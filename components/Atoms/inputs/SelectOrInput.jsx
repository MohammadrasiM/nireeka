import Input from "@/components/common/Input";
import React, { useState } from "react";
import SelectBox from "./SelectedBox";

const SelectOrInput = (props) => {
  const [selectedStateOption, setSelectedStateOption] = useState(props.name[0]?.name);

  const [fillValue, setFillValue] = useState("");

  const handleChange = (selectedOption) => {
    setSelectedStateOption(selectedOption.name);
    console.log(selectedStateOption);
    debugger;
    props.formik.setFieldValue(props.name, selectedOption.name);
  };

  const isAddressDetailsLoading = false; // Replace with your logic for loading state options

  //   const filteredIdState = props.options.map((option) => {
  //     return { label: option.name, value: option.name };
  //   });

  return (
    <>
      {/* id 35 => united state || id =>4 canada */}
      {props.condition ? (
        <div className="sm:col-span-2 self-end">
          <SelectBox
            options={props.options}
            value={props.value}
            onChange={handleChange}
            formik={props.formik}
            name={props.name}
            label={props.label}
            setFillValue={setFillValue}
          />
          {!props.noFormik && props.formik.errors[props.name] && props.formik.touched[props.name] && (
            <div id="formError" className="mx-1 mt-0.5 text-sm font-light text-red-500">
              {props.formik.errors[props.name]}
            </div>
          )}
        </div>
      ) : (
        <div className={`sm:col-span-2`}>
          <Input
            showError={true}
            value={fillValue}
            formik={props.formik}
            name={props.name}
            label={props.label}
            isLoading={isAddressDetailsLoading}
          />
          {!props.noFormik && props.formik.errors[props.name] && props.formik.touched[props.name] && (
            <div id="formError" className="mx-1 mt-0.5 text-sm font-light text-red-500">
              {props.formik.errors[props.name]}
            </div>
          )}
        </div>
      )}
      {/* Errors */}
    </>
  );
};

export default SelectOrInput;
