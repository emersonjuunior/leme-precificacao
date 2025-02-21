import { useCalculateValues } from "../hooks/useCalculateValues.js";
import { useAuthValue } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";

const Home = () => {
  const { user, workValue, fixedExpenses, variableExpenses, services } =
    useAuthValue();
  const { calculateExpenses, calculateBreakEvenPoint } = useCalculateValues();
  const [breakEvenPoint, setBreakEvenPoint] = useState(null);
  const totalFixedExpenses = calculateExpenses(fixedExpenses);
  const totalVariableExpenses = calculateExpenses(variableExpenses);

  if (workValue[0]) {
    useEffect(() => {
      let breakEven = calculateBreakEvenPoint(workValue[0].salary);
      setBreakEvenPoint(breakEven);
    }, [workValue]);
  }

  return (
    <main>
      <section className="w-full mx-auto flex flex-col items-center py-4 md:px-8 px-4 rounded-lg">
        <div className="max-w-[1450px] w-full h-[300px] min-h-fit rounded-l mb-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl md:text-6xl font-medium mb-1">
              Precificação
            </h1>
            <p className="text-lg md:text-2xl mb-5">
              Aqui você terá um visão geral de todos os seus números.
            </p>
          </div>
          <div className="flex flex-wrap gap-5">
            <div className="py-4 px-5 bg-blue-100 rounded-lg flex items-center justify-around gap-5 h-[160px] w-[300px] shadow-md hover:scale-105 duration-300 cursor-pointer hover:shadow-lg">
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
            <div className="py-4 px-5 bg-blue-100 rounded-lg flex items-center justify-around gap-5 h-[160px] w-[300px] shadow-md hover:scale-105 duration-300 cursor-pointer hover:shadow-lg">
              <div>
                <h4 className="text-3xl font-medium text-slate-700">
                  {services.length}
                </h4>
                <p className="text-lg">Serviços cadastrados</p>
              </div>
              <div>
                <i className="fa-solid fa-hammer text-5xl"></i>
              </div>
            </div>
            <div className="py-4 px-5 bg-blue-100 rounded-lg flex items-center justify-around gap-5 h-[160px] w-[300px] shadow-md hover:scale-105 duration-300 cursor-pointer hover:shadow-lg">
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
            <div className="py-4 px-5 bg-blue-100 rounded-lg flex items-center justify-around gap-5 h-[160px] w-[300px] shadow-md hover:scale-105 duration-300 cursor-pointer hover:shadow-lg">
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
      <section className="w-[98%] h-[800px] mx-auto bg-gray-100"></section>
    </main>
  );
};

export default Home;
