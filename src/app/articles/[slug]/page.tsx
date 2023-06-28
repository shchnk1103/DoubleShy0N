"use client";

import AnimatedText from "@/components/AnimatedText";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import Dialog from "@/components/Dialog";
import Tag from "@/components/Article/Tag";
import Date from "@/components/Article/Date";
import Count from "@/components/Article/Count";
import Author from "@/components/Article/Author";
import { getArticleBySlug } from "../../../../sanity/utils";
import { Article } from "../../../../types/Article";
import { ArticlePortableText } from "@/components/Article/ArticlePortableText";

type Props = {
  params: {
    slug: string;
  };
};

// const myPortableTextComponents = {
//   types: {
//     image: ({value})
//   }
// }

const ArticleDetail = ({ params }: Props) => {
  // const router = useRouter();
  // const { data: session } = useSession() as { data: { user: { id: string } } };

  const [article, setArticle] = useState<Article>();

  // TODO: 暂时不做删除功能
  // const deleteArticle = async () => {
  //   if (session?.user.id === "646c5ed1b6af3e6e712ff840") {
  //     const response = await fetch(`/api/articles/delete/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (response.ok) {
  //       router.push("/");
  //     } else {
  //       console.log(response);
  //     }
  //   } else {
  //     alert("You are not the creator of this article!");
  //   }
  // };

  useEffect(() => {
    const fetchArticle = async (slug: string) => {
      const data = await getArticleBySlug(slug);

      setArticle(data);
    };

    fetchArticle(params.slug);
  }, []);

  return (
    <>
      {article ? (
        <div className="w-full flex-center flex-col gap-4 relative">
          <div className="w-full h-[500px] flex-center my-8">
            <Image
              src={article.mainImage}
              alt="article_detail_img"
              fill
              className="w-full max-h-[500px] mt-8 shadow-xl dark:shadow-gray-600/95 border dark:border-gray-500 rounded-2xl object-cover"
            />
          </div>

          <span className="blue_gradient font-bold text-5xl">
            {article.title}
          </span>

          <div className="flex-center gap-2 text-slate-500 text-sm h-5">
            <Author author={article.author.name} />

            <Tag tag={article.categories.title} />

            <Date date={article._createdAt} />

            <Count count={article.count} />

            {/* <Dialog handleSubmit={deleteArticle} data={article[0]._id} /> */}
          </div>

          <div className="w-full">
            <ArticlePortableText value={article.body} />
          </div>
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
