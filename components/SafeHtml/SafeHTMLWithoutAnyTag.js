import sanitizeHtml from "sanitize-html";

// Removes all html tags and attributes, leaving only inner text
const noTagOption = {
  allowedTags: [],
  allowedAttributes: {},
};

const SafeHTMLWithoutAnyTag = ({ dirtyHtml, className }) => (
  <span
    className={className}
    dangerouslySetInnerHTML={{
      __html: sanitizeHtml(dirtyHtml, noTagOption),
    }}
  />
);

export default SafeHTMLWithoutAnyTag;
