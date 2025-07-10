// src/pages/AddJobPage.jsx
import React, { useState } from "react";
import { postJob } from "../components/AddJobUpdate";

const AddJobPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    description: "",
    skills: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await postJob(formData);
    setLoading(false);

    if (success) {
      alert("Job posted successfully!");
      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "",
        description: "",
        skills: "",
        link: "",
      });
    } else {
      alert("Failed to post job. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">
          Post a New Job
        </h2>

        {[
          { label: "Job Title", name: "title", type: "text" },
          { label: "Company", name: "company", type: "text" },
          { label: "Location", name: "location", type: "text" },
          { label: "Salary", name: "salary", type: "text" },
          { label: "Job Type", name: "type", type: "text" },
          { label: "Skills (comma separated)", name: "skills", type: "text" },
          { label: "Application Link", name: "link", type: "url" },
        ].map(({ label, name, type }) => (
          <label key={name} className="block mb-4">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required={name !== "salary" && name !== "skills" && name !== "link"}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
        ))}

        {/* Description Textarea */}
        <label className="block mb-6">
          <span className="text-sm font-medium text-gray-700">Description</span>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-medium py-2 rounded-button transition hover:bg-secondary"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;
