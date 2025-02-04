import { db } from "../firebase/firebaseConfig";
import {deleteDoc, doc} from "firebase/firestore"

export const useDeleteDocument = async (uid, col, docId) => {
    try {
        const docRef = doc(db, "users", uid, col, docId);
        await deleteDoc(docRef);
    } catch (error) {
    }
}