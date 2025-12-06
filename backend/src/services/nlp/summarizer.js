import { splitIntoSentences } from "../../utils/textUtils.js";

export const generateSummary = (text, maxSentences = 5) => {
  const sentences = splitIntoSentences(text);
  return sentences.slice(0, maxSentences).join(" ");
};
