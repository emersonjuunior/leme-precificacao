import { useState } from "react";
import { useSetDocument } from "../hooks/useSetDocument";
import { useAuthValue } from "../context/AuthContext";

const CreateModal = ({ title, toggleCreateModal }) => {
  const { user } = useAuthValue();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()

    useSetDocument("workValue", fixedExpenses, user.uid);
  }

  return (
    <div className="w-full h-full inset-0 bg-black/30 border-2 fixed flex justify-center items-center z-30">
      <div className="bg-gray-50 w-fit max-w-[650px] h-[400px] mx-2 rounded-lg px-12 pt-5 relative">
        <i
          className="fa-solid fa-x absolute right-4 cursor-pointer"
          onClick={toggleCreateModal}
        ></i>
        <h2 className="text-4xl font-medium text-slate-700 my-5">{title}</h2>
        <form className="flex flex-col gap-4 w-full mx-auto justify-center items-center">
          <label className="flex flex-col">
            <span className="text-lg">Nome</span>
            <input
              className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </label>
          <label className="flex flex-col mb-6">
            <span className="text-lg">Valor</span>
            <input
              className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
              type="number"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              required
            />
          </label>
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <button
              type="submit"
              className="bg-[#3aa856] hover:bg-[#3abF56] duration-300 cursor-pointer hover:scale-105 text-white rounded-lg px-4 py-2 w-[280px] md:w-[350px]"
            >
              Adicionar despesa
            </button>
            <button
              onClick={() => toggleCreateModal()}
              className="px-4 py-1 rounded-lg cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
