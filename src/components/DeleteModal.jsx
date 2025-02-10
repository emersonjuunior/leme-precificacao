import { useState } from "react";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import { useAuthValue } from "../context/AuthContext";

const DeleteModal = ({
  type,
  toggleDeleteModal,
  id,
  name,
  showNotification,
}) => {
  const { user } = useAuthValue();
  const { setFixedExpenses, setVariableExpenses, setServices } = useAuthValue();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "fixedExpenses") {
      setFixedExpenses((prev) => prev.filter((expense) => expense.id != id));
    } else if (type === "variableExpenses") {
      setVariableExpenses((prev) => prev.filter((expense) => expense.id != id));
    } else {
      setServices((prev) => prev.filter((expense) => expense.id != id));
    }

    toggleDeleteModal();
    useDeleteDocument(user.uid, type, id);
    showNotification(
      `${
        type === "services"
          ? "Serviço apagado com sucesso."
          : "Despesa apagada com sucesso."
      }`
    );
  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 border-2 fixed flex justify-center items-center z-30">
      <div className="bg-gray-50 w-fit max-w-[650px] mx-2 rounded-lg px-12 py-6 relative">
        <i
          className="fa-solid fa-x absolute right-4 cursor-pointer"
          onClick={toggleDeleteModal}
        ></i>
        <h2 className="text-4xl font-medium text-slate-700 my-5">
          Apagar {type === "services" ? "Serviço" : "Despesa"}
        </h2>
        <p className={type === "services" ? "mb-4 truncate" : "mb-8 truncate"}>
          Tem certeza que deseja apagar {""}
          {type === "services" ? "o serviço" : "a despesa"} {""}
          <span className="font-bold">{name}</span>?
        </p>
        {type === "services" && (
          <div className="px-8 py-2 flex justify-center rounded items-center border-red-300 border-1 bg-rose-200 text-red-800 w-fit mb-4">
            <p>
              <i className="fa-solid fa-warning mr-2"></i>Essa ação apaga todos os
              materiais relacionados ao serviço.
            </p>
          </div>
        )}
        <form
          className="flex flex-col gap-4 w-full mx-auto justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 duration-300 cursor-pointer hover:scale-105 text-white rounded-lg px-4 py-2 w-[280px] md:w-[350px]"
            >
              Apagar {type === "services" ? "serviço" : "despesa"}
            </button>
            <button
              onClick={toggleDeleteModal}
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

export default DeleteModal;
