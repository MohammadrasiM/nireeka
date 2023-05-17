const FacebookButton = (props) => {
  return (
    <div className="bg-[#4267B2] hover:bg-[#3257A2] text-white px-4 py-2 rounded-full transition-colors space-x-2">
      {props.noIcon ? <></> : <i className="font-fontello icon-facebook"></i>}
      <span>{props.children}</span>
    </div>
  );
};

export default FacebookButton;
