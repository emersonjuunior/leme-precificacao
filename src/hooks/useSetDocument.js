import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const useSetDocument = async (uid, subCol, data) => {
  try {
    const docRef = doc(db, "users", uid, subCol, "data"); // 'data' é apenas um ID fixo para o documento
    await setDoc(docRef, data);
  } catch (error) {}
};
