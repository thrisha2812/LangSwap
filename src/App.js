import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import AuthForm from "./components/AuthForm";
import Onboarding from "./pages/Onboarding";

// Firebase test (optional - remove after testing)
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase/config"; // clean import from config.js

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
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
