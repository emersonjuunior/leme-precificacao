import { Link } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import {useState, useEffect} from "react"
import Error from "../components/Error";

const Login = () => {

  const {login, error: authError, loading} = useAuthentication()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [viewPassword, setViewPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      email,
      password
    }

    const res = await login(user)

    setEmail("")
    setPassword("")
  }

  useEffect(() => {
    if(authError){
      setError(authError)
    }
  }, [authError])

  return (
    <main className="flex items-center justify-center mx-auto w-full max-w-[1100px] px-2">
      <div className="hidden md:block shadow-lg w-[450px] h-[550px] md:h-[640px] rounded-lg rounded-tr-none rounded-br-none bg-[url(/banner-register.png)] bg-no-repeat bg-cover bg-center"></div>
      <div className="shadow-lg flex items-center justify-center text-zinc-800 h-full w-full max-w-[650px]">
        <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center rounded-lg md:rounded-tl-none md:rounded-bl-none bg-slate-300 h-[550px] md:h-[640px] w-full px-10">
          <h2 className="text-5xl text-center font-bold mb-2">Login</h2>
          <div className="flex flex-col gap-4 w-full items-center justify-center mx-auto">
            <label className="flex flex-col gap-2">
              <span>Email</span>
              <input
                className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                type="text"
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
            <div className="w-[280px] md:w-[350px]">
              <Link to="/" className="text-zinc-700">
                Esqueceu sua{" "}
                <span className="text-sky-700 hover:text-sky-600 duration-200">
                  senha?
                </span>
              </Link>
            </div>
            <button
              type="submit"
              className="mb-6 px-7 py-2 w-[280px] md:w-[350px] bg-linear-to-r from-blue-400 to-sky-600 text-white text-lg cursor-pointer font-medium rounded-lg hover:scale-105 hover:shadow-lg duration-300"
            >
              Entrar
            </button>
          </div>
          <p className="text-center">
            Não tem uma conta?{" "}
            <Link
              to="/register"
              className="text-sky-700 font-medium cursor-pointer hover:text-sky-600 duration-200"
            >
              Cadastrar-se
            </Link>
          </p>
          {error && <Error error={error}/>}
        </form>
      </div>
    </main>
  );
};

export default Login;
