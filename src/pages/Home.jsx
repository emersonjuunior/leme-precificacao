import { useCalculateValues } from "../hooks/useCalculateValues.js";
import { useAuthValue } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import SetPrice from "../components/SetPrice.jsx";

const Home = () => {
  const { user, workValue, fixedExpenses, variableExpenses, services } =
    useAuthValue();
  const { calculateExpenses, calculateBreakEvenPoint, calculateServiceCost } =
    useCalculateValues();
  const [breakEvenPoint, setBreakEvenPoint] = useState(null);
  const totalFixedExpenses = calculateExpenses(fixedExpenses);
  const totalVariableExpenses = calculateExpenses(variableExpenses);
  const [priceModal, setPriceModal] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [serviceName, setServiceName] = useState(null);
  const [servicePrice, setServicePrice] = useState(null);

  if (workValue[0]) {
    useEffect(() => {
      let breakEven = calculateBreakEvenPoint(workValue[0].salary);
      setBreakEvenPoint(breakEven);
    }, [workValue]);
  }

  const togglePriceModal = (name, price, id) => {
    setServiceName(name);
    setServicePrice(price);
    setServiceId(id);
    setPriceModal((prev) => !prev);
  };

  return (
    <main>
      <section className="w-full mx-auto flex flex-col items-center py-4 md:px-8 px-4 rounded-lg">
        <div className="max-w-[1580px] w-full h-[300px] min-h-fit rounded-l mb-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl md:text-6xl font-medium mb-1">
              Precificação
            </h1>
            <p className="text-lg md:text-2xl mb-5">
              Aqui você terá um visão geral de todos os seus números.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[repeat(2,350px)] xl:grid-cols-[repeat(4,320px)] gap-4">
            <div className="py-4 px-5 bg-blue-200 rounded-lg flex items-center justify-around gap-5 h-[160px] w-[300px] shadow-md hover:scale-105 duration-300 cursor-pointer hover:shadow-lg">
              <div>
                <h4 className="text-3xl font-medium text-slate-700">
                  R$ {breakEvenPoint}
                </h4>
                <p className="text-lg">Ponto de Equilíbrio</p>
              </div>
              <div>
                <i className="fa-solid fa-scale-balanced text-5xl"></i>
              </div>
            </div>
            <div className="py-4 px-5 bg-blue-200 rounded-lg flex items-center justify-around gap-5 h-[160px] w-[300px] shadow-md hover:scale-105 duration-300 cursor-pointer hover:shadow-lg">
              <div>
                <h4 className="text-3xl font-medium text-slate-700">
                  R$ {workValue[0]?.workValue}
                </h4>
                <p className="text-lg">Hora de Trabalho</p>
              </div>
              <div>
                <i className="fa-solid fa-credit-card text-5xl"></i>
              </div>
            </div>
            <div className="py-4 px-5 bg-blue-200 rounded-lg flex items-center justify-around gap-5 h-[160px] w-[300px] shadow-md hover:scale-105 duration-300 cursor-pointer hover:shadow-lg">
              <div>
                <h4 className="text-3xl font-medium text-slate-700">
                  R$ {totalFixedExpenses}
                </h4>
                <p className="text-lg">Despesas Fixas</p>
              </div>
              <div>
                <i className="fa-solid fa-money-bill-wave text-5xl"></i>
              </div>
            </div>
            <div className="py-4 px-5 bg-blue-200 rounded-lg flex items-center justify-around gap-5 h-[160px] w-[300px] shadow-md hover:scale-105 duration-300 cursor-pointer hover:shadow-lg">
              <div>
                <h4 className="text-3xl font-medium text-slate-700">
                  {totalVariableExpenses}%
                </h4>
                <p className="text-lg">Despesas Variáveis</p>
              </div>
              <div>
                <i className="fa-solid fa-credit-card text-5xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[98%] h-[800px] mx-auto bg-gray-100 px-4 py-4">
        <div className="w-full">
          {services.map((service, index) => {
            const serviceCost = calculateServiceCost(service)
            return (
              <div key={index}>
                <div>
                  <h3 className="text-2xl font-medium text-slate-700">{service.name}</h3>
                </div>
                <div className="w-full flex items-center mb-5">
                <div className="flex-1 gap-2 flex flex-col md:flex-row items-center ">
                  <h4 className="font-medium text-lg">Preço Definido:</h4>
                  <p>{service.price ? service.price : "..."}</p>
                </div>
                <div className="flex-1 gap-2 flex flex-col md:flex-row items-center ">
                  <h4 className="font-medium text-lg">Custo Final:</h4>
                  <p>{serviceCost.toFixed(2)}</p>
                </div>
                <div className="flex-1 gap-2 flex flex-col md:flex-row items-center ">
                  <h4 className="font-medium text-lg">Preço Concorrência:</h4>
                  <p>{service.competitivePrice}</p>
                </div>
                <div className="flex-1 gap-2 flex flex-col md:flex-row items-center ">
                  <h4 className="font-medium text-lg">Preço desejado:</h4>
                  <p></p>
                </div>
                <button
                  onClick={() =>
                    togglePriceModal(service.name, service.price, service.id)
                  }
                  className="w-[200px] text-white bg-green-500 font-medium rounded-lg px-4 py-2 cursor-pointer hover:bg-green-600 hover:scale-105 duration-300"
                >
                  Definir Preço
                </button>
              </div>
              </div>
            )
          })}
        </div>
      </section>
      {priceModal && (
        <SetPrice
          togglePriceModal={togglePriceModal}
          serviceName={serviceName}
          servicePrice={servicePrice}
          serviceId={serviceId}
        />
      )}
    </main>
  );
};

export default Home;
