// src/pages/AddEventPage.jsx
import React, { useEffect, useState } from "react";
import { submitEvent } from "../components/AddEventsUpdate"; // Import logic here

const AddEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitEvent(formData);
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      imageUrl: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Add a New Event
        </h2>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Event Title</span>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Description</span>
          <textarea
            name="description"
            rows="4"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md resize-none"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Date</span>
          <input
            type="text"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Location</span>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-medium text-gray-700">Image URL</span>
          <input
            type="url"
            name="imageUrl"
            placeholder="https://example.com/image.jpg"
            required
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-secondary text-white font-medium py-2 rounded-button transition"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
