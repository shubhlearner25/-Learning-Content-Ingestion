import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import ingestRoutes from "./routes/ingest.routes.js";
import flashcardRoutes from "./routes/flashcards.routes.js";
import graphRoutes from "./routes/graph.routes.js";
import topicRoutes from "./routes/topics.routes.js";

import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/ingest", ingestRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/graph", graphRoutes);
app.use("/api/topics", topicRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Challenge 6 Learning Ingestion API" });
});

app.use(errorHandler);

export default app;
