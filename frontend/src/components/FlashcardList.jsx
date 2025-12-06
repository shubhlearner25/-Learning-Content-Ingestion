import React from "react";

const FlashcardList = ({ flashcards }) => {
  if (!flashcards?.length) return null;

  return (
    <div className="card">
      <h2>Flashcards (JSON View)</h2>
      <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
        These cards are auto-generated from your document.
      </p>
      <pre
        style={{
          maxHeight: "300px",
          overflow: "auto",
          background: "#020617",
          padding: "1rem",
          borderRadius: "0.5rem",
          fontSize: "0.75rem",
        }}
      >
        {JSON.stringify(
          flashcards.map(({ question, answer, topic }) => ({
            topic,
            question,
            answer,
          })),
          null,
          2
        )}
      </pre>
    </div>
  );
};

export default FlashcardList;
