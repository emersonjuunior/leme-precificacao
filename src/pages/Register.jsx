import { Link } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useState, useEffect } from "react";
import Error from "../components/Error";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerCode, setRegisterCode] = useState("");
  const [error, setError] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const code = "123";

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      displayName,
      email,
      password,
    };

    if (registerCode != code) {
      setError("Código de Cadastro incorreto.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter ao menos 6 caracteres.");
      return;
    }

    const res = await createUser(user);

    setDisplayName("");
    setEmail("");
    setPassword("");
    setRegisterCode("");
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <main className="flex items-center justify-center mx-auto w-full px-2">
      <div className="hidden md:block shadow-lg w-[450px] h-[550px] md:h-[640px] bg-[url(/banner-register.png)] bg-no-repeat bg-cover bg-center "></div>
      <div className="shadow-lg flex items-center justify-center text-zinc-800 h-full w-full max-w-[650px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center bg-slate-300 h-[550px] md:h-[640px] w-full px-10"
        >
          <h2 className="text-5xl text-center font-bold mb-2">Cadastro</h2>
          <div className="flex flex-col gap-4 w-full items-center justify-center mx-auto">
            <label className="flex flex-col gap-2">
              <span>Nome</span>
              <input
                className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                type="text"
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Email</span>
              <input
                className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Senha</span>
              <div className="relative flex items-center justify-between w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none bg-slate-100">
                <input
                  className="px-2 py-1 w-full input rounded pr-10"
                  type={viewPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <i
                onClick={() => setViewPassword(prev => !prev)}
                className={`fa-solid absolute right-2 z-10 text-lg cursor-pointer text-zinc-800 ${viewPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <span>Código de Cadastro</span>
              <input
                className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                type="text"
                onChange={(e) => setRegisterCode(e.target.value)}
                value={registerCode}
              />
            </label>
            <button
              type="submit"
              className="mb-6 px-7 py-2 w-[280px] md:w-[350px] bg-linear-to-r from-blue-400 to-sky-600 text-white text-lg cursor-pointer font-medium rounded-lg hover:scale-105 hover:shadow-lg duration-300"
            >
              Cadastrar
            </button>
          </div>
          <p className="text-center">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-sky-700 font-medium cursor-pointer hover:text-sky-600 duration-200"
            >
              Entrar
            </Link>
          </p>
          {error && <Error error={error} />}
        </form>
      </div>
    </main>
  );
};

export default Register;
