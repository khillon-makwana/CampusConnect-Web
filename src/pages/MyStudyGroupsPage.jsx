import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import StudyGroupCard from "../components/StudyGroupCard";
import { useNavigate } from "react-router-dom";

const MyStudyGroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async (userEmail) => {
      const groupsSnapshot = await getDocs(collection(db, "studyGroups"));
      const joinedGroups = [];

      for (const groupDoc of groupsSnapshot.docs) {
        const groupId = groupDoc.id;
        const membersRef = collection(db, `studyGroups/${groupId}/members`);
        const membersSnapshot = await getDocs(membersRef);

        const isMember = membersSnapshot.docs.some(
          (doc) => doc.data().email === userEmail
        );

        if (isMember) {
          const groupData = groupDoc.data();
          joinedGroups.push({
            id: groupId,
            ...groupData,
            memberCount: membersSnapshot.size,
          });
        }
      }

      setGroups(joinedGroups);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchGroups(user.email);
      } else {
        alert("Please log in to view your study groups.");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Study Groups</h1>
      {groups.length === 0 ? (
        <p className="text-gray-600">You haven't joined any study groups yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <StudyGroupCard key={group.id} group={group} showJoinButton={false}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStudyGroupsPage;
