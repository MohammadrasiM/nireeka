import TwitterButton from "../../Atoms/buttons/socialmedia/TwitterButton";
import FacebookButton from "../../Atoms/buttons/socialmedia/FacebookButton";
import WhatsappButton from "../../Atoms/buttons/socialmedia/WhatsappButton";
import LinkedInButton from "../../Atoms/buttons/socialmedia/LinkedInButton";
import TelegramButton from "../../Atoms/buttons/socialmedia/TelegramButton";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
} from "react-share";

const ShareModal = (props) => {
  return (
    <WhiteShadowCard className="cursor-default">
      <p className="text-base font-medium text-gray-900 mb-4">Share this post</p>
      <div className="flex flex-wrap">
        <TwitterShareButton
          title={props.body}
          url={props.url}
          hashtags={props.hashtags}
          className="mb-3 mr-2"
        >
          <TwitterButton>Twitter</TwitterButton>
        </TwitterShareButton>

        <FacebookShareButton
          quote={props.body}
          url={props.url}
          hashtag="Nireeka"
          className="mb-3 mr-2"
        >
          <FacebookButton>Facebook</FacebookButton>
        </FacebookShareButton>

        <WhatsappShareButton
          title={props.body}
          url={props.url}
          separator={`\n`}
          className="mb-3 mr-2"
        >
          <WhatsappButton>Whatsapp</WhatsappButton>
        </WhatsappShareButton>

        <LinkedinShareButton title={props.body} url={props.url} className="mb-3 mr-2">
          <LinkedInButton>LinkedIn</LinkedInButton>
        </LinkedinShareButton>

        <TelegramShareButton title={props.body} url={props.url} className="mb-3 mr-2">
          <TelegramButton>Telegram</TelegramButton>
        </TelegramShareButton>
      </div>
    </WhiteShadowCard>
  );
};

export default ShareModal;
