import Test from "@/models/articles";
import { connectToDatabase } from "@/utils/database";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();

    const id = params.id;
    const article = await Test.deleteOne({ _id: id });

    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to delete an article"), {
      status: 500,
    });
  }
};
