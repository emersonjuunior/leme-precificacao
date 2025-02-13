const Loading = () => {
  return (
    <div className="w-full h-full inset-0 bg-black/10 border-2 fixed flex justify-center items-center z-30">
      <div class="flex flex-row gap-2">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
};

export default Loading;
