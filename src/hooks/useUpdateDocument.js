import { db } from "../firebase/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

export const useUpdateDocument = async (uid, col, docId, data) => {
  try {
    const docRef = doc(db, "users", uid, col, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.log(error)
  }
};
