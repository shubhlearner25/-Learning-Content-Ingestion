import { Document } from "../models/Document.js";
import { Topic } from "../models/Topic.js";
import { Flashcard } from "../models/Flashcard.js";
import { ConceptGraph } from "../models/ConceptGraph.js";

import { parseFileToText } from "../services/fileParser.service.js";
import { generateSummary } from "../services/nlp/summarizer.js";
import { getKeyConcepts } from "../services/nlp/keywordExtractor.js";
import { buildTopicHierarchy } from "../services/nlp/topicHierarchy.js";
import { generateFlashcardsFromText } from "../services/nlp/flashcardGen.js";
import { buildConceptGraphFromText } from "../services/nlp/conceptGraph.js";

export const ingestFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const textContent = await parseFileToText(req.file);

    const keyConcepts = getKeyConcepts(textContent);
    const hierarchy = buildTopicHierarchy(textContent);
    const mainTopic = hierarchy.name || "General";

    const document = await Document.create({
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      path: req.file.path,
      textContent,
      topics: [mainTopic, ...keyConcepts],
    });

    await Topic.create({ name: mainTopic, document: document._id });

    const summary = generateSummary(textContent);
    const flashcardsRaw = generateFlashcardsFromText(textContent, mainTopic);
    const flashcards = await Flashcard.insertMany(
      flashcardsRaw.map((f) => ({ ...f, document: document._id }))
    );

    const graphRaw = buildConceptGraphFromText(textContent, mainTopic);
    const graph = await ConceptGraph.create({
      document: document._id,
      topic: graphRaw.topic,
      nodes: graphRaw.nodes,
      edges: graphRaw.edges,
    });

    res.json({
      documentId: document._id,
      mainTopic,
      keyConcepts,
      hierarchy,
      summary,
      flashcards,
      graph,
    });
  } catch (err) {
    next(err);
  }
};
