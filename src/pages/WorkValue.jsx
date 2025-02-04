import Checkbox from "../components/Checkbox";
import { useState } from "react";
import { useSetDocument } from "../hooks/useSetDocument";
import { useAuthValue } from "../context/AuthContext";

const WorkValue = () => {
  const { user } = useAuthValue();
  const [salary, setSalary] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [additional, setAdditional] = useState(false);

  const toggleCheckbox = () => {
    setAdditional((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let value = salary / days / hours;
    if (additional) {
      value = (value * 1.09).toFixed(2);
    }

    const workValue = {
      salary,
      days,
      hours,
      additional,
      workValue: value,
      createdAt: new Date(),
    };

    useSetDocument(user.uid, "workValue", workValue);

    setSalary("");
    setDays("");
    setHours("");
    setAdditional(false);
  };

  return (
    <section className="w-full flex justify-center">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <span>Salário desejado</span>

          <input
            className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
            type="number"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
            required
          />
        </label>
        <label className="flex flex-col">
          <span>Dias trabalhados (mês)</span>
          <input
            className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
            type="number"
            onChange={(e) => setDays(e.target.value)}
            value={days}
            required
          />
        </label>
        <label className="flex flex-col">
          <span>Horas trabalhadas (dia)</span>
          <input
            className="w-[280px] md:w-[350px] border-[1.5px] border-slate-300 focus:border-b-sky-600 focus:border-b-2 rounded h-8 outline-none px-2 py-1 bg-slate-100"
            type="number"
            onChange={(e) => setHours(e.target.value)}
            value={hours}
            required
          />
        </label>
        <Checkbox
          text={"Adicional de 9% para férias?"}
          toggleCheckbox={toggleCheckbox}
          additional={additional}
        />
        <button
          type="submit"
          className="mb-6 px-7 py-2 w-[280px] md:w-[350px] bg-linear-to-r from-purple-500 to-purple-600 text-white text-lg cursor-pointer font-medium rounded-lg hover:scale-105 hover:shadow-lg duration-300"
        >
          Calcular
        </button>
      </form>
    </section>
  );
};

export default WorkValue;
