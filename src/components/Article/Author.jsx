import { BsFillPersonFill } from "react-icons/bs";

const Author = ({ author }) => {
  return (
    <span className="space-x-1 text-[12px] font-medium text-zinc-400 dark:text-zinc-500 md:text-sm flex-center gap-1 pointer-events-none">
      <BsFillPersonFill />
      {author}
    </span>
  );
};

export default Author;
