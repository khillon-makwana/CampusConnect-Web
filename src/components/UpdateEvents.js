import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { submitRSVP } from "./AddRSVPUpdate";
import { onAuthStateChanged } from "firebase/auth";

const UpdateEvents = () => {
  const [events, setEvents] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  // Get logged-in user's email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  // Load events from Firestore
  useEffect(() => {
    const loadEvents = async () => {
      const eventsQuery = query(
        collection(db, "events"),
        orderBy("timestamp", "desc"),
        limit(10)
      );
      const eventsSnapshot = await getDocs(eventsQuery);
      const rawEvents = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      const uniqueKeySet = new Set();
      const filtered = [];

      for (const event of rawEvents) {
        const key = `${event.title}-${event.date}-${event.location}`;
        if (!uniqueKeySet.has(key)) {
          uniqueKeySet.add(key);
          filtered.push(event);
        }
        if (filtered.length === 4) break;
      }

      const enriched = await Promise.all(
        filtered.map(async (event) => {
          const rsvpCol = collection(db, "events", event.id, "rsvps");
          const rsvpSnap = await getDocs(rsvpCol);

          const rsvpCount = rsvpSnap.size;
          const hasRSVPd = rsvpSnap.docs.some(
            (doc) => doc.data().email === userEmail
          );

          return { ...event, rsvpCount, hasRSVPd };
        })
      );

      setEvents(enriched);
    };

    loadEvents();
  }, []);

  const handleRSVPClick = (eventId) => {
    setSelectedEventId(eventId);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    const success = await submitRSVP(selectedEventId, {
      ...formData,
      email: userEmail,
    });
    if (success) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEventId
            ? {
                ...event,
                hasRSVPd: true,
                rsvpCount: event.rsvpCount + 1,
              }
            : event
        )
      );
      setShowModal(false);
      setFormData({ name: "", phone: "" });
      setSelectedEventId(null);
    } else {
      alert("Failed to RSVP.");
    }
  };

  return (
    <>
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded shadow-md overflow-hidden"
        >
          <div className="h-56 overflow-hidden">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="text-sm text-gray-500 mb-2">
              <strong>RSVPs:</strong> {event.rsvpCount}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <div className="flex items-center mr-4">
                <i className="ri-calendar-line mr-1"></i>
                <span>{event.date}</span>
              </div>
              <div className="flex items-center mr-4">
                <i className="ri-map-pin-line mr-1"></i>
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                {event.hasRSVPd ? (
                  <button
                    disabled
                    className="px-3 py-1.5 bg-gray-300 text-gray-600 rounded-button text-sm font-medium cursor-not-allowed"
                  >
                    RSVP'd
                  </button>
                ) : (
                  <button
                    onClick={() => handleRSVPClick(event.id)}
                    className="px-3 py-1.5 bg-primary text-white rounded-button text-sm font-medium hover:bg-opacity-90 transition"
                  >
                    RSVP
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* RSVP Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleRSVPSubmit}
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
          >
            <h3 className="text-lg font-bold mb-4 text-center">RSVP for Event</h3>

            <label className="block mb-3">
              Full Name:
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>

            <label className="block mb-3">
              Phone Number:
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>

            <label className="block mb-3">
              Email:
              <input
                type="email"
                value={userEmail}
                disabled
                className="w-full mt-1 p-2 bg-gray-100 border rounded"
              />
            </label>

            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-sm text-gray-500"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-button hover:bg-opacity-90 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateEvents;
