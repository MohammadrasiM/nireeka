const TextArea = ({ label, name, formik, type = "textarea" }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} type={type} {...formik.getFieldProps(name)} name={name} />
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default TextArea;
