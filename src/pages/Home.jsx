const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div className="ml-4 bg-linear-180 from-slate-800 to-slate-900 w-[350px] h-[200px] rounded-xl flex items-center gap-6 shadow-lg border-slate-900 border-2">
        <div className="h-8/10 w-1 ml-4 rounded-md bg-linear-180 from-sky-400 to-indigo-800"></div>
        <div className="text-white flex flex-col gap-4 ">
          <h4 className="text-3xl">Aluguel</h4>
          <div className="flex items-end">
            <span className="text-lg">R$</span>
            <p className="text-4xl font-medium">300</p>
            <span className="text-lg">/mês</span>
          </div>
          <div className="flex w-full items-center gap-4">
                  <button
                    onClick={() =>
                      toggleUpdateModal(expense.id, expense.name, expense.value)
                    }
                    className=" px-4 py-2 bg-blue-500 text-zinc-700 rounded flex justify-around gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button
                    onClick={() => toggleDeleteModal(expense.id, expense.name)}
                    className="px-4 py-2 bg-red-700 text-zinc-700 rounded flex justify-around gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
