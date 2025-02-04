const AddButton = () => {
  return (
    <button
      type="button"
      className="group relative w-[220px] h-[45px] cursor-pointer flex items-center border border-[#34974d] bg-[#3aa856] transition-all duration-300 hover:bg-[#34974d] active:border-[#2e8644]"
    >
      <span className="transform translate-x-[30px] text-white font-semibold transition-all duration-300 group-hover:text-transparent">
        Adicionar Despesa
      </span>
      <span className="absolute transform translate-x-[179px] h-full w-[39px] bg-[#34974d] flex items-center justify-center transition-all duration-300 group-hover:w-[220px] group-hover:translate-x-0 active:bg-[#2e8644]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="w-[30px] stroke-white"
        >
          <line y2="19" y1="5" x2="12" x1="12"></line>
          <line y2="12" y1="12" x2="19" x1="5"></line>
        </svg>
      </span>
    </button>
  );
};

export default AddButton;
