import Test from "@/models/articles";
import { connectToDatabase } from "@/utils/database";

export const GET = async (request, res) => {
  try {
    await connectToDatabase();

    const articles = await Test.find({})
      .sort({
        date: -1,
      })
      .limit(5);

    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch a new article"), {
      status: 500,
    });
  }
};
