const ButtonLoader = () => {
  return (
    <div className=" flex gap-2 justify-center  ">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm">Please wait...</span>
    </div>
  );
};

export default ButtonLoader;
