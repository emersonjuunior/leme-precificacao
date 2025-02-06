import { useState } from "react";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import { useAuthValue } from "../context/AuthContext";

const CreateModal = ({ toggleDeleteModal, expenseId, currentExpense }) => {
  const { user } = useAuthValue();
  const { fixedExpenses, setFixedExpenses } = useAuthValue();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFixedExpenses( prev => prev.filter(expense => expense.id != expenseId))
    toggleDeleteModal();
    useDeleteDocument(user.uid, "fixedExpenses", expenseId);
  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 border-2 fixed flex justify-center items-center z-30">
      <div className="bg-gray-50 w-fit max-w-[650px] h-[270px] mx-2 rounded-lg px-12 pt-5 relative">
        <i
          className="fa-solid fa-x absolute right-4 cursor-pointer"
          onClick={toggleDeleteModal}
        ></i>
        <h2 className="text-4xl font-medium text-slate-700 my-5">
          Apagar despesa
        </h2>
        <p className="mb-8">
          Tem certeza que deseja apagar a despesa <span className="font-bold">{currentExpense}</span>?
        </p>
        <form
          className="flex flex-col gap-4 w-full mx-auto justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 duration-300 cursor-pointer hover:scale-105 text-white rounded-lg px-4 py-2 w-[280px] md:w-[350px]"
            >
              Apagar despesa
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

export default CreateModal;
