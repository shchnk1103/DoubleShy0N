import ArticleCount from "@/models/articles";
import { connectToDatabase } from "@/utils/database";

export const GET = async (req, res) => {
  try {
    await connectToDatabase();

    const articles = await ArticleCount.find({});

    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch a new article"), {
      status: 500,
    });
  }
};
