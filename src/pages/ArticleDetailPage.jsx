// src/pages/ArticleDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../components/ArticleDetailUpdate";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const getArticle = async () => {
      const data = await fetchArticleById(id);
      setArticle(data);
    };
    if (id) getArticle();
  }, [id]);

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading article...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-pacifico text-primary">CampusConnect</h1>
          <div className="flex space-x-6 text-sm font-medium text-gray-600">
            <a href="/" className="hover:text-primary transition">HOME</a>
            <a href="/events" className="hover:text-primary transition">EVENTS</a>
            <a href="/jobs" className="hover:text-primary transition">JOBS</a>
            <a href="/study-groups" className="hover:text-primary transition">STUDY GROUPS</a>
            <a href="/articles" className="hover:text-primary transition">ARTICLES</a>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <img
          src={article.imageUrl || "https://via.placeholder.com/600x300?text=No+Image"}
          alt="Article"
          className="w-full rounded-lg mb-6 object-cover"
        />
        <div className="mb-4 text-sm text-gray-500 space-x-4">
          <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
            {article.category || "General"}
          </span>
          <span>{article.readTime || "3 min read"}</span>
          <span>By {article.author}</span>
          <span>{article.date}</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h2>
        <div className="prose prose-indigo max-w-none">
          {article.content.split("\n").map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-pacifico mb-3">CampusConnect</h3>
            <p className="text-gray-400 mb-4 max-w-md text-sm">
              Your all-in-one platform for campus life, connecting students with opportunities, events, and each other.
            </p>
            <div className="flex space-x-6 mb-4">
              <a href="/" className="text-gray-400 hover:text-white transition">Home</a>
              <a href="/events" className="text-gray-400 hover:text-white transition">Events</a>
              <a href="/jobs" className="text-gray-400 hover:text-white transition">Jobs</a>
              <a href="/study-groups" className="text-gray-400 hover:text-white transition">Study Groups</a>
              <a href="/articles" className="text-gray-400 hover:text-white transition">Articles</a>
            </div>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="ri-facebook-fill"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="ri-twitter-x-fill"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="ri-instagram-fill"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="ri-linkedin-fill"></i></a>
            </div>
            <div className="border-t border-gray-800 w-full mt-4 pt-4 text-center text-gray-400">
              <p className="text-sm">&copy; 2025 CampusConnect. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArticleDetailPage;
