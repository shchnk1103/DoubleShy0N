"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Tags from "@/components/Tags";

const TagsManagement = () => {
  const router = useRouter();
  const [tag, setTag] = useState("");

  const createTag = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("api/tags/create", {
        method: "POST",
        body: JSON.stringify({
          name: tag,
        }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Error adding tags!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full max-w-full min-h-[400px] flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Tags Management</span>
      </h1>

      <p className="desc text-left max-w-md">Manage your tags here.</p>

      <div className="w-full h-full mt-8 glassmorphism dark:bg-gray-500/20 dark:border-gray-500 dark:shadow-gray-600/95">
        <div className="flex gap-2 flex-col">
          <span className="font-semibold text-base text-gray-700 dark:text-gray-300">
            Add Tags
          </span>

          <label className="flex justify-start items-center gap-3 h-full w-full mt-1">
            <input
              type="text"
              placeholder="tag name"
              value={tag}
              onChange={(event) => {
                setTag(event.target.value);
              }}
              className="flex-center rounded-lg p-3 text-sm text-gray-500 outline-0 w-full md:w-1/3 h-full shadow-sm dark:bg-black/20"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-lg h-[45px] font-semibold text-lg flex-center hover:text-gray-200 hover:bg-blue-700 transition-colors dark:bg-blue-800 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-gray-400"
            >
              submit
            </button>
          </label>
        </div>

        <hr className="border-gray-300 w-full my-6 dark:border-gray-500" />

        <span className="font-semibold text-base text-gray-700 dark:text-gray-300">
          Already have tags
        </span>

        <Tags />
      </div>
    </section>
  );
};

export default TagsManagement;
