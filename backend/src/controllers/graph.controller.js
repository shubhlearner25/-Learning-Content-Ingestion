import { ConceptGraph } from "../models/ConceptGraph.js";

export const getGraphByDocument = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const graph = await ConceptGraph.findOne({ document: documentId }).lean();
    res.json(graph);
  } catch (err) {
    next(err);
  }
};
