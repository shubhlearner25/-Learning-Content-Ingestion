import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    originalName: String,
    mimeType: String,
    path: String,
    textContent: String,
    topics: [String],
  },
  { timestamps: true }
);

export const Document = mongoose.model("Document", DocumentSchema);
