import React, { useEffect, useState } from "react";
import api from "../services/api";

const TopicList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api
      .get("/topics")
      .then((res) => setTopics(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!topics.length) return null;

  return (
    <div className="card">
      <h2>Topics Index</h2>
      <ul>
        {topics.map((t) => (
          <li key={t._id}>{t.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopicList;
