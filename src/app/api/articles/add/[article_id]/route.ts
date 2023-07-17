import ArticleCount from "@/models/articles";
import { connectToDatabase } from "@/utils/database";

export const POST = async (request: any) => {
  const { id } = await request.json();

  try {
    await connectToDatabase();

    const article = await ArticleCount.findOneAndUpdate(
      { id: id },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch a new article"), {
      status: 500,
    });
  }
};
