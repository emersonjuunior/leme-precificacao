import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const useSetDocument = async (uid, subCol, data) => {
  try {
    const docRef = doc(db, "users", uid, subCol, "data"); 
    await setDoc(docRef, data);
  } catch (error) {
   
  }
};
