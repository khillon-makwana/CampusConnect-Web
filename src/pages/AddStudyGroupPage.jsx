// src/pages/AddStudyGroupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitStudyGroup } from "../components/AddStudyGroupUpdate";

const AddStudyGroupPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    leader: "",
    description: "",
    location: "",
    time: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await submitStudyGroup(formData);
    setLoading(false);

    if (success) {
      setMessage("Study Group added successfully!");
      setFormData({
        title: "",
        leader: "",
        description: "",
        location: "",
        time: "",
        imageUrl: "",
      });
      setTimeout(() => navigate("/study-groups"), 2000);
    } else {
      alert("Failed to add study group.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Add a New Study Group</h2>

        {[
          { label: "Study Group Name", name: "title" },
          { label: "Leader", name: "leader" },
          { label: "Location", name: "location" },
          { label: "Time", name: "time" },
          { label: "Image URL", name: "imageUrl", type: "url" },
        ].map(({ label, name, type = "text" }) => (
          <label key={name} className="block mb-4">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <input
              type={type}
              name={name}
              required
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
        ))}

        {/* Description */}
        <label className="block mb-6">
          <span className="text-sm font-medium text-gray-700">Description</span>
          <textarea
            name="description"
            required
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 px-4 rounded-button hover:bg-secondary transition"
        >
          {loading ? "Submitting..." : "Add Study Group"}
        </button>

        {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default AddStudyGroupPage;
