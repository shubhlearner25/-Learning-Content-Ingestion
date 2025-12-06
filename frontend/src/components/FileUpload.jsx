import React, { useState } from "react";
import api from "../services/api";

const FileUpload = ({ onResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await api.post("/ingest", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Upload Learning Content</h2>
      <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
        Supported: PDFs, plain text. Videos/transcripts can be wired later.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ marginBottom: "0.5rem" }}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#3b82f6",
            color: "white",
            fontWeight: 500,
          }}
        >
          {loading ? "Processing..." : "Ingest File"}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
