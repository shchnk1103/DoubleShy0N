import Image from "next/image";
import Link from "next/link";
import { BsArrowRightCircle } from "react-icons/bs";

type ToolCardProps = {
  type: string;
  title: string;
  description: string;
  image_url: string;
};

const ToolCard = ({ type, title, description, image_url }: ToolCardProps) => {
  return (
    <div
      className={
        "rounded-xl filter backdrop-blur-2xl w-full h-fit shadow-xl dark:shadow-md shadow-gray-400 dark:shadow-gray-500 border-[1px] border-gray-200 dark:border-gray-500 cursor-pointer hover:shadow-2xl hover:-translate-y-4 hover:border-gray-500 dark:hover:border-gray-200 transition-all group"
      }
    >
      <Link
        href={`/tools/${type}`}
        className={
          "flex-start lg:flex-row flex-col sm:gap-4 md:gap-1 gap-2 lg:h-52 h-80"
        }
      >
        {/* Image */}
        <div
          className={
            "rounded-xl bg-white dark:bg-gray-900 lg:w-fit w-full h-[200px] my-auto flex-center pl-1"
          }
        >
          <Image
            src={image_url}
            alt={"pokemon"}
            width={"200"}
            height={"200"}
            className={"object-fill rounded-xl"}
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div
          className={
            "h-full py-1 flex-start flex-col flex-1 gap-1 pr-1 relative px-2"
          }
        >
          <span className={"font-semibold text-lg blue_gradient pt-4"}>
            {title}
          </span>

          <span
            className={
              "sm:text-sm text-xs text-gray-700 dark:text-gray-300 overflow-hidden"
            }
          >
            {description}
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
