// src/components/UpdateArticles.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "../firebase";

const UpdateArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const q = query(
          collection(db, "articles"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const snapshot = await getDocs(q);
        const articlesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setArticles(articlesList);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    loadArticles();
  }, []);

  return (
    <>
      {articles.map((article) => (
        <div key={article.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">{article.title}</h2>
            <p className="text-sm text-gray-500">By {article.author || "Unknown"}</p>
          </div>
          {article.imageUrl && (
            <div className="mb-4">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-48 object-cover rounded"
              />
            </div>
          )}
          <p className="text-gray-700 mb-4">
            {article.summary || article.content?.slice(0, 150) + "..."}
          </p>
          <div className="flex justify-between items-center text-sm text-primary font-medium">
            <a
              href={`/article/${article.id}`}
              className="hover:underline"
            >
              Read More →
            </a>
            <span className="text-gray-400">
              {new Date(article.timestamp?.seconds * 1000).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default UpdateArticles;
