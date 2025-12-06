import { splitIntoSentences } from "../../utils/textUtils.js";
import { extractKeywords } from "../../utils/textUtils.js";

export const buildTopicHierarchy = (text) => {
  // Simple: top-level topic + subtopics from top keywords
  const keywords = extractKeywords(text, 10);
  const title = keywords[0] || "General";
  const children = keywords.slice(1).map((k) => ({ name: k, children: [] }));
  return { name: title, children };
};
