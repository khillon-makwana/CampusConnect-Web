// src/components/AddStudyGroupUpdate.js
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const submitStudyGroup = async (groupData) => {
  try {
    const docRef = await addDoc(collection(db, "studyGroups"), {
      ...groupData,
      timestamp: serverTimestamp(),
    });
    console.log("Study group added with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding study group:", error);
    return false;
  }
};
