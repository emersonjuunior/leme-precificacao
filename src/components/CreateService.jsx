import { useState } from "react";
import ServiceSecondStep from "./ServiceSecondStep";
import { useAuthValue } from "../context/AuthContext";
import { useAddDocument } from "../hooks/useAddDocument";

const CreateService = ({ toggleCreateService, showNotification }) => {
  const { user, setServices } = useAuthValue();
  const [materials, setMaterials] = useState([]);
  const [newService, setNewService] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [competitivePrice, setCompetitivePrice] = useState("");
  const [step, setStep] = useState("1");

  const handleFirstStep = (e) => {
    e.preventDefault();
    setStep("2");

    let serviceId = crypto.randomUUID();
    setId(serviceId);
    setNewService({
      name,
      time,
      competitivePrice,
      id: serviceId,
      createdAt: new Date(),
    });
  };

  const handleSecondStep = async () => {
    let service = {
      ...newService,
    };
    if (materials.length > 0) {
      service = {
        ...newService,
        materials: [...materials],
      };
    }

    setServices((prev) => [service, ...prev]);
    await useAddDocument(user.uid, "services", service, id);
    toggleCreateService();
    showNotification("Serviço adicionado com sucesso.");
    setNewService(null);
  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-30">
      <div className="bg-gray-50 w-full max-w-[650px] mx-2 rounded-lg">
        <div className="bg-slate-500 text-white w-full relative px-8 h-[120px] flex flex-col justify-center mb-6 rounded-t-lg shadow-md">
          <h2 className="text-4xl font-medium mb-3">Novo Serviço</h2>
          <div className="flex justify-between md:justify-start md:items-center gap-2">
            <div
              className={`flex items-center gap-2 ${
                step == 1 ? "font-medium text-[17px]" : ""
              }`}
            >
              <span
                className={`bg-slate-800 rounded-full ${
                  step == 1 ? "px-3 py-1" : "px-[9px] py-1"
                }`}
              >
                {step == 1 ? (
                  "1"
                ) : (
                  <i className="fa-solid fa-check text-sm"></i>
                )}
              </span>
              <p>Informações do serviço</p>
            </div>
            <div className="bg-gray-100 w-15 h-[2px] hidden md:block"></div>
            <div
              className={`flex items-center gap-2 ${
                step == 2 ? "font-medium text-[17px]" : ""
              }`}
            >
              <span
                className={`bg-slate-800 rounded-full ${
                  step == 2 ? "px-3 py-1" : "px-3 py-1"
                }`}
              >
                2
              </span>
              <p>Materiais de Custo</p>
            </div>
          </div>
          <i
            className="fa-solid fa-x absolute cursor-pointer top-3 right-3"
            onClick={toggleCreateService}
          ></i>
        </div>
        <form
          className="flex flex-col gap-4 w-full justify-center"
          onSubmit={handleFirstStep}
        >
          {step == 1 ? (
            <div className="flex flex-col gap-4 w-full justify-center px-8">
              <p className="text-lg text-zinc-900">
                Preencha abaixo o{" "}
                <span className="font-medium">nome do serviço</span> e o{" "}
                <span className="font-medium">tempo médio</span>, em minutos,
                para a realização dele.
              </p>
              <label className="flex flex-col">
                <span className="text-[17px]">Nome</span>
                <input
                  className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="text-[17px]">Tempo Médio (min)</span>
                <input
                  className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                  type="number"
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                  required
                />
              </label>
              <label className="flex flex-col mb-6">
                <span className="text-[17px]">Preço da Concorrência</span>
                <input
                  className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                  type="number"
                  onChange={(e) => setCompetitivePrice(e.target.value)}
                  value={competitivePrice}
                  required
                />
              </label>
            </div>
          ) : (
            <ServiceSecondStep
              materials={materials}
              setMaterials={setMaterials}
            />
          )}
          <div className="flex items-center justify-end gap-4 bg-gray-100 rounded-b-lg border-gray-200 border-t-1 w-full px-8 py-5">
            <button
              onClick={toggleCreateService}
              className="px-4 py-1 rounded-lg cursor-pointer"
            >
              Cancelar
            </button>
            {step == 1 ? (
              <button
                type="submit"
                className="bg-[#3aa856] hover:bg-[#3abF56] duration-300 cursor-pointer hover:scale-105 text-white rounded-lg px-4 py-2 w-[200px] md:w-[220px]"
              >
                Próximo
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSecondStep}
                className="bg-[#3aa856] hover:bg-[#3abF56] duration-300 cursor-pointer hover:scale-105 text-white rounded-lg px-4 py-2 w-[200px] md:w-[220px]"
              >
                Concluir
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateService;
