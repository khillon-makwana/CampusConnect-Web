// src/pages/JoinStudyGroupPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { submitJoinGroup } from "../components/JoinStudyGroupUpdate";

const JoinStudyGroupPage = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const groupId = new URLSearchParams(location.search).get("groupId");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData((prev) => ({ ...prev, email: user.email }));
      } else {
        alert("You must be logged in to join a study group.");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupId) return alert("Missing study group ID.");

    setLoading(true);
    const success = await submitJoinGroup(groupId, formData);
    setLoading(false);

    if (success) {
      setMessage("You have joined the study group!");
      setFormData((prev) => ({ ...prev, name: "", phone: "" }));
    } else {
      alert("There was an error joining the study group.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-md w-full"
      >
        <h2 className="text-xl font-bold mb-4 text-primary text-center">
          Join Study Group
        </h2>

        <label className="block mb-2">
          Full Name:
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        <label className="block mb-2">
          Phone Number:
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        <label className="block mb-2">
          Email (auto-filled):
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full p-2 mt-1 bg-gray-100 border rounded"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white px-4 py-2 rounded-button hover:bg-secondary transition mt-4"
        >
          {loading ? "Joining..." : "Join Group"}
        </button>

        {message && (
          <div className="text-green-600 text-center mt-4 font-medium">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default JoinStudyGroupPage;
