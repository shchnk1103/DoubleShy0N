import * as Select from "@radix-ui/react-select";
import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const SelectTag = ({ post, setPost }) => {
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    const response = await fetch("/api/tags");
    const tags = await response.json();

    setTags(tags);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Select.Root
      required
      onValueChange={(value) => setPost({ ...post, tag: value })}
    >
      <Select.Trigger
        aria-label="tags"
        className="z-0 inline-flex items-center justify-center rounded px-3 text-sm leading-none h-[35px] w-1/3 gap-2 bg-white dark:bg-black/20 text-gray-500 dark:text-gray-400 shadow-[0_2px_10px] shadow-black/10 hover:bg-slate-100 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-gray-500 outline-none"
      >
        <Select.Value placeholder="select your tag here..." />
        <Select.Icon>
          <MdKeyboardArrowDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-50 overflow-hidden bg-white dark:bg-black rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <MdKeyboardArrowDown />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-[5px]">
            {Array.from(tags).map((tag, index) => (
              <SelectItem value={tag.name} key={index}>
                {tag.name}
              </SelectItem>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <MdKeyboardArrowUp />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
    // <select
    //   name="tag"
    //   id="tag"
    //   required
    //   className="form_input !w-1/2 text-gray-500"
    //   placeholder="select your tag here..."
    //   onChange={(e) => setPost({ ...post, tag: e.target.value })}
    // >
    //   <option value="">--- Please select a tag ---</option>
    //   {tags &&
    //     Array.from(tags).map((tag, index) => (
    //       <option key={index} value={tag.name}>
    //         {tag.name}
    //       </option>
    //     ))}
    // </select>
  );
};

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={`text-[13px] leading-none text-gray-500 rounded-sm flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-gray-500 data-[highlighted]:text-white ${className}`}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <BsCheckLg />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectTag;
