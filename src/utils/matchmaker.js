import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const findMatch = async (currentUser) => {
  const userRef = collection(db, "users");
  const q = query(
    userRef,
    where("nativeLanguage", "==", currentUser.targetLanguage),
    where("targetLanguage", "==", currentUser.nativeLanguage)
  );

  const snapshot = await getDocs(q);
  console.log("🧾 Match query snapshot size:", snapshot.size);

  if (!snapshot.empty) {
    const matchedDoc = snapshot.docs[0];
    const match = matchedDoc.data();
    const matchUid = matchedDoc.id;

    const room = await addDoc(collection(db, "chatrooms"), {
      users: [currentUser.uid, matchUid],
      createdAt: new Date().toISOString(),
    });

    return room.id;
  } else {
    console.log("No match found. Waiting for someone...");
    return null;
  }
};

export default findMatch;
