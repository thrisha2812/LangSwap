import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

function Chatroom() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "chatrooms", roomId, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || input.trim() === "") return;

    await addDoc(collection(db, "chatrooms", roomId, "messages"), {
      text: input,
      uid: user.uid,
      createdAt: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chatroom">
      <h2>🗣 Chatroom</h2>
      <div className="messages">
        {messages.map((msg, idx) => (
          <p key={idx} className={msg.uid === getAuth().currentUser?.uid ? "my-msg" : "other-msg"}>
            {msg.text}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatroom;
