// src/components/LatestEvents.js
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function LatestEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const q = query(collection(db, 'events'), orderBy('timestamp', 'desc'), limit(3));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(data);
    }

    fetchEvents();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {events.map(event => (
        <div key={event.id} className="bg-white rounded shadow-md overflow-hidden">
          <div className="h-56 overflow-hidden">
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover object-top" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <div className="flex items-center mr-4">
                <i className="ri-calendar-line mr-1"></i>
                <span>{event.date || "TBD"}</span>
              </div>
              <div className="flex items-center">
                <i className="ri-map-pin-line mr-1"></i>
                <span>{event.location || "On Campus"}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LatestEvents;
