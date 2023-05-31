"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const User = () => {
  const router = useRouter();

  const [tag, setTag] = useState("");
  const createTag = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("api/tags/create", {
        method: "POST",
        body: JSON.stringify({
          name: tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={createTag}>
      <input
        type="text"
        placeholder="name"
        value={tag}
        onChange={(event) => {
          setTag(event.target.value);
        }}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default User;
