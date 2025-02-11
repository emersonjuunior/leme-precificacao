import { useState } from "react";
import { useAuthValue } from "../context/AuthContext";
import { useUpdateDocument } from "../hooks/useUpdateDocument";

const UpdateService = ({
  toggleUpdateService,
  id,
  name,
  time,
  materials,
  setMaterials,
  showNotification,
}) => {
  const { user, setServices } = useAuthValue();
  const [serviceName, setServiceName] = useState(name);
  const [serviceTime, setServiceTime] = useState(time);

  const changeMaterial = (index, field, value) => {
    setMaterials((prevMaterials) =>
      prevMaterials.map((material, i) =>
        i === index ? { ...material, [field]: value } : material
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      createdAt: new Date(),
      name: serviceName,
      time: serviceTime,
      materials: [...materials],
    };

    useUpdateDocument(user.uid, "services", id, data);
    setServices((service) => service.filter((e) => e.id != id));
    setServices((prev) => [...prev, data]);
    toggleUpdateService();
    showNotification("Serviço editado com sucesso.");
  };

  const addMaterial = () => {
    setMaterials((prev) => [
      ...prev,
      { materialName: "", value: "", quantityServices: "" },
    ]);
  };

  const removeMaterial = (name) => {
    setMaterials((prev) =>
      prev.filter((material) => material.materialName != name)
    );
  };

  return (
    <div>
      <div className="w-full h-full inset-0 bg-black/30 border-2 fixed flex justify-center items-center z-30">
        <div className="bg-gray-50 w-full max-w-[650px] mx-2 rounded-lg">
          <div className="bg-slate-500 text-white w-full relative px-8 h-[70px] flex items-center mb-6 rounded-t-lg shadow-md">
            <h2 className="text-4xl font-medium truncate">
              Editar <span className="font-bold">{name}</span>
            </h2>
            <i
              onClick={toggleUpdateService}
              className="fa-solid fa-x absolute cursor-pointer top-3 right-3"
            ></i>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full mx-auto"
          >
            <div className="p-3">
              <h2 className="text-xl font-medium truncate">Serviço {name}</h2>
              <div className="flex w-full gap-4 mb-3">
                <label className="flex flex-1 flex-col">
                  <span>Nome</span>
                  <input
                    className="border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                  />
                </label>
                <label className="flex flex-1 flex-col">
                  <span>Tempo médio (min)</span>
                  <input
                    className="border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                    type="number"
                    value={serviceTime}
                    onChange={(e) => setServiceTime(e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="w-9/10 h-[1px] bg-gray-300 self-center mb-4"></div>
            {materials.length > 0 ? (
              <div className="bg-gray-200 max-h-[300px] overflow-auto">
                <h3 className="font-medium text-lg p-3">Materiais de Custo</h3>
                {materials.map((material, index) => (
                  <div key={index} className="p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">
                        Material {material.materialName}
                      </h4>
                      <button
                        type="button"
                        className="bg-red-500 text-gray-200 text-sm px-2 py-1 rounded cursor-pointer hover:bg-red-400 duration-300"
                        onClick={() => removeMaterial(material.materialName)}
                      >
                        Apagar material
                      </button>
                    </div>
                    <div className="flex w-full gap-4">
                      <label className="flex flex-col flex-1 mb-2">
                        <span className="text-sm">Nome</span>
                        <input
                          className="border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                          type="text"
                          value={material.materialName}
                          onChange={(e) =>
                            changeMaterial(
                              index,
                              "materialName",
                              e.target.value
                            )
                          }
                          required
                        />
                      </label>
                      <label className="flex flex-col flex-1">
                        <span className="text-sm">Preço</span>
                        <input
                          className=" border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                          type="number"
                          value={material.value}
                          onChange={(e) =>
                            changeMaterial(
                              index,
                              "value",
                              parseFloat(e.target.value)
                            )
                          }
                          required
                        />
                      </label>
                    </div>
                    <div className="flex w-full gap-4 mb-4">
                      <label className="flex flex-col flex-1">
                        <span className="text-sm">Quantidade de serviços</span>
                        <input
                          className=" border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                          type="number"
                          value={material.quantityServices}
                          onChange={(e) =>
                            changeMaterial(
                              index,
                              "quantityServices",
                              parseInt(e.target.value)
                            )
                          }
                          required
                        />
                      </label>
                      <div className="flex-1"></div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center items-center mb-3">
                  <button
                    type="button"
                    onClick={addMaterial}
                    className="bg-green-500 rounded-lg py-1 px-3 text-gray-50 cursor-pointer hover:bg-green-400 duration-200"
                  >
                    <i className="fa-solid fa-plus"></i> Novo Material
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex w-full justify-center flex-col items-center gap-2 mb-3">
                <p>No momento, você não tem nenhum <span className="font-medium">material de custo</span> relacionado a esse serviço.</p>
                <button
                  type="button"
                  onClick={addMaterial}
                  className="bg-green-500 rounded-lg py-1 px-3 text-gray-50 cursor-pointer hover:bg-green-400 duration-200"
                >
                  <i className="fa-solid fa-plus"></i> Novo Material
                </button>
              </div>
            )}
            <div className="flex items-center justify-end gap-4 bg-gray-100 rounded-b-lg border-gray-200 border-t-1 w-full px-8 py-5">
              <button
                onClick={toggleUpdateService}
                className="px-4 py-1 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 duration-300 cursor-pointer hover:scale-105 text-white rounded-lg px-4 py-2 w-[200px] md:w-[220px]"
              >
                Editar Serviço
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateService;
