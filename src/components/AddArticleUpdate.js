// src/components/AddArticleUpdate.js
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const submitArticle = async (formData) => {
  try {
    const newArticle = {
      ...formData,
      timestamp: serverTimestamp(),
    };
    await addDoc(collection(db, "articles"), newArticle);
    return true;
  } catch (error) {
    console.error("Error adding article:", error);
    return false;
  }
};
