/**
 * Converts WordPress's rendered fields to display text.
 *
 * The fields come from a remote CMS and must never be inserted as browser HTML.
 */
export const wordpressHtmlToText = (value: string | null | undefined): string => {
  if (!value) {
    return "";
  }

  const document = new DOMParser().parseFromString(value, "text/html");

  // Do not expose text from elements that should never be part of a post's
  // visible title or description.
  document
    .querySelectorAll("script, style, template, noscript, svg, math, iframe, object, embed")
    .forEach((element) => element.remove());

  return document.body.textContent?.replace(/\s+/g, " ").trim() ?? "";
};
