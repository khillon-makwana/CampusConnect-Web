import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function LatestArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const q = query(collection(db, "articles"), orderBy("timestamp", "desc"), limit(3));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArticles(data);
      } catch (error) {
        console.error("Error loading articles:", error);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div className="main-container grid grid-cols-1 md:grid-cols-3 gap-8">
      {articles.map(article => (
        <div key={article.id} className="container bg-white shadow-md rounded overflow-hidden">
          <div className="image-container h-48 overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container-header flex justify-between px-4 pt-3 text-sm text-gray-600">
            <p className="edu-category font-medium">{article.category}</p>
            <p className="read-time">{article.readTime}</p>
          </div>

          <div className="text-container px-4 py-2">
            <h3 className="text-lg font-bold mb-2">{article.title}</h3>
            <p className="text-gray-700 text-sm mb-4">{article.description}</p>
            <div className="container-footer flex justify-between items-center text-xs text-gray-500">
              <p>{article.author}</p>
              <p>{article.date}</p>
              <a
                href={`/article/${article.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Open
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LatestArticles;
