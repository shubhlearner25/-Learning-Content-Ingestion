import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
  {
    name: String,
    document: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
  },
  { timestamps: true }
);

export const Topic = mongoose.model("Topic", TopicSchema);
