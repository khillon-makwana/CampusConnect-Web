// src/components/JoinStudyGroupUpdate.js
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp, setDoc } from "firebase/firestore";

export const submitJoinGroup = async (groupId, { name, phone, email }) => {
  try {
    const membersRef = collection(db, `studyGroups/${groupId}/members`);
    await setDoc(membersRef, {
      name,
      phone,
      email,
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Join failed:", error);
    return false;
  }
};
