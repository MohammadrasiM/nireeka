import sanitizeHtml from "sanitize-html";

const defaultOptions = {
  allowedTags: [],
  allowedAttributes: {},
};

const sanitizeSpare = (dirty, options) => ({
  __html: sanitizeHtml(
    dirty,
    (options = { ...defaultOptions, ...options })
  ).substring(0, 20), // Substring for limit
});

// To use => <SanitizeSparePartsHTML html={______} />
// Safely render html
const SanitizeSparePartsHTML = ({ html, options }) => (
  <div dangerouslySetInnerHTML={sanitizeSpare(html, options)} />
);

export default SanitizeSparePartsHTML;
