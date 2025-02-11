import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import { useFetchDocuments } from "./hooks/useFetchDocuments";

// context
import { AuthContextProvider } from "./context/AuthContext";

// components
import Header from "./components/Header";

// pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import WorkValue from "./pages/WorkValue";
import FixedExpenses from "./pages/FixedExpenses";
import VariableExpenses from "./pages/VariableExpenses";
import Services from "./pages/Services";

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { auth } = useAuthentication();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const {
    fixedExpenses,
    variableExpenses,
    workValue,
    services,
    setFixedExpenses,
    setVariableExpenses,
    setWorkValue,
    setServices,
    loading: documentsLoading,
    error,
  } = useFetchDocuments(user?.uid);

  if (authLoading || documentsLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen text-zinc-700 overflow-x-hidden">
      <AuthContextProvider
        value={{
          user,
          fixedExpenses,
          variableExpenses,
          workValue,
          services,
          setFixedExpenses,
          setVariableExpenses,
          setWorkValue,
          setServices,
        }}
      >
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={!user ? <Login /> : <Home />} />
            <Route
              path="/cadastro"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/valor-trabalho"
              element={user ? <WorkValue /> : <Navigate to="/" />}
            />
            <Route
              path="/despesas-fixas"
              element={user ? <FixedExpenses /> : <Navigate to="/" />}
            />
            <Route
              path="/despesas-variaveis"
              element={user ? <VariableExpenses /> : <Navigate to="/" />}
            />
            <Route
              path="/servicos"
              element={user ? <Services /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
