import classNames from "../../../functions/classNames";
import WhiteShadowCard from "../cards/WhiteShadowCard";

export default function IframeContentModal(props) {
  return (
    <WhiteShadowCard className={classNames(props.className, "overflow-hidden h-full")} noPadding>
      {props.url ? (
        <iframe className="w-full h-full" src={props.url}></iframe>
      ) : (
        <div className="h-full flex justify-center items-center">
          <p>There is no description.</p>
        </div>
      )}
    </WhiteShadowCard>
  );
}
