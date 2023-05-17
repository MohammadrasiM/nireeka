export default function ShowAddress(props) {
  return (
    <div className="grid grid-cols-6 gap-3">
      {props.title && <h3 className="text-xl col-span-6">{props.title}</h3>}
      {!!props.address.name && (
        <span className="col-span-3 md:col-span-2">
          Name: <span className="font-light">{props.address.name}</span>
        </span>
      )}
      {!!props.address.lastname && (
        <span className="col-span-3 md:col-span-2">
          Last Name: <span className="font-light">{props.address.lastname}</span>
        </span>
      )}
      {!!props.address.phone && (
        <span className="col-span-3 md:col-span-2">
          Phone: <span className="font-light">{props.address.phone}</span>
        </span>
      )}
      {!!props.address.address && (
        <span className="col-span-6">
          Address: <span className="font-light">{props.address.address}</span>
        </span>
      )}
      {!!props.address.unit && (
        <span className="col-span-6">
          Unit: <span className="font-light">{props.address.unit}</span>
        </span>
      )}
      {!!props.address.address2 && (
        <span className="col-span-6">
          Address 2: <span className="font-light">{props.address.address2}</span>
        </span>
      )}
      {!!props.address.city && (
        <span className="col-span-3 md:col-span-2">
          City: <span className="font-light">{props.address.city}</span>
        </span>
      )}
      {!!props.address.state && (
        <span className="col-span-3 md:col-span-2">
          State/Province: <span className="font-light">{props.address.state}</span>
        </span>
      )}
      {!!props.address.zipcode && (
        <span className="col-span-3 md:col-span-2">
          ZIP/Postal Code: <span className="font-light">{props.address.zipcode}</span>
        </span>
      )}
      {!!props.address.country.title && (
        <span className="col-span-3">
          Country: <span className="font-light">{props.address.country.title}</span>
        </span>
      )}
    </div>
  );
}
