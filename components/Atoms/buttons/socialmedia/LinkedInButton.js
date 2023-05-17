const LinkedInButton = (props) => {
  return (
    <div className="bg-[#0a66c2] hover:bg-[#0a56b2] text-white px-4 py-2 rounded-full transition-colors space-x-2">
      {props.noIcon ? <></> : <i className="font-fontello icon-linkedin"></i>}
      <span>{props.children}</span>
    </div>
  );
}

export default LinkedInButton;