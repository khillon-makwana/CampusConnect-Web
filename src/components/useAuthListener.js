// src/hooks/useAuthListener.js
import { useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function useAuthListener(setUserEmail) {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        if (setUserEmail) setUserEmail(user.email);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate, setUserEmail]);
}
