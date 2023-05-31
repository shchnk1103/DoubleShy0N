import Tags from "@/models/tags";
import { connectToDatabase } from "@/utils/database";

export const GET = async (req, res) => {
  try {
    await connectToDatabase();

    const tags = await Tags.find({});

    return new Response(JSON.stringify(tags), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch a new article"), {
      status: 500,
    });
  }
};
