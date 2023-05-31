import { BsFillEyeFill } from "react-icons/bs";

const Count = ({ count }) => {
  return (
    <span className="flex-center space-x-1 text-[12px] font-medium text-zinc-400 md:text-sm gap-1 pointer-events-none">
      <BsFillEyeFill />
      {count}
    </span>
  );
};

export default Count;
