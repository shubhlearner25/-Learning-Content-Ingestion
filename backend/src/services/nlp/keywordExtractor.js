import { extractKeywords } from "../../utils/textUtils.js";

export const getKeyConcepts = (text) => {
  return extractKeywords(text, 20);
};
