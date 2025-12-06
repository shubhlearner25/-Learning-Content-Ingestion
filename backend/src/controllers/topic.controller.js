import { Topic } from "../models/Topic.js";

export const listTopics = async (req, res, next) => {
  try {
    const topics = await Topic.find().lean();
    res.json(topics);
  } catch (err) {
    next(err);
  }
};
