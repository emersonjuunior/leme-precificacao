const Checkbox = ({text, toggleCheckbox, additional}) => {
  return (
    <label htmlFor="hr" className="flex flex-row items-center gap-2.5 text-black cursor-pointer"
    >
      <input id="hr" type="checkbox" className="peer hidden" checked={additional} onChange={toggleCheckbox} />
      <div htmlFor="hr" className="size-6 flex rounded-md border-2 border-[#a2a1a833] bg-[#e8e8e8] peer-checked:bg-[#7152f3] transition">
        <svg fill="none" viewBox="0 0 24 24" className="size-6 stroke-[#e8e8e8]" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12.6111L8.92308 17.5L20 6.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {text}
    </label>
  );
}

export default Checkbox;