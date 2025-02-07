import { useState } from "react";

const ServiceSecondStep = ({materials, setMaterials}) => {
  const [materialName, setMaterialName] = useState("");
  const [value, setValue] = useState("");
  const [quantityServices, setQuantityServices] = useState("");
  const [alert, setAlert] = useState(false);

  const handleClick = () => {
    if (materialName === "" || value === "" || quantityServices === "") {
      setAlert(true);
      return;
    } else {
      setAlert(false);
    }

    const newMaterial = {
      materialName,
      value,
      quantityServices,
    };

    setMaterials((prev) => [...prev, newMaterial]);

    setMaterialName("");
    setValue("");
    setQuantityServices("");
  };

  const deleteMaterial = (name) => {
    setMaterials(prev => prev.filter(material => material.materialName != name))
  }

  return (
    <div>
      <div className="px-8">
        {" "}
        <p className="text-zinc-900 mb-2">
          Preencha abaixo os materiais que você utiliza para a realização do
          serviço. Se o serviço não tiver nenhum material de custo, basta clicar
          em "Concluir".
        </p>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-4">
            <label className="flex flex-col flex-1">
              <span className="text-sm">Nome</span>
              <input
                className="border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                type="text"
                onChange={(e) => setMaterialName(e.target.value)}
                value={materialName}
              />
            </label>
            <label className="flex flex-col flex-1">
              <span className="text-sm">Preço</span>
              <input
                className=" border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                type="number"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </label>
          </div>
          <div className="flex gap-4 mb-6">
            <label className="flex flex-col flex-1">
              <span className="text-sm">Quantidade de serviços</span>
              <input
                className=" border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
                type="number"
                onChange={(e) => setQuantityServices(e.target.value)}
                value={quantityServices}
              />
            </label>
            <div className="flex-1 flex items-end">
              <button
                type="button"
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-400 duration-300 cursor-pointer hover:scale-105 text-white rounded-lg px-4 py-2 h-8 flex gap-2 items-center justify-center"
              >
                <i className="fa-solid fa-plus text-lg font-bold"></i>
                Adicionar material
              </button>
            </div>
          </div>
        </div>
        {alert && (
          <p className="text-red-400">
            Por favor, preencha todas as informações!
          </p>
        )}
        {materials.length > 0 && (
          <>
            <h3 className="mb-2 text-lg font-medium">Materiais Cadastrados</h3>
            <div className="flex w-full gap-4 flex-wrap max-h-[70px] overflow-auto">
              {materials.map((material, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg w-[150px] h-[30px] flex items-center justify-center relative"
                >
                  <i
                    className="fa-solid fa-x text-[10px] absolute cursor-pointer top-1 right-2"
                    onClick={() => deleteMaterial(material.materialName)}
                  ></i>
                  <p>{material.materialName}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceSecondStep;
