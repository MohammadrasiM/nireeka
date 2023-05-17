const TelegramButton = (props) => {
  return (
    <div className="bg-[#229ED9] hover:bg-[#128EC9] text-white px-4 py-2 rounded-full transition-colors space-x-2">
      {props.noIcon ? <></> : <i className="font-fontello icon-telegram"></i>}
      <span>{props.children}</span>
    </div>
  );
};

export default TelegramButton;
