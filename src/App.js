import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import AuthForm from "./components/AuthForm";
import Onboarding from "./pages/Onboarding";

// Firebase test (optional - remove after testing)
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase/config"; // clean import from config.js
import ChatRoom from "./pages/ChatRoom"; 
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Waiting from "./pages/Waiting";
import findMatch from "./utils/matchmaker";
import WaitingRoom from "./pages/WaitingRoom";
import Chatroom from "./pages/ChatRoom";
function App() {
  // 🔹 Optional Firestore test (can be removed later)
  useEffect(() => {
    const testFirestore = async () => {
      try {
        await setDoc(doc(db, "test", "ping"), {
          ok: true,
          timestamp: new Date().toISOString(),
        });
        console.log("✅ Firestore write test passed!");
      } catch (error) {
        console.error("❌ Firestore write failed:", error);
      }
    };

    testFirestore();
  }, []);

  return (
    <BrowserRouter>
    <Navbar /> 
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route
          path="/onboarding"
          element={
            <PrivateRoute>
              <Onboarding />
            </PrivateRoute>
          }
        />
        <Route
          path="/chatroom"
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          }
        />
        
        <Route path="/waiting" element={<WaitingRoom />} />
        <Route path="/chatroom/:roomId" element={<Chatroom />} />

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
