// src/components/UpdateStudyGroups.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const UpdateStudyGroups = () => {
  const [userEmail, setUserEmail] = useState("");
  const [groups, setGroups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  // Get current user email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch all study groups
  const loadStudyGroups = async () => {
    const groupQuery = query(
      collection(db, "studyGroups"),
      orderBy("timestamp", "desc")
    );

    const groupSnap = await getDocs(groupQuery);
    const groupsWithMembers = [];

    for (const docSnap of groupSnap.docs) {
      const groupData = docSnap.data();
      const groupId = docSnap.id;

      const membersCol = collection(db, "studyGroups", groupId, "members");
      const membersSnap = await getDocs(membersCol);
      const memberCount = membersSnap.size;

      const isMember = membersSnap.docs.some(
        (memberDoc) => memberDoc.data().email === userEmail
      );

      groupsWithMembers.push({
        id: groupId,
        ...groupData,
        memberCount,
        isMember,
      });
    }

    setGroups(groupsWithMembers);
  };

  // Load groups when email is ready
  useEffect(() => {
    if (userEmail) loadStudyGroups();
  }, [userEmail]);

  // Open join form
  const handleJoinClick = (groupId) => {
    setSelectedGroupId(groupId);
    setShowForm(true);
  };

  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit join form
  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGroupId || !formData.name || !formData.phone) return;

    try {
      const membersRef = collection(db, "studyGroups", selectedGroupId, "members");
      await addDoc(membersRef, {
        name: formData.name,
        phone: formData.phone,
        email: userEmail,
        timestamp: new Date(),
      });

      setFormData({ name: "", phone: "" });
      setShowForm(false);
      await loadStudyGroups();
    } catch (error) {
      console.error("Join failed:", error);
      alert("Failed to join group.");
    }
  };

  return (
      <div className="w-full px-6">
        <h1 className="text-3xl font-bold mb-6">Available Study Groups</h1>

        {groups.length === 0 ? (
          <p className="text-gray-600">No study groups available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
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
                    {group.isMember ? (
                      <button
                        disabled
                        className="bg-gray-300 text-gray-600 px-3 py-1 text-xs rounded-button font-medium cursor-not-allowed"
                      >
                        Joined
                      </button>
                    ) : (
                      <button
                        onClick={() => handleJoinClick(group.id)}
                        className="bg-black text-white px-3 py-1 text-xs rounded-button font-medium hover:bg-gray-800 transition whitespace-nowrap"
                      >
                        JOIN
                      </button>
                    )}
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
                  <div className="mt-4 text-sm text-gray-700 font-medium">
                    Members: {group.memberCount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Join Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
              onSubmit={handleJoinSubmit}
              className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
              <h3 className="text-lg font-bold mb-4 text-center">Join Study Group</h3>

              <label className="block mb-3">
                Full Name:
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
                  className="w-full mt-1 p-2 border rounded"
                />
              </label>

              <label className="block mb-3">
                Email:
                <input
                  type="email"
                  disabled
                  value={userEmail}
                  className="w-full mt-1 p-2 bg-gray-100 border rounded"
                />
              </label>

              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-sm text-gray-500"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-button hover:bg-gray-800 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
  );
};

export default UpdateStudyGroups;
