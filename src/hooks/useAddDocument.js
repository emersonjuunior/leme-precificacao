import { db } from "../firebase/firebaseConfig";
import { collection, doc, addDoc } from "firebase/firestore";

export const useAddDocument = async (uid, col, data) => {
  try {
    const userDocRef = doc(db, "users", uid);

    const collectionRef = collection(userDocRef, col);

    const docRef = await addDoc(collectionRef, data);
  } catch (error) {
    setError("Algo deu errado, tente novamente mais tarde.");
  }
};
