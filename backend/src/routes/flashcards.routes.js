import { Router } from "express";
import {
  getFlashcardsByDocument,
  downloadFlashcardsCsv,
} from "../controllers/flashcards.controller.js";

const router = Router();

router.get("/:documentId", getFlashcardsByDocument);
router.get("/:documentId/csv", downloadFlashcardsCsv);

export default router;
