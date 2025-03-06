import { useState, useEffect, useRef } from "react";
import { useAuthValue } from "../context/AuthContext";
import { useUpdateDocument } from "../hooks/useUpdateDocument";

const SetPrice = ({
  togglePriceModal,
  serviceName,
  servicePrice,
  serviceId,
}) => {
  const { user, services, setServices } = useAuthValue();
  const [price, setPrice] = useState(servicePrice ? servicePrice : "");
  const inputPriceRef = useRef();

  useEffect(() => {
    inputPriceRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentService = services.find((service) => service.id === serviceId);

    if (!currentService) {
      return;
    }

    const updatedService = {
      ...currentService,
      price,
    };

    useUpdateDocument(user.uid, "services", serviceId, updatedService);

    setServices((prev) => prev.filter((service) => service.id !== serviceId));

    setServices((prev) => [...prev, updatedService]);

    togglePriceModal();
  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-30">
      <div className="bg-gray-50 w-full max-w-[550px] mx-2 rounded-lg">
        <div className="bg-slate-500 text-white w-full relative px-8 h-[70px] flex items-center mb-6 rounded-t-lg shadow-md">
          <h2 className="text-3xl font-medium truncate">
            Definir Preço: {serviceName}
          </h2>
          <i
            onClick={togglePriceModal}
            className="fa-solid fa-x absolute cursor-pointer top-3 right-3"
          ></i>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full mx-auto justify-center items-center"
        >
          <label className="flex flex-col mb-4">
            <span className="text-lg">Preço</span>
            <input
              className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
              ref={inputPriceRef}
            />
          </label>
          <div className="w-full flex flex-col items-center justify-center gap-4 bg-gray-100 py-4 rounded-b-lg border-gray-200 border-t-1">
            <button
              type="submit"
              className="bg-[#3aa856] hover:bg-[#3abF56] duration-300 cursor-pointer hover:scale-105 text-white rounded-lg px-4 py-2 w-[280px] md:w-[350px]"
            >
              Definir Preço
            </button>
            <button className="px-4 py-1 rounded-lg cursor-pointer">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetPrice;
