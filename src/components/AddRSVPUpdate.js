// src/components/AddRSVPUpdate.js
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const submitRSVP = async (eventId, { name, phone, email }) => {
  try {
    const rsvpRef = collection(db, `events/${eventId}/rsvps`);
    await addDoc(rsvpRef, {
      name,
      phone,
      email,
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("RSVP Error:", error);
    return false;
  }
};
