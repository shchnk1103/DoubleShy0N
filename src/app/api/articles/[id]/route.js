import Test from "@/models/articles";
import { connectToDatabase } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const article = await Test.find({
      _id: params.id,
    }).populate("creator");

    if (!article) {
      return new Response(JSON.stringify("Article not found"), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch a new article"), {
      status: 500,
    });
  }
};
