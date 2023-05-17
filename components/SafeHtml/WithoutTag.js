import React from "react";
import sanitizeHtml from "sanitize-html";
// safely render html
const defaultOptions = {
  allowedTags: [],
  allowedAttributes: {},
};

export const sanitize = (dirty, options) => ({
  __html: sanitizeHtml(dirty, (options = { ...defaultOptions, ...options })),
});

export const SanitizeHTML = ({ html, options }) => (
  <span dangerouslySetInnerHTML={sanitize(html, options)} />
);
// for use =><SanitizeHTML html={______} />
//
// safely render html
const sanitizeSpare = (dirty, options) => ({
  __html: sanitizeHtml(
    dirty,
    (options = { ...defaultOptions, ...options })
  ).substring(0, 20),
  //substring for limit
});

export const SanitizeSpareHTML = ({ html, options }) => (
  <div dangerouslySetInnerHTML={sanitizeSpare(html, options)} />
);
// for use =><SanitizeHTML html={______} />
// safely render html
