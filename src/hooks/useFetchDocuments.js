import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const useFetchDocuments = (uid) => {
  const [documents, setDocuments] = useState({
    fixedExpenses: [],
    workValue: [],
    variableExpenses: [],
    jobs: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fixedExpensesSnapshot = await getDocs(collection(db, "users", uid, "fixedExpenses"));
        const workValueSnapshot = await getDocs(collection(db, "users", uid, "workValue"));
        const variableExpensesSnapshot = await getDocs(collection(db, "users", uid, "variableExpenses"));
        const servicesSnapshot = await getDocs(collection(db, "users", uid, "services"));
        
        const fixedExpensesDocs = fixedExpensesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const workValueDocs = workValueSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const variableExpensesDocs = variableExpensesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const servicesDocs = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setDocuments({
          fixedExpenses: fixedExpensesDocs,
          workValue: workValueDocs,
          variableExpenses: variableExpensesDocs,
          services: servicesDocs
        });
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [uid]);

  return { documents, loading, error };
};
