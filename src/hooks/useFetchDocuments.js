import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const useFetchDocuments = (uid) => {
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [variableExpenses, setVariableExpenses] = useState([]);
  const [workValue, setWorkValue] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fixedExpensesSnapshot = await getDocs(
          collection(db, "users", uid, "fixedExpenses")
        );
        const workValueSnapshot = await getDocs(
          collection(db, "users", uid, "workValue")
        );
        const variableExpensesSnapshot = await getDocs(
          collection(db, "users", uid, "variableExpenses")
        );
        const servicesSnapshot = await getDocs(
          collection(db, "users", uid, "services")
        );

        const fixedExpensesDocs = fixedExpensesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const workValueDocs = workValueSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const variableExpensesDocs = variableExpensesSnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() })
        );
        const servicesDocs = servicesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFixedExpenses(fixedExpensesDocs);
        setVariableExpenses(variableExpensesDocs);
        setWorkValue(workValueDocs);
        setServices(servicesDocs);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [uid]);

  return {
    fixedExpenses,
    variableExpenses,
    workValue,
    services,
    setFixedExpenses,
    setVariableExpenses,
    setWorkValue,
    setServices,
    loading,
    error,
  };
};
