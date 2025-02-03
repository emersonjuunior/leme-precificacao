import AddButton from "../components/AddButton";
import CreateModal from "../components/CreateModal";
import { useState } from "react";

const FixedExpenses = () => {
  const [createModal, setCreateModal] = useState(false);

  const toggleCreateModal = () => {
    setCreateModal((prev) => !prev);
  };

  return (
    <section className="relative w-9/10 mx-auto bg-gray-200 text-zinc-700 md:min-h-[700px] min-h-[400px] rounded-lg shadow-lg px-6 py-4 md:px-14 md:py-8">
      <h1 className="text-5xl mb-5">Despesas Fixas</h1>
      <div className="flex gap-8 items-center mb-8">
        <div onClick={toggleCreateModal}>
          <AddButton />
        </div>
        <button className="bg-blue-700 text-slate-50 font-medium px-3 py-2 rounded cursor-pointer flex gap-2 items-center justify-center">
          <i className="fa-solid fa-circle-info text-lg"></i>Despesas comuns
        </button>
      </div>
      <div className="w-[250px] h-[250px] bg-gray-50  shadow-md rounded border-b-2 border-indigo-800 relative">
        <div className="w-full h-[60px] bg-linear-to-r from-indigo-600 to-indigo-900 flex items-center gap-4">
          <i className="fa-solid fa-credit-card ml-4 text-gray-50 text-4xl"></i>
          <p className="text-3xl text-white">Aluguel</p>
        </div>
        <div className="px-6 h-[190px] flex flex-col justify-center">
          <div className="flex items-end mb-10 ">
            <span className="text-lg">R$</span>
            <p className="text-5xl font-medium">300</p>
            <span className="text-lg">/mês</span>
          </div>
          <div className="flex w-full items-center gap-4">
            <button className=" px-4 py-2 bg-blue-500 text-zinc-700 rounded flex justify-around gap-2">
              <i className="fa-solid fa-pencil"></i>
            </button>
            <button className=" px-4 py-2 bg-red-700 text-zinc-700 rounded flex justify-around gap-2">
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <div
          className="size-14 bg-indigo-700 absolute right-0 bottom-0"
          style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%" }}
        ></div>
      </div>
      {createModal && <CreateModal title={"Nova despesa fixa"} toggleCreateModal={toggleCreateModal} />}
    </section>
  );
};

export default FixedExpenses;
