import classNames from "../../functions/classNames";
import LoadingNireeka from "../Atoms/LoadingNireeka";

/**
 * radioOptions = [
 * {
 *  id:any
 *  value:string,
 *  name:string,
 *  description:string
 * },
 * ....
 * ]
 */
const RadioGroupInput = ({
  label,
  name,
  formik,
  radioOptions,
  inlineOptions,
  optional,
  isLoading,
}) => {
  return (
    <fieldset>
      <span className="flex items-center text-sm font-light mb-1">
        {!!label && (
          <label className="text-gray-700 cursor-pointer" htmlFor={name}>
            {label}
          </label>
        )}
        {!!optional && <span className="text-gray-500">&nbsp;{"(Optional)"}</span>}
        {!!isLoading && <LoadingNireeka className="w-4 h-4 border-gray-700 ml-3" />}
      </span>
      <div
        className={classNames("flex flex-wrap", inlineOptions ? "flex-row" : "flex-col space-y-5")}
      >
        {radioOptions.map((item) => (
          <div
            key={item.id}
            className={classNames("relative flex items-start", inlineOptions && "mr-5")}
          >
            <div className="flex items-center h-5">
              <input
                id={item.id}
                aria-describedby={`${item.id}-description`}
                name={name}
                value={item.value}
                type="radio"
                onChange={formik.handleChange}
                checked={formik.values[name] === item.value}
                className="h-4 w-4 text-indigo-600 border-gray-300 cursor-pointer"
              />
            </div>
            <div className="ml-2 text-sm">
              <label htmlFor={item.id} className="text-gray-700 sm:text-sm cursor-pointer">
                {item.name}
              </label>
              <p id={`${item.id}-description`} className="text-gray-500 sm:text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {formik.errors[name] && formik.touched[name] && (
        <div id="formError" className="mx-1 mt-0.5 text-sm font-light text-red-500">{formik.errors[name]}</div>
      )}
    </fieldset>
  );
};

export default RadioGroupInput;
