import { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";

const RecoverPassword = ({ setRecoverPasswordModal, showNotification }) => {
  const [email, setEmail] = useState("");
  const { loading, recoverPassword } = useAuthentication();

  const handleSubmit = (e) => {
    e.preventDefault();

    recoverPassword(email);
    showNotification(
      "Se o email estiver cadastrado, você receberá um link para redefinir sua senha. 🔑"
    );
    setRecoverPasswordModal(false);
    setEmail("");
  };
  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-30">
      <div className="bg-slate-300 text-zinc-800 w-full max-w-[550px] mx-2 rounded-lg relative">
        <i
          className="fa-solid fa-xmark absolute text-2xl right-4 top-4 cursor-pointer"
          onClick={() => setRecoverPasswordModal(false)}
        ></i>
        <form
          className="flex flex-col gap-3 px-7 py-10"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-medium mb-3">
              Recuperar senha
            </h2>
            <p className="text-lg">
              Digite o seu{" "}
              <span className="text-accentBlue font-medium">e-mail</span> para
              receber o link de{" "}
              <span className="text-accentBlue font-medium">
                recuperação de senha
              </span>
              . 📩
            </p>
          </div>
          <label>
            <input
              className="w-full border-[1.5px] h-[35px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded outline-none px-2 py-1 bg-slate-100"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </label>

          <button
            type="submit"
            className={`text-lg font-medium py-2 rounded-lg duration-200 hover:bg-[#1852f2] text-white shadow-md ${
              loading
                ? "cursor-not-allowed opacity-90 bg-[#1852f2]"
                : "bg-[#1877F2] cursor-pointer"
            }`}
          >
            Enviar email
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
