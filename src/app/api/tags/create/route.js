import Tags from "@/models/tags";
import { connectToDatabase } from "@/utils/database";

export const POST = async (req, res) => {
  const { name } = await req.json();

  try {
    await connectToDatabase();

    const newTag = new Tags({
      name,
    });

    await newTag.save();

    return new Response(JSON.stringify(newTag), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to create a new article"), {
      status: 500,
    });
  }
};
