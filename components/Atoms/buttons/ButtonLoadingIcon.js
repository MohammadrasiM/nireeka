
const ButtonLoadingIcon = ({classNames, color}) => {
  return (
    <div
      className={`w-3 h-3 rounded-full border-t animate-spin ${classNames} ${color}`}
    />
  );
};

export default ButtonLoadingIcon;
