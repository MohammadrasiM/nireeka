const WhatsappButton = (props) => {
  return (
    <div className="bg-[#25D366] hover:bg-[#15C356] text-white px-4 py-2 rounded-full transition-colors space-x-2">
      {props.noIcon ? <></> : <i className="font-fontello icon-whatsapp"></i>}
      <span>{props.children}</span>
    </div>
  );
};

export default WhatsappButton;
