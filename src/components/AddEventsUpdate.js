// src/components/AddEventsUpdate.js
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const submitEvent = async (formData) => {
  const newEvent = {
    ...formData,
    timestamp: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, "events"), newEvent);
    alert("Event added successfully!");
  } catch (error) {
    console.error("Error adding event:", error);
    alert("Failed to add event. Please try again.");
  }
};
