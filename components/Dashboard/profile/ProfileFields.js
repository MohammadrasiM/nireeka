import { useSelector } from "react-redux";
import { UNITS } from "../../../app/constants/units";
import { convertMetricToImperial } from "../../../functions/convertors";

const ProfileFields = () => {
  const userData = useSelector((state) => state.auth.userData);
  const userUnitSystem = userData.unit;

  const fields = [
    {
      label: "Display Name",
      value: userData.name + " " + userData.last_name,
    },
    { label: "Email", value: userData.email },
    { label: "Country", value: userData.country.title },
    { label: "Username", value: "@" + userData.user_name },
    { label: "Gender", value: userData.gender },
    { label: "Age", value: userData.age },
    {
      label: `Height (${UNITS[userUnitSystem].length})`,
      value:
        userUnitSystem === 0 ? userData.height : convertMetricToImperial.cm2ft(userData.height),
    },
    {
      label: `Inseam (${UNITS[userUnitSystem].length})`,
      value:
        userUnitSystem === 0 ? userData.inseam : convertMetricToImperial.cm2ft(userData.inseam),
    },
    {
      label: `Weight (${UNITS[userUnitSystem].mass})`,
      value:
        userUnitSystem === 0 ? userData.weight : convertMetricToImperial.kg2lb(userData.weight),
    },
    {
      label: "Unit System",
      value: userUnitSystem === 0 ? "Metric" : "Imperial",
    },
  ];

  return (
    <div className="mb-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">{field.label}</dt>
            <dd className="mt-1 text-sm text-gray-900">{field.value ? field.value : "N/A"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ProfileFields;
