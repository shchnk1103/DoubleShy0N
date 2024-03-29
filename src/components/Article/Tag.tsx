import { BsFillTagFill } from "react-icons/bs";

type TagProps = {
  tag: string;
};

const Tag = ({ tag }: TagProps) => {
  return (
    <span className="space-x-1 text-[12px] font-medium text-zinc-400 dark:text-zinc-500 md:text-sm flex-center gap-1 pointer-events-none">
      <BsFillTagFill />
      {tag}
    </span>
  );
};

export default Tag;
