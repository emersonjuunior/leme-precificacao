const Error = ({error}) => {
  return (
    <div className="mt-2 px-8 py-2 flex justify-center rounded items-center border-red-300 border-1 bg-rose-200 text-red-800 w-fit mx-auto">
      <p>{error}</p>
    </div>
  )
}

export default Error
