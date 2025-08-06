// src/pages/WaitingRoom.jsx
import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const checkForMatch = async () => {
      const chatroomRef = collection(db, "chatrooms");
      const q = query(chatroomRef, where("users", "array-contains", user.uid));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const roomId = snapshot.docs[0].id;
        navigate(`/chatroom/${roomId}`);
      }
    };

    const interval = setInterval(checkForMatch, 5000); // check every 5 seconds
    return () => clearInterval(interval);
  }, [user, navigate]);

  return <h2>⏳ Waiting for a match...</h2>;
};

export default WaitingRoom;
