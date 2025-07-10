// src/components/AddJobUpdate.js
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const postJob = async ({
  title,
  company,
  location,
  salary,
  type,
  description,
  skills,
  link,
}) => {
  const jobData = {
    title,
    company,
    location,
    salary,
    type,
    description,
    skills: skills ? skills.split(",").map((s) => s.trim()) : [],
    link,
    timestamp: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, "jobs"), jobData);
    return true;
  } catch (error) {
    console.error("Error adding job:", error);
    return false;
  }
};
