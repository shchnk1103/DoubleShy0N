"use client";

import AnimatedText from "@/components/AnimatedText";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Dialog from "@/components/Dialog";
import Tag from "@/components/Article/Tag";
import Date from "@/components/Article/Date";
import Count from "@/components/Article/Count";
import Author from "@/components/Article/Author";
import { allPosts } from "contentlayer/generated";

const ArticleDetail = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [article, setArticle] = useState([]);
  const post = allPosts.find((post) => post.id === params.id);

  if (!post) {
    throw new Error(`No post found for article id: ${params.id}`);
  }

  const fetchArticle = async (id) => {
    const response = await fetch(`/api/articles/${id}`);
    const articleData = await response.json();

    setArticle(articleData);
  };

  const deleteArticle = async (id) => {
    if (session?.user.id === article[0].creator._id) {
      const response = await fetch(`/api/articles/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.log(response);
      }
    } else {
      alert("You are not the creator of this article!");
    }
  };

  useEffect(() => {
    fetchArticle(params.id);
  }, []);

  return (
    <>
      {article[0] ? (
        <div className="flex-center flex-col gap-4">
          <Image
            src={article[0].image}
            alt="article_detail_img"
            width={200}
            height={200}
            className="w-full max-w-[80%] max-h-[500px] my-8 shadow-xl dark:shadow-gray-600/95 border dark:border-gray-500 rounded-2xl object-cover"
          />

          <span className="blue_gradient font-bold text-5xl">
            {article[0].title}
          </span>

          <div className="flex-center gap-2 text-slate-500 text-sm h-5">
            <Author author={article[0].creator} />

            <Tag tag={article[0].tag} />

            <Date date={article[0].date} />

            <Count count={article[0].count} />

            <Dialog handleSubmit={deleteArticle} data={article[0]._id} />
          </div>

          <article className="w-full flex justify-start items-start flex-col">
            <div
              className="[&>*]:mb-3 [&>*:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: post.body.html }}
            />
          </article>
        </div>
      ) : (
        <AnimatedText
          text={"loading..."}
          className="blue_gradient text-2xl md:text-6xl capitalize my-8 min-h-[400px] flex-center"
        />
      )}
    </>
  );
};

export default ArticleDetail;
