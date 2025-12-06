import mongoose from "mongoose";

const ConceptGraphSchema = new mongoose.Schema(
  {
    document: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    topic: String,
    nodes: [String],
    edges: [[String]],
  },
  { timestamps: true }
);

export const ConceptGraph = mongoose.model("ConceptGraph", ConceptGraphSchema);
