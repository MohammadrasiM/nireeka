const TwitterButton = (props) => {
  return (
    <div className="bg-[#1d9bf0] hover:bg-[#268cd8] text-white px-4 py-2 rounded-full transition-colors space-x-2">
      {props.noIcon ? <></> : <i className="font-fontello icon-twitter"></i>}
      <span>{props.children}</span>
    </div>
  );
};

export default TwitterButton;
