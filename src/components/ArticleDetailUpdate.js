// src/components/ArticleDetailUpdate.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchArticleById = async (id) => {
  try {
    const docRef = doc(db, "articles", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn("No article found for ID:", id);
      return null;
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};
