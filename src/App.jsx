import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

// context
import { AuthContextProvider } from "./context/AuthContext";

// components
import Header from "./components/Header";

//pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import WorkValue from "./pages/WorkValue";
import FixedExpenses from "./pages/FixedExpenses";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const {auth} = useAuthentication();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <AuthContextProvider value={{user}}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={!user ? <Login/> : <Home/>}/>
            <Route path="/cadastro" element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/valor-trabalho" element={user ? <WorkValue /> : <Navigate to="/" />} />
            <Route path="/despesas-fixas" element={user ? <FixedExpenses /> : <Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
