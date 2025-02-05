const CommonExpenses = ({ toggleCommonExpensesModal, setCommonExpense, setCreateModal }) => {
  const commonFixedExpenses = [
    "Aluguel",
    "Condomínio",
    "Internet",
    "Energia elétrica",
    "Água",
    "Gás",
    "Plano de saúde",
    "Seguro do carro",
    "Financiamento do carro",
    "Mensalidade escolar",
    "Netflix",
    "Telefone/celular",
    "Academia",
    "Transporte público",
  ];

  const handleClick = (value) => {
    setCommonExpense(value)
    toggleCommonExpensesModal()
    setCreateModal(true)
  }

  return (
    <div className="w-full h-full inset-0 bg-black/30 border-2 fixed flex justify-center items-center z-30">
      <div className="bg-gray-50 w-full max-w-4xl px-4 py-2 relative">
      <i
          className="fa-solid fa-x absolute right-4 cursor-pointer"
          onClick={toggleCommonExpensesModal}
        ></i>
        <h2>Despesas fixas comuns</h2>
        <ul className="w-4/10">
          {commonFixedExpenses.map((expense, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <li>{expense}</li>
              <button
              onClick={() => handleClick(expense)}
              className="bg-[#3aa856] border-[#34974d] text-white px-3 py-1 rounded hover:bg-[#3abF56] duration-300 cursor-pointer hover:scale-105">
                Adicionar
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommonExpenses;
