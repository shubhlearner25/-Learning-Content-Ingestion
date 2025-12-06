import React from "react";

const ConceptGraphView = ({ graph }) => {
  if (!graph) return null;

  return (
    <div className="card">
      <h2>Concept Graph  (Simple)</h2>
      <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
        Nodes represent concepts, edges show co-occurrence.
      </p>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div>
          <h4>Nodess</h4>
          <ul>
            {graph.nodes?.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Edges</h4>
          <ul>
            {graph.edges?.map((e, idx) => (
              <li key={idx}>
                {e[0]} &rarr; {e[1]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConceptGraphView;
