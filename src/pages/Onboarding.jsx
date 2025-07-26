// src/pages/Onboarding.js
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import findMatch from "../utils/matchmaker";

const db = getFirestore();

function Onboarding() {
  const [name, setName] = useState("");
  const [nativeLang, setNativeLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return alert("You must be logged in");

  try {
    // Save user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      nativeLanguage: nativeLang,
      targetLanguage: targetLang,
      createdAt: serverTimestamp(),
    });

    // Now define currentUser object for matching
    const currentUser = {
      uid: user.uid,
      nativeLanguage: nativeLang,
      targetLanguage: targetLang,
    };

    // Try to find a match
    const roomId = await findMatch(currentUser);

    if (roomId) {
      navigate(`/chatroom/${roomId}`);
    } else {
      navigate("/waiting");
    }
  } catch (error) {
    console.error("❌ Failed to save profile or match:", error);
    alert("Error saving profile");
  }
};

  
    
  

  return (
    <form onSubmit={handleSubmit} className="onboarding-form">
      <h2>Complete Your Profile</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Native Language"
        value={nativeLang}
        onChange={(e) => setNativeLang(e.target.value)}
        required
      />
      <input
        placeholder="Target Language"
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        required
      />
      <button type="submit">Save & Start Chatting</button>
    </form>
  );
}

export default Onboarding;
