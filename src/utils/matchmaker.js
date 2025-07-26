import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../firebase/config"; // make sure this path is correct

const findMatch = async (currentUser) => {
  const userRef = collection(db, "users");

  const q = query(
    userRef,
    where("nativeLanguage", "==", currentUser.targetLanguage),
    where("targetLanguage", "==", currentUser.nativeLanguage)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const match = snapshot.docs[0].data();

    // Create a chatroom for the pair
    const room = await addDoc(collection(db, "chatrooms"), {
      users: [currentUser.uid, match.uid],
      createdAt: new Date().toISOString(),
    });

    return room.id; // you can redirect to `/chatroom/${room.id}`
  } else {
    console.log("No match found. Waiting for someone...");
    return null;
  }
};

export default findMatch;
