import fs from "fs";
import pdfParse from "pdf-parse";

export const parseFileToText = async (file) => {
  const { mimetype, path } = file;

  if (mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(path);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }

  if (mimetype.startsWith("text/")) {
    return fs.readFileSync(path, "utf8");
  }

  // For videos/transcripts you can hook external services here.
  // Currently returns a placeholder.
  return "Text extraction for this file type is not implemented in this demo.";
};
