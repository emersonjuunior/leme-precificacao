import { useAuthValue } from "../context/AuthContext";
import AddButton from "../components/AddButton";
import { useState } from "react";
import CreateService from "../components/CreateService";
import UpdateService from "../components/UpdateService.jsx";
import DeleteModal from "../components/DeleteModal";
import Success from "../components/Success";

const Services = () => {
  const { services, setServices } = useAuthValue();
  const [deleteModal, setDeleteModal] = useState(false);
  const [createService, setCreateService] = useState(false);
  const [updateService, setUpdateService] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [currentMaterials, setCurrentMaterials] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [serviceTime, setServiceTime] = useState(null);
  const [competitivePrice, setCompetitivePrice] = useState(null);
  const [notification, setNotification] = useState(false);
  const [msg, setMsg] = useState(null);

  const showNotification = (msg) => {
    setNotification(true);
    setMsg(msg);
    setTimeout(() => {
      setNotification(false);
    }, 2700);
  };

  const closeNotification = () => {
    setNotification(false);
  };

  const toggleCreateService = (id, name) => {
    setCurrentService(name);
    setServiceId(id);
    setCreateService((prev) => !prev);
  };

  const toggleUpdateService = (id, name, time, price, materials) => {
    setServiceId(id);
    setCurrentService(name);
    setServiceTime(time);
    setCompetitivePrice(price);
    setCurrentMaterials(materials ? [...materials] : []);
    setUpdateService((prev) => !prev);
  };

  const toggleDeleteModal = (id, name) => {
    setServiceId(id);
    setCurrentService(name);
    setDeleteModal((prev) => !prev);
  };

  return (
    <main className="md:px-4 mb-10">
      <div className="relative w-full max-w-[1450px] bg-gray-200 mx-auto text-zinc-700 md:min-h-[700px] min-h-[400px] rounded-lg shadow-lg">
        <div className="px-6 md:px-14 pt-6 bg-gray-300 flex flex-col justify-center rounded-t-lg">
          <h1 className="text-5xl mb-5 font-medium">Meus Serviços</h1>
          <div className="flex flex-wrap gap-5 md:gap-8 items-center mb-8">
            <div onClick={toggleCreateService}>
              <AddButton text={"Adicionar Serviço"} />
            </div>
          </div>
        </div>
        {services && services.length === 0 ? (
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
            {services &&
              services.map((service, index) => (
                <div
                  key={index}
                  className="bg-linear-180 from-slate-300 to-slate-300 text-zinc-700 w-[310px] h-[210px] lg:w-[420px] lg:h-[260px] rounded-xl flex items-center justify-start gap-6 shadow-lg"
                >
                  <div className="h-8/10 min-w-1 ml-4 rounded-md bg-linear-180 from-sky-400 to-indigo-800"></div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-3xl md:text-4xl font-medium lg:w-[360px] w-[270px] truncate">
                      {service.name}
                    </h4>
                    <div className="flex items-end">
                      <p className="text-3xl font-medium mr-1">
                        {service.time}
                      </p>
                      <span className="text-lg">minutos</span>
                    </div>
                    {service.materials?.length && (
                      <div className="truncate lg:w-[360px] w-[270px]">
                        <h4 className="text-2xl font-medium inline">
                          Materiais:
                        </h4>{" "}
                        {service.materials.map((material, index) => (
                          <span key={index} className="text-lg">
                            {material.materialName}
                            {index === service.materials.length - 1 ? "" : ", "}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex w-full items-center gap-4">
                      <button
                        onClick={() =>
                          toggleUpdateService(
                            service.id,
                            service.name,
                            service.time,
                            service.competitivePrice,
                            service.materials
                          )
                        }
                        className=" px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-200 text-zinc-700 rounded flex justify-around gap-2 cursor-pointer"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                      <button
                        onClick={() =>
                          toggleDeleteModal(service.id, service.name)
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
        <CreateService
          toggleCreateService={toggleCreateService}
          showNotification={showNotification}
        />
      )}
      {deleteModal && (
        <DeleteModal
          type={"services"}
          toggleDeleteModal={toggleDeleteModal}
          id={serviceId}
          name={currentService}
          showNotification={showNotification}
        />
      )}
      {updateService && (
        <UpdateService
          toggleUpdateService={toggleUpdateService}
          id={serviceId}
          name={currentService}
          time={serviceTime}
          competitivePrice={competitivePrice}
          materials={currentMaterials}
          setMaterials={setCurrentMaterials}
          showNotification={showNotification}
        />
      )}
      {notification && (
        <Success msg={msg} closeNotification={closeNotification} />
      )}
    </main>
  );
};

export default Services;
