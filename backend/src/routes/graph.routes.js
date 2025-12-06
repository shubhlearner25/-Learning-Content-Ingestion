import { Router } from "express";
import { getGraphByDocument } from "../controllers/graph.controller.js";

const router = Router();

router.get("/:documentId", getGraphByDocument);

export default router;
