import ConditionalLink from "../links/ConditionalLink";
import BlurBackdrop from "./BlurBackdrop";

const ImageOverlay = (props) => {
  return (
    <BlurBackdrop
      isVisible={props.isVisible}
      onOpen={props.onOpen}
      onClose={props.onClose}
      backdropMode={props.backdropMode ? props.backdropMode : "dark"}
      noBackdrop={props.noBackdrop}
    >
      <ConditionalLink href={props.href} condition={props.href} passHref>
        <div className="flex flex-col justify-center items-center mx-auto">
          {props.title && (
            <h3 className="text-white text-3xl font-light hover:text-blue-600 h-100 mb-4">
              {props.title}
            </h3>
          )}
          <img
            onClick={(e) => e.stopPropagation()}
            src={props.src}
            alt={props.alt}
            title={props.title}
            className={`inline-block rounded-xl w-full max-h-[90vh] ${
              props.href ? "cursor-pointer" : "cursor-default"
            }`}
          />
        </div>
      </ConditionalLink>
    </BlurBackdrop>
  );
};

export default ImageOverlay;
