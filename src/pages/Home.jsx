import { useCalculateValues } from "../hooks/useCalculateValues.js";
import { useAuthValue } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";

const Home = () => {
  const { calculateExpenses, calculateBreakEvenPoint } = useCalculateValues();
  const { workValue, fixedExpenses } = useAuthValue();
  const [breakEvenPoint, setBreakEvenPoint] = useState(null);

  if (workValue[0]) {
    useEffect(() => {
      let breakEven = calculateBreakEvenPoint(workValue[0].salary);
      setBreakEvenPoint(breakEven)
    }, [workValue]);
  }

  return (
    <main>
      <section className="w-full mx-auto flex flex-col items-center py-12 rounded-lg h-[400px] bg-gray-100">
        <div className="max-w-[1450px] w-full h-[300px] rounded-lg bg-gray-200">
          <div className="flex flex-col gap-3">
          <h1 className="text- text-4xl md:text-5xl">Precificação</h1>
          <p className="text-lg md:text-xl">Aqui você terá um visão geral de todos os seus números.</p>
          </div>
          <div className="flex flex-wrap gap-5">
            <div className="py-3 px-5 bg-gray-50 rounded-lg">
              <h4 className="text-3xl font-medium text-slate-700">{breakEvenPoint}</h4>
              <p className="text-lg">Ponto de Equilíbrio</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;



