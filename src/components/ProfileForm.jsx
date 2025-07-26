import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const ProfileForm = () => {
  const auth = getAuth();
  const db = getFirestore();

  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    nativeLanguages: [],
    learningLanguages: [],
  });

  const user = auth.currentUser;

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setFormData(snap.data());
        }
      }
    };
    loadProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (name, value) => {
    setFormData({ ...formData, [name]: value.split(",").map((s) => s.trim()) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const ref = doc(db, "users", user.uid);
      await setDoc(ref, {
        ...formData,
        uid: user.uid,
        email: user.email,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      }, { merge: true });
      alert("✅ Profile saved!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>🧑‍💼 Edit Profile</h2>
      <input
        name="displayName"
        placeholder="Name"
        value={formData.displayName}
        onChange={handleChange}
      />
      <textarea
        name="bio"
        placeholder="Short bio"
        value={formData.bio}
        onChange={handleChange}
      />
      <input
        name="nativeLanguages"
        placeholder="Native Languages (comma separated)"
        value={formData.nativeLanguages.join(", ")}
        onChange={(e) => handleArrayChange("nativeLanguages", e.target.value)}
      />
      <input
        name="learningLanguages"
        placeholder="Learning Languages (comma separated)"
        value={formData.learningLanguages.join(", ")}
        onChange={(e) => handleArrayChange("learningLanguages", e.target.value)}
      />
      <button type="submit">💾 Save Profile</button>
    </form>
  );
};

export default ProfileForm;
