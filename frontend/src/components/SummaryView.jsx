import React from "react";

const SummaryView = ({ summary, topic, concepts }) => {
  if (!summary) return null;

  return (
    <div className="card">
      <h2>Summary</h2>
      <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
        Main topic: <strong>{topic}</strong>
      </p>
      <p>{summary}</p>
      {concepts?.length ? (
        <>
          <h3>Key Concepts</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {concepts.map((c) => (
              <span
                key={c}
                style={{
                  fontSize: "0.8rem",
                  background: "#1f2937",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "999px",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SummaryView;
