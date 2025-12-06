import React, { useState } from "react";
import FileUpload from "./components/FileUpload.jsx";
import SummaryView from "./components/SummaryView.jsx";
import FlashcardList from "./components/FlashcardList.jsx";
import ConceptGraphView from "./components/ConceptGraphView.jsx";
import TopicList from "./components/TopicList.jsx";

const App = () => {
  const [ingestResult, setIngestResult] = useState(null);

  return (
    <div className="app-container">
      <h1 style={{ marginBottom: "1rem" }}>
        Challenge 6: Learning Content Ingestion (MERN Demo)
      </h1>
      <FileUpload onResult={setIngestResult} />
      <TopicList />
      {ingestResult && (
        <>
          <SummaryView
            summary={ingestResult.summary}
            topic={ingestResult.mainTopic}
            concepts={ingestResult.keyConcepts}
          />
          <FlashcardList flashcards={ingestResult.flashcards} />
          <ConceptGraphView graph={ingestResult.graph} />
        </>
      )}
    </div>
  );
};

export default App;
