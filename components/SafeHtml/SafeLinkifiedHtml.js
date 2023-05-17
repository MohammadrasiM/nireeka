import linkifyHtml from "linkifyjs/lib/linkify-html";
import { sanitizeHtmlOptions } from "../../configs/sanitizeHtmlOptions";
import sanitizeHtml from "sanitize-html";

const SafeLinkifiedHtml = (props) => {
  const content = linkifyHtml(sanitizeHtml(props.string, sanitizeHtmlOptions), {
    defaultProtocol: "https",
    target: "_blank",
    nl2br: true,
  });
  return <p className={props.className} dangerouslySetInnerHTML={{ __html: content }}></p>;
};

export default SafeLinkifiedHtml;
