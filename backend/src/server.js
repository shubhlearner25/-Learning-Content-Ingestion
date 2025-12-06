import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();

// ---- FIX 1: Increase Body Size Limit ----
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ---- FIX 2: Correct CORS for Netlify Frontend ----
app.use(cors({
  origin: [
    "https://your-netlify-site.netlify.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

// ---- FIX 3: Increase Multer File Upload Limit ----
const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// ---- FIX 4: Add a root route so "Cannot GET /" disappears ----
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ---- FIX 5: Your Upload Route (Adjust to your logic) ----
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Your PDF parsing logic here
    res.json({ message: "File uploaded successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Upload error", details: err.message });
  }
});

// ---- FIX 6: Render PORT handling ----
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
