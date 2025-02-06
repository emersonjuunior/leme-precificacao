import { useState, useRef, useEffect } from "react";
import { useAddDocument } from "../hooks/useAddDocument";
import { useAuthValue } from "../context/AuthContext";

const CreateModal = ({ typeOfExpense, title, toggleCreateModal, commonExpense, showNotification }) => {
  const { user } = useAuthValue();
  const { fixedExpenses, setFixedExpenses, variableExpenses, setVariableExpenses } = useAuthValue();
  const [name, setName] = useState(commonExpense ? commonExpense : "");
  const [value, setValue] = useState("");
  const inputNameRef = useRef();
  const inputValueRef = useRef();

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  useEffect(() => {
    if (commonExpense && inputValueRef.current) {
      inputValueRef.current.focus();
    }
  }, [commonExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = crypto.randomUUID();
    const data = {
      name,
      value,
      id,
      createdAt: new Date(),
    };

    toggleCreateModal();
    if(typeOfExpense === "fixedExpenses"){
      setFixedExpenses((prev) => [data, ...prev]);
    } else {
      setVariableExpenses((prev) => [data, ...prev]);
    }
    await useAddDocument(user.uid, typeOfExpense, data, id);
    showNotification("Despesa adicionada com sucesso.")
  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-30">
      <div className="bg-gray-50 w-full max-w-[470px] mx-2 rounded-lg">
        <div className="bg-slate-500 text-white w-full relative px-8 h-[70px] flex items-center mb-6 rounded-t-lg shadow-md">
          <h2 className="text-4xl font-medium">{title}</h2>
          <i
            className="fa-solid fa-x absolute cursor-pointer top-3 right-3"
            onClick={toggleCreateModal}
          ></i>
        </div>
        <form
          className="flex flex-col gap-4 w-full mx-auto justify-center items-center"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col">
            <span className="text-lg">Nome</span>
            <input
              className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
              type="text"
              onChange={(e) => setName(e.target.value)}
              ref={inputNameRef}
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
              ref={inputValueRef}
              value={value}
              required
            />
          </label>
          <div className="w-full flex flex-col items-center justify-center gap-4 bg-gray-100 py-4 rounded-b-lg border-gray-200 border-t-1">
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
