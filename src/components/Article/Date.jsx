import { formattedToDate } from "@/utils/functions";
import { BsFillCalendarEventFill } from "react-icons/bs";

const Date = ({ date }) => {
  return (
    <span className="space-x-1 text-[12px] font-medium text-zinc-400 dark:text-zinc-500 md:text-sm flex-center gap-1 pointer-events-none">
      <BsFillCalendarEventFill />
      <span className="overflow-hidden h-4">{formattedToDate(date)}</span>
    </span>
  );
};

export default Date;
