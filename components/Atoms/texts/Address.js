const Address = (props) => {
  return (
    <span className="text-sm">
      <p>
        {(!!props.address.name ? props.address.name + " " : "") +
          (!!props.address.last_name ? props.address.last_name : "")}
      </p>
      {!!props.address.email && <p>{props.address.email}</p>}
      {!!props.address.address1 && (
        <p>{props.address.address1 + (!!props.address.unit ? ", # " + props.address.unit : "")}</p>
      )}
      {!!props.address.address2 && <p>{props.address.address2}</p>}
      <p>
        {!!props.address.city ? props.address.city + ", " : ""}
        {!!props.address.state ? props.address.state + ", " : ""}
        {!!props.address.zipcode ? props.address.zipcode + ", " : ""}
        {!!props.address.country && !!props.address.country.title
          ? props.address.country.title
          : ""}
      </p>
    </span>
  );
};

export default Address;
