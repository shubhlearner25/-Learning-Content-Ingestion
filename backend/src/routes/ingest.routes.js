import { Router } from "express";
import { upload } from "../middleware/upload.middleware.js";
import { ingestFile } from "../controllers/ingest.controller.js";

const router = Router();

router.post("/", upload.single("file"), ingestFile);

export default router;
