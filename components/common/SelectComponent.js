const Select = ({ selectOptions, name, formik }) => {
  return (
    <div>
      <label htmlFor="country" className="block text-sm font-light text-gray-700">
        Country <span className="text-red-500">*</span>
      </label>
      <select
        {...formik.getFieldProps(name)}
        name={name}
        className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {selectOptions.map((item) => {
          return (
            <>
              <option key={item.value} value={item.value}>
                {item.title}
              </option>
            </>
          );
        })}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <div id="formError" className="mx-1 mt-0.5 text-sm font-light text-red-500">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Select;
