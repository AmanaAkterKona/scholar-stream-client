import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { AuthContext } from "./AuthContextes";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // 🔥 Main Logic
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseUser(currentUser);

      if (currentUser) {
        try {
          // ✅ Check role from backend
          const res = await axios.get(
            `https://scholar-stream-server-alpha.vercel.app/users/role?email=${currentUser.email}`
          );

          let role = "student"; // default role

          // ✅ যদি user MongoDB তে না থাকে, তাহলে save করো
          if (!res.data || !res.data.role) {
            await axios.post(
              "https://scholar-stream-server-alpha.vercel.app/users",
              {
                name: currentUser.displayName || "No Name",
                email: currentUser.email,
                photoURL: currentUser.photoURL || "",
                role: "student",
              }
            );
          } else {
            role = (res.data.role || "student").toLowerCase();
          }

          // ✅ Set user with role
          setUser({
            ...currentUser,
            name: currentUser.displayName || "No Name",
            role,
          });
        } catch (error) {
          console.error("Role fetch error:", error);

          // ✅ Fallback: MongoDB তে user save করার চেষ্টা করো
          try {
            await axios.post(
              "https://scholar-stream-server-alpha.vercel.app/users",
              {
                name: currentUser.displayName || "No Name",
                email: currentUser.email,
                photoURL: currentUser.photoURL || "",
                role: "student",
              }
            );

            setUser({
              ...currentUser,
              name: currentUser.displayName || "No Name",
              role: "student",
            });
          } catch (err) {
            console.error("Failed to save user in DB:", err);
            setUser({
              ...currentUser,
              name: currentUser.displayName || "No Name",
              role: "student",
            });
          }
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    firebaseUser,
    loading,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
