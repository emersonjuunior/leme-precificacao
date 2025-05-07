import AddButton from "../components/AddButton";
import CommonExpenses from "../components/CommonExpenses";
import CreateModal from "../components/CreateModal";
import DeleteModal from "../components/DeleteModal";
import UpdateModal from "../components/UpdateModal";
import Success from "../components/Success";
import { useState } from "react";
import { useAuthValue } from "../context/AuthContext";

const VariableExpenses = () => {
  const { variableExpenses, setVariableExpenses } = useAuthValue();
  const [commonExpensesModal, setCommonExpensesModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [notification, setNotification] = useState(false);
  const [msg, setMsg] = useState(null);
  const [expenseId, setExpenseId] = useState(null);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [expenseValue, setExpenseValue] = useState(null);
  const [commonExpense, setCommonExpense] = useState(null);

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

  const toggleCommonExpensesModal = () => {
    setCommonExpensesModal((prev) => !prev);
  };

  const toggleCreateModal = () => {
    setCreateModal((prev) => !prev);
    setCommonExpense(null);
  };

  const toggleDeleteModal = (id, name) => {
    setCurrentExpense(name);
    setExpenseId(id);
    setDeleteModal((prev) => !prev);
  };

  const toggleUpdateModal = (id, name, value) => {
    setCurrentExpense(name);
    setExpenseValue(value);
    setExpenseId(id);
    setUpdateModal((prev) => !prev);
  };

  return (
    <main className="md:px-4 mb-10">
      <section className="relative w-full max-w-[1400px] bg-gray-200 mx-auto text-zinc-700 md:min-h-[700px] min-h-[400px] rounded-lg shadow-lg">
        <div className="px-6 md:px-14 pt-6 bg-gray-300 flex flex-col justify-center rounded-t-lg">
          <h1 className="text-5xl mb-5 font-medium">Despesas Variáveis</h1>
          <div className="flex flex-wrap gap-5 md:gap-8 items-center mb-8">
            <div onClick={toggleCreateModal}>
              <AddButton text={"Adicionar Despesa"} />
            </div>
            <button
              onClick={toggleCommonExpensesModal}
              className="bg-blue-700 text-slate-50 font-medium px-3 py-2 rounded cursor-pointer flex gap-2 items-center justify-center hover:bg-blue-600 hover:scale-105 duration-300"
            >
              <i className="fa-solid fa-circle-info text-lg"></i>Despesas comuns
            </button>
          </div>
        </div>
        {variableExpenses.length === 0 ? (
          <div className="w-full flex items-center justify-center mb-2">
            <div className="flex items-center justify-center flex-col">
              <img
                src="/variable-expenses.png"
                alt="Ilustração despesas fixas"
                className="w-110"
              />
              <p className="text-slate-700 font-medium text-2xl max-w-[400px] text-center">
                Você ainda não tem nenhuma despesa variável cadastrada!
              </p>
            </div>
          </div>
        ) : (
          <div className="gap-2 lg:gap-4 flex flex-wrap px-6 py-4 md:px-14 md:py-8 min-h-[550px] max-h-[550px] overflow-auto pb-6">
            {variableExpenses.map((expense, index) => (
              <div
                key={index}
                className="bg-linear-180 from-slate-300 to-slate-300 text-zinc-700 w-[300px] h-[190px] lg:w-[380px] lg:h-[220px] rounded-xl flex items-center gap-6 shadow-lg"
              >
                <div className="h-8/10 min-w-1 ml-4 rounded-md bg-linear-180 from-sky-400 to-indigo-800"></div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-3xl md:text-4xl font-medium lg:w-[350px] w-[250px] truncate">
                    {expense.name}
                  </h4>
                  <div className="flex items-end lg:w-[330px] w-[230px] truncate">
                    <p className="text-3xl md:text-4xl font-medium mr-1">
                      {expense.value}%
                    </p>
                    <span className="text-lg">/mês</span>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <button
                      onClick={() =>
                        toggleUpdateModal(
                          expense.id,
                          expense.name,
                          expense.value
                        )
                      }
                      className=" px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-200 text-zinc-700 rounded flex justify-around gap-2 cursor-pointer"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      onClick={() =>
                        toggleDeleteModal(expense.id, expense.name)
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
      </section>
      {commonExpensesModal && (
        <CommonExpenses
          typeOfExpense={"variableExpenses"}
          toggleCommonExpensesModal={toggleCommonExpensesModal}
          setCommonExpense={setCommonExpense}
          setCreateModal={setCreateModal}
        />
      )}
      {createModal && (
        <CreateModal
          typeOfExpense={"variableExpenses"}
          title={"Nova despesa variável"}
          toggleCreateModal={toggleCreateModal}
          commonExpense={commonExpense}
          showNotification={showNotification}
        />
      )}
      {deleteModal && (
        <DeleteModal
          type={"variableExpenses"}
          toggleDeleteModal={toggleDeleteModal}
          id={expenseId}
          name={currentExpense}
          showNotification={showNotification}
        />
      )}
      {updateModal && (
        <UpdateModal
          typeOfExpense={"variableExpenses"}
          toggleUpdateModal={toggleUpdateModal}
          expenseId={expenseId}
          currentExpense={currentExpense}
          expenseValue={expenseValue}
          showNotification={showNotification}
        />
      )}
      {notification && (
        <Success msg={msg} closeNotification={closeNotification} />
      )}
    </main>
  );
};

export default VariableExpenses;
