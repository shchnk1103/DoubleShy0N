import Test from "@/models/articles";
import { connectToDatabase } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const articles = await Test.find({ tag: params.id });

    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch a new article"), {
      status: 500,
    });
  }
};
