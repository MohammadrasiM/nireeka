import Image from "next/image";
import { Fragment } from "react";
import classNames from "../../../functions/classNames";
import WhiteButton from "../../Atoms/buttons/WhiteButton";

const logoMap = {
  google: "/images/brands/google-logo.svg",
};

export default function SocialMediaAuthBox(props) {
  if (!props.socialMediaAuthList || props.socialMediaAuthList.length === 0) return <Fragment />;

  let origin = "https://nireeka.com";
  if (typeof window !== "undefined") origin = window.location.origin;
  const redirectUri = origin + (origin.includes("localhost") ? "" : "/login");

  const handleSocialMediaClick = ({ link, redirect_key }) => {
    window.location.href = link + "&" + redirect_key + "=" + redirectUri;
  };

  return (
    <div className={classNames("space-y-4", props.className)}>
      {props.socialMediaAuthList.map((item) => (
        <div key={item.title}>
          <WhiteButton
            onClick={() =>
              handleSocialMediaClick({ link: item.link, redirect_key: item.redirect_key })
            }
            className="w-full space-x-2"
          >
            <span className="w-5 h-5">
              <Image width={20} height={20} src={logoMap[item.icon]} alt="" />
            </span>
            <span>
              <span>Continue with&nbsp;</span>
              <span className="capitalize">{item.title}</span>
            </span>
          </WhiteButton>
        </div>
      ))}
    </div>
  );
}
