import { db } from "../firebase/firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";

export const useAddDocument = async (uid, col, data, id) => {
  try {
    const userDocRef = doc(db, "users", uid);  
    const collectionRef = collection(userDocRef, col);   
   
    const docRef = doc(collectionRef, id);  
    await setDoc(docRef, data);  

  } catch (error) {
  }

};
