import { splitIntoSentences } from "../../utils/textUtils.js";

export const generateFlashcardsFromText = (text, topic = "General") => {
  const sentences = splitIntoSentences(text).slice(0, 15);
  const flashcards = sentences.map((s, idx) => ({
    topic,
    question: `What is the key idea of: "${s.slice(0, 60)}..."?`,
    answer: s,
  }));
  return flashcards;
};
