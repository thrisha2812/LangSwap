// src/pages/Chatroom.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const db = getFirestore();

const Chatroom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  // Load messages in real-time
  useEffect(() => {
    const messagesRef = collection(db, "chatrooms", roomId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [roomId]);

  // Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await addDoc(collection(db, "chatrooms", roomId, "messages"), {
        text: input,
        senderId: user.uid,
        timestamp: serverTimestamp(),
      });
      setInput(""); // clear input
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="chatroom-container">
      <div className="messages-box" style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.senderId === user?.uid ? "right" : "left",
              margin: "0.5rem 0",
            }}
          >
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="chat-form">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "80%", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatroom;
