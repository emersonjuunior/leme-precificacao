import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const useSetDocument = async (col, data, uid) => {
  try {
    await setDoc(doc(db, col, uid), data);
    console.log("deu certo");
  } catch (error) {
    console.log(error);
  }
};
