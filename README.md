# Challenge 6 – Multi-Source Learning Content Ingestion (MERN)

This project is a **minimal, end‑to‑end MERN implementation** for:

- Ingesting PDFs / text documents
- Extracting key concepts & a simple topic hierarchy
- Auto‑generating structured learning artifacts:
  - Flashcards (JSON + CSV)
  - Summary
  - Concept graph
- Storing and retrieving everything by topic

---

## 1. Project Structure

```bash
challenge6-mern-learning-ingestion/
├── backend/        # Node.js + Express + MongoDB API
└── frontend/       # React + Vite web UI
```

### 1.1 Backend

```bash
backend/
├── package.json
├── .env.example
├── uploads/                  # Temporary uploaded files
└── src/
    ├── app.js                # Express app wiring
    ├── server.js             # Entry – starts server & DB
    ├── config/
    │   └── db.js             # Mongo connection
    ├── models/
    │   ├── Document.js       # Raw document & extracted text
    │   ├── Flashcard.js      # Flashcards per document/topic
    │   ├── ConceptGraph.js   # Concept graph nodes + edges
    │   └── Topic.js          # Topic index
    ├── routes/
    │   ├── ingest.routes.js      # POST /api/ingest
    │   ├── flashcards.routes.js  # GET /api/flashcards/:documentId
    │   ├── graph.routes.js       # GET /api/graph/:documentId
    │   └── topics.routes.js      # GET /api/topics
    ├── controllers/
    │   ├── ingest.controller.js      # Orchestrates ingestion pipeline
    │   ├── flashcards.controller.js  # JSON + CSV flashcards
    │   ├── graph.controller.js       # Concept graph retrieval
    │   └── topic.controller.js       # Topic index
    ├── services/
    │   ├── fileParser.service.js     # PDF / text → raw text
    │   └── nlp/
    │       ├── summarizer.js         # Simple extractive summary
    │       ├── keywordExtractor.js   # Key concepts using frequency
    │       ├── topicHierarchy.js     # Topic + subtopics
    │       ├── flashcardGen.js       # Flashcards from sentences
    │       └── conceptGraph.js       # Nodes + edges from co‑occurrence
    ├── middleware/
    │   ├── upload.middleware.js      # Multer file upload
    │   └── errorHandler.js           # Central error handling
    └── utils/
        └── textUtils.js              # Sentence split + keyword helper
```

---

### 1.2 Frontend

```bash
frontend/
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── services/
    │   └── api.js                # Axios client → /api
    └── components/
        ├── FileUpload.jsx        # Upload & trigger ingestion
        ├── SummaryView.jsx       # Shows summary + key concepts
        ├── FlashcardList.jsx     # Shows JSON flashcards
        ├── ConceptGraphView.jsx  # Shows nodes/edges list
        └── TopicList.jsx         # Simple topic index
```

---

## 2. How the System Satisfies the Challenge

### 2.1 Parse Multiple File Types

- `backend/src/middleware/upload.middleware.js`
  - Uses **multer** to accept a file (`file` field).
- `backend/src/services/fileParser.service.js`
  - If `mimetype === application/pdf` → uses **pdf-parse**.
  - If `text/*` → reads as UTF‑8.
  - Other types are stubbed: you can plug in:
    - Video → speech‑to‑text
    - Audio → transcription
    - External transcript files.

### 2.2 Extract Key Concepts & Topic Hierarchy

- `backend/src/utils/textUtils.js`
  - Tokenizes + filters stopwords.
  - Builds simple term frequency map.
- `backend/src/services/nlp/keywordExtractor.js`
  - Returns the top N keywords = **key concepts**.
- `backend/src/services/nlp/topicHierarchy.js`
  - Creates a **root topic** from the most frequent keyword
  - Builds a flat hierarchy: root + children (other keywords).

### 2.3 Auto‑Generate Structured Educational Outputs

All logic orchestrated in `ingest.controller.js`:

1. Parse uploaded file → raw text.
2. Generate:
   - `summary` – using `summarizer.js` (first few sentences).
   - `keyConcepts` – using `keywordExtractor.js`.
   - `hierarchy` – using `topicHierarchy.js`.
   - `flashcards` – using `flashcardGen.js` (Q/A from sentences).
   - `graph` – using `conceptGraph.js` (nodes + edges from co‑occurrence).

Everything is saved to MongoDB and returned in a single JSON response.

### 2.4 Store & Enable Retrieval by Topic

- Each `Document` stores:
  - `topics` (root topic + keywords).
- Each `Flashcard` and `ConceptGraph` references the **document**.
- Topics are also stored in the `Topic` collection for a simple index.
- Retrieval:
  - `GET /api/flashcards/:documentId` → JSON flashcards.
  - `GET /api/graph/:documentId` → concept graph.
  - `GET /api/topics` → all topics.

You can easily extend this to query by `topic` instead of `documentId`.

### 2.5 Deliverables Mapping

- **CLI or web tool ingesting files**
  - Web tool: `frontend` React app
  - Upload through `FileUpload.jsx` → calls `POST /api/ingest`.
- **JSON/CSV flashcards**
  - JSON: `GET /api/flashcards/:documentId`
  - CSV: `GET /api/flashcards/:documentId/csv`
    - Implemented via `csv-writer` in `flashcards.controller.js`.
- **Concept graph or learning path**
  - Concept graph:
    - Built in `services/nlp/conceptGraph.js`
    - Exposed via `GET /api/graph/:documentId`
    - Rendered as lists in `ConceptGraphView.jsx` (you can later plug in a graph visualization library).

---

## 3. Running the Project

### 3.1 Backend

```bash
cd backend
cp .env.example .env
# Edit .env if needed (Mongo URL, port)

npm install
npm run dev
```

Server runs on **http://localhost:5000**

### 3.2 Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:3000**

Vite dev server proxies `/api` requests to the backend.

---

## 4. Typical Flow

1. Open `http://localhost:3000`
2. Upload a PDF or text file.
3. Backend:
   - Extracts text.
   - Runs the lightweight NLP pipeline.
   - Stores:
     - `Document`
     - `Flashcards`
     - `ConceptGraph`
     - `Topic`
4. Frontend:
   - Shows:
     - Summary + key concepts
     - Flashcards in JSON form
     - Concept graph nodes + edges
     - Global topic index

This matches the **Challenge 6** requirements using a clean MERN architecture.

You can now:
- Extend NLP to use real LLMs / spaCy / transformers
- Add support for video/audio transcripts
- Improve graph visualization
without changing the core folder structure.
