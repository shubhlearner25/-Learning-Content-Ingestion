import { splitIntoSentences, extractKeywords } from "../../utils/textUtils.js";

export const buildConceptGraphFromText = (text, topic = "General") => {
  const nodes = extractKeywords(text, 12);
  const edges = [];
  const nodeSet = new Set(nodes);

  const sentences = splitIntoSentences(text);
  for (const s of sentences) {
    const words = s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
    const present = [...new Set(words.filter((w) => nodeSet.has(w)))];
    for (let i = 0; i < present.length; i++) {
      for (let j = i + 1; j < present.length; j++) {
        edges.push([present[i], present[j]]);
      }
    }
  }

  return { topic, nodes, edges };
};
