"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateArticle = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    userId: session,
    title: "",
    tag: "",
    content: "",
    image: "",
  });

  const createArticle = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("api/articles/create", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          title: post.title,
          tag: post.tag,
          date: Date.now(),
          content: post.content,
          count: 0,
          image: post.image,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createArticle}
    />
  );
};

export default CreateArticle;
