import ArticleCount from "@/models/articles";
import { connectToDatabase } from "@/utils/database";

export const GET = async (request: any, { params }) => {
  const { id } = params;

  try {
    await connectToDatabase();

    const article = await ArticleCount.findOne({ id: id });

    if (!article) {
      const newArticle = new ArticleCount({ id: id, count: 0 });
      await newArticle.save();

      return new Response(JSON.stringify(newArticle), { status: 200 });
    }

    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch a new article"), {
      status: 500,
    });
  }
};
