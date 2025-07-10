// src/pages/AddArticlePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitArticle } from "../components/AddArticleUpdate";

const AddArticlePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    category: "",
    readTime: "",
    date: "",
    imageUrl: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await submitArticle(formData);
    setLoading(false);

    if (success) {
      alert("Article added successfully!");
      navigate("/articles");
    } else {
      alert("Failed to add article. Try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-primary">Add New Article</h2>

        {[
          { label: "Title", name: "title" },
          { label: "Description", name: "description", type: "textarea" },
          { label: "Author", name: "author" },
          { label: "Category", name: "category" },
          { label: "Read Time", name: "readTime" },
          { label: "Date", name: "date" },
          { label: "Image URL", name: "imageUrl", type: "url" },
          { label: "Content", name: "content", type: "textarea" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}:
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white px-4 py-2 rounded-button hover:bg-secondary transition"
        >
          {loading ? "Submitting..." : "Add Article"}
        </button>
      </form>
    </div>
  );
};

export default AddArticlePage;
