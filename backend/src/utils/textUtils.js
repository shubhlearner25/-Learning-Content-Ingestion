const STOPWORDS = new Set([
  "the","is","and","a","an","of","in","to","for","on","with","as","by","at","from",
  "this","that","it","be","or","are","was","were","can","will","we","you","they"
]);

export const splitIntoSentences = (text) => {
  return text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
};

export const extractKeywords = (text, limit = 15) => {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w) && w.length > 3);

  const freq = {};
  for (const w of words) freq[w] = (freq[w] || 0) + 1;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([w]) => w);
};
