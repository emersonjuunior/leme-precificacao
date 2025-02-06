const CommonExpenses = ({
  typeOfExpense,
  toggleCommonExpensesModal,
  setCommonExpense,
  setCreateModal,
}) => {
 
  let commonExpenses;

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

  const commonVariableExpenses = [
    "Taxa de cartão de crédito",
    "Comissão sobre vendas",
    "Juros de financiamento",
    "Taxa de transferência",
    "Taxa de parcelamento",
    "Impostos sobre serviços",
    "Multa por atraso"
  ];

  if(typeOfExpense === "fixedExpenses"){
    commonExpenses = commonFixedExpenses;
  } else {
    commonExpenses = commonVariableExpenses;
  }

  const handleClick = (value) => {
    setCommonExpense(value);
    toggleCommonExpensesModal();
    setCreateModal(true);
  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 border-2 fixed flex justify-center items-center z-30 px-2">
      <div className="bg-gray-50 w-full max-w-[650px] rounded-lg">
        <div className="bg-slate-500 text-white w-full relative px-6 h-[75px] flex items-center mb-6 rounded-t-lg shadow-md">
          <h2 className="text-3xl font-medium">Despesas fixas comuns</h2>
          <i
            className="fa-solid fa-x absolute cursor-pointer top-3 right-3"
            onClick={toggleCommonExpensesModal}
          ></i>
        </div>
        <ul className="w-full px-6 md:text-lg mb-4 max-h-[400px] overflow-auto">
          {commonExpenses.map((expense, index) => (
            <div key={index}>
            <div className="flex items-center justify-between flex-1">
              <li>{expense}</li>
              <button
                onClick={() => handleClick(expense)}
                className="bg-[#3aa856] border-[#34974d] text-white px-3 py-1 rounded hover:bg-[#3abF56] duration-300 cursor-pointer hover:scale-105"
              >
                Adicionar
              </button>
            </div>
            <div className="w-full h-[1px] bg-gray-200 mt-1 mb-2"></div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommonExpenses;
