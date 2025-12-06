import { Flashcard } from "../models/Flashcard.js";
import { createObjectCsvStringifier } from "csv-writer";

export const getFlashcardsByDocument = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const flashcards = await Flashcard.find({ document: documentId }).lean();
    res.json(flashcards);
  } catch (err) {
    next(err);
  }
};

export const downloadFlashcardsCsv = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const flashcards = await Flashcard.find({ document: documentId }).lean();

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: "topic", title: "Topic" },
        { id: "question", title: "Question" },
        { id: "answer", title: "Answer" },
      ],
    });

    const header = csvStringifier.getHeaderString();
    const records = csvStringifier.stringifyRecords(
      flashcards.map((f) => ({
        topic: f.topic,
        question: f.question,
        answer: f.answer,
      }))
    );

    const csv = header + records;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="flashcards-${documentId}.csv"`
    );
    res.send(csv);
  } catch (err) {
    next(err);
  }
};
