import { useAuthValue } from "../context/AuthContext";
import AddButton from "../components/AddButton";
import { useState } from "react";
import CreateService from "../components/CreateService";

const Services = () => {
  const { services, setServices } = useAuthValue();
  const [createService, setCreateService] = useState(false);

  const toggleCreateService = () => {
    setCreateService((prev) => !prev);
  };

  return (
    <main className="md:px-4 mb-10">
      <div className="relative w-full max-w-[1400px] bg-gray-200 mx-auto text-zinc-700 md:min-h-[700px] min-h-[400px] rounded-lg shadow-lg">
        <div className="px-6 md:px-14 pt-6 bg-gray-300 flex flex-col justify-center rounded-t-lg">
          <h1 className="text-5xl mb-5 font-medium">Meus Serviços</h1>
          <div className="flex flex-wrap gap-5 md:gap-8 items-center mb-8">
            <div onClick={toggleCreateService}>
              <AddButton text={"Adicionar Serviço"} />
            </div>
          </div>
        </div>
        {services.length === 0 ? (
          <div className="w-full flex items-center justify-center mb-2">
            <div className="flex items-center justify-center flex-col">
              <img
                src="/services.png"
                alt="Ilustração despesas fixas"
                className="w-110"
              />
              <p className="text-slate-700 font-medium text-2xl max-w-[400px] text-center">
                Você ainda não tem nenhum serviço cadastrado!
              </p>
            </div>
          </div>
        ) : (
          <div className="gap-2 lg:gap-4 flex flex-wrap px-6 py-4 md:px-14 md:py-8 min-h-[550px] max-h-[550px] overflow-auto pb-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-linear-180 from-slate-300 to-slate-300 text-zinc-700 w-[300px] h-[190px] lg:w-[380px] lg:h-[220px] rounded-xl flex items-center gap-6 shadow-lg"
              >
                <div className="h-8/10 w-1 ml-4 rounded-md bg-linear-180 from-sky-400 to-indigo-800"></div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-4xl font-medium">{service.name}</h4>
                  <div className="flex items-end">
                    <p className="text-4xl font-medium mr-1">
                      {service.value}%
                    </p>
                    <span className="text-lg">/mês</span>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <button
                      onClick={() =>
                        toggleUpdateModal(
                          service.id,
                          service.name,
                          service.value
                        )
                      }
                      className=" px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-200 text-zinc-700 rounded flex justify-around gap-2 cursor-pointer"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      onClick={() =>
                        toggleDeleteModal(expense.id, expense.name)
                      }
                      className="px-4 py-2 bg-red-700 hover:bg-red-800 transition-200 text-zinc-700 rounded flex justify-around gap-2 cursor-pointer"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {createService && (
        <CreateService toggleCreateService={toggleCreateService} />
      )}
    </main>
  );
};

export default Services;
