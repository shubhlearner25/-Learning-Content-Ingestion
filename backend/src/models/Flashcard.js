import mongoose from "mongoose";

const FlashcardSchema = new mongoose.Schema(
  {
    document: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    topic: String,
    question: String,
    answer: String,
  },
  { timestamps: true }
);

export const Flashcard = mongoose.model("Flashcard", FlashcardSchema);
