import Image from "next/image";
import Link from "next/link";
import { BsArrowRightCircle } from "react-icons/bs";

type ToolCardProps = {
  type: {
    name: string;
    title: string;
    description: string;
    image: string;
  };
};

const ToolCard = ({ type }: ToolCardProps) => {
  return (
    <div
      className={
        "rounded-xl filter backdrop-blur-2xl w-2/5 h-52 shadow-xl shadow-gray-400 border-[1px] border-gray-200 dark:border-gray-500 cursor-pointer hover:shadow-2xl hover:-translate-y-4 hover:border-gray-500 dark:hover:border-gray-200 transition-all group"
      }
    >
      <Link
        href={`/tools/${type.name}`}
        className={"flex-start flex-row gap-4 h-52"}
      >
        {/* Image */}
        <div
          className={
            "rounded-xl bg-white dark:bg-gray-900 w-[200px] h-[200px] my-auto flex-center pl-1"
          }
        >
          <Image
            src={type.image}
            alt={"pokemon"}
            width={"200"}
            height={"200"}
            className={"object-fill rounded-xl"}
          />
        </div>

        {/* Text */}
        <div
          className={
            "h-full py-1 flex-start flex-col flex-1 gap-2 pr-1 relative"
          }
        >
          <span className={"font-semibold text-lg blue_gradient"}>
            {type.title}
          </span>

          <span className={"text-sm text-gray-800 dark:text-gray-300"}>
            {type.description}
          </span>

          <BsArrowRightCircle
            className={
              "absolute right-4 bottom-4 h-6 w-6 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors"
            }
          />
        </div>
      </Link>
    </div>
  );
};

export default ToolCard;
