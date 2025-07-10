import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function LatestStudyGroups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchStudyGroups() {
      try {
        const q = query(collection(db, "studyGroups"), orderBy("timestamp", "desc"), limit(3));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGroups(data);
      } catch (error) {
        console.error("Error loading study groups:", error);
      }
    }

    fetchStudyGroups();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {groups.map(group => (
        <div key={group.id} className="bg-white rounded shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-200">
                  <img
                    src={group.imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{group.title}</h3>
                  <p className="text-sm text-gray-500">Led by {group.leader}</p>
                </div>
              </div>
              <a
                href="/study-groups"
                className="bg-black text-white px-3 py-1 text-xs rounded-button font-medium hover:bg-gray-800 transition whitespace-nowrap"
              >
                JOIN
              </a>
            </div>
            <p className="text-gray-600 mb-4">{group.description}</p>
            <div className="flex items-center text-sm text-gray-500 justify-between">
              <div className="flex items-center">
                <i className="ri-map-pin-line mr-1"></i>
                <span>{group.location}</span>
              </div>
              <div className="flex items-center">
                <i className="ri-calendar-line mr-1"></i>
                <span>{group.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LatestStudyGroups;
