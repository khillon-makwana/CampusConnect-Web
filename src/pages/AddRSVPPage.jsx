// src/pages/AddRSVPPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { submitRSVP } from "../components/AddRSVPUpdate";

const AddRSVPPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const eventId = new URLSearchParams(location.search).get("eventId");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setFormData((prev) => ({ ...prev, email: u.email }));
      } else {
        alert("Please log in to RSVP");
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
    if (!eventId) return alert("Invalid event ID.");

    setLoading(true);
    const success = await submitRSVP(eventId, formData);
    setLoading(false);

    if (success) {
      setMessage("RSVP submitted!");
      setFormData((prev) => ({ ...prev, name: "", phone: "" }));
    } else {
      alert("RSVP failed. Try again.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-primary">RSVP to Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition"
          >
            {loading ? "Submitting..." : "Submit RSVP"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-green-600 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddRSVPPage;
