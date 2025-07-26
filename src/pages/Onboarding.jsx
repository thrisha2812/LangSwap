import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
console.log("Current user:", auth.currentUser);

export default function Onboarding() {
  const [nativeLang, setNativeLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [fluency, setFluency] = useState("");
  const [timezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("You must be logged in.");

    try {
      await setDoc(doc(db, "users", user.uid), {
        nativeLang,
        targetLang,
        fluency,
        timezone,
        email: user.email,
        createdAt: new Date().toISOString(),
      });
      alert("Profile saved!");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">Tell us about your language goals:</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Your Native Language"
              value={nativeLang}
              onChange={(e) => setNativeLang(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Target Language"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={fluency}
              onChange={(e) => setFluency(e.target.value)}
              required
            >
              <option value="">Select fluency</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Fluent</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
