import Checkbox from "../components/Checkbox";
import { useState } from "react";
import { useSetDocument } from "../hooks/useSetDocument";
import { useAuthValue } from "../context/AuthContext";
import { Link } from "react-router-dom";

const WorkValue = () => {
  const {
    user,
    workValue: originalValue,
    setWorkValue: setOriginalValue,
  } = useAuthValue();
  const [workValue, setWorkValue] = useState(null);
  const [salary, setSalary] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [additional, setAdditional] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleCheckbox = () => {
    setAdditional((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let value = salary / days / hours;
    value = value.toFixed(2);
    if (additional) {
      value = (value * 1.09).toFixed(2);
    }

    setWorkValue(value);

    const workValue = {
      salary: additional ? salary * 1.09 : salary,
      days,
      hours,
      additional,
      workValue: value,
      createdAt: new Date(),
    };

    useSetDocument(user.uid, "workValue", workValue);
    setOriginalValue([workValue]);

    setSalary("");
    setDays("");
    setHours("");
    setAdditional(false);

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };

  return (
    <main className="w-full h-[600px] justify-center max-w-[1200px] mx-auto rounded-lg px-3">
      <section className="flex mb-5">
        <form
          className="flex relative flex-col gap-4 flex-1 justify-center items-center bg-gray-200 rounded-lg md:rounded-tr-none rounded-br-none"
          onSubmit={handleSubmit}
        >
          <h1 className="font-medium text-3xl border-b-2 border-purple-600 px-2">
            Valor da minha <span className="font-bold">Hora de Trabalho</span>
          </h1>
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
          {originalValue.length > 0 && (
            <div className="w-[280px] md:w-[350px] absolute bottom-1">
              <h2 className="text-xl font-medium left-0">
                Valor Atual:{" "}
                <span className="font-normal">
                  R$ {originalValue[0]?.workValue}
                </span>
              </h2>{" "}
            </div>
          )}

          {success && (
            <div className="flex items-center px-8 py-2 text-green-800 bg-green-100 border border-green-400 rounded-lg rounded-b-none animate-notification relative">
              <i className="fas fa-check-circle text-green-600 text-xl mr-2"></i>
              <span>O valor da sua hora de trabalho é: {workValue}</span>
              <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#05dd34] animate-timer-animation"></div>
            </div>
          )}
        </form>
        <div className="flex-1 items-center justify-center hidden md:flex rounded-lg rounded-tl-none rounded-bl-none bg-gray-200">
          <img
            src="/work-value-time.png"
            alt="Ilustração sobre o valor do trabalho"
            className="object-cover"
          />
        </div>
      </section>
      <div className="w-full flex justify-end">
        <Link to="/despesas-fixas">
          <button className="text-lg font-medium px-5 py-2 rounded-lg bg-linear-to-r from-blue-400 to-sky-600 text-white cursor-pointer">Despesas Fixas <i className="fa-solid fa-arrow-right"></i></button>
        </Link>
      </div>
    </main>
  );
};

export default WorkValue;
