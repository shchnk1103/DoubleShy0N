import Test from "@/models/articles";
import { connectToDatabase } from "@/utils/database";

export const POST = async (req, res) => {
  const {
    userId,
    author,
    title,
    description,
    tag,
    date,
    content,
    count,
    image,
  } = await req.json();

  try {
    await connectToDatabase();

    const newArticle = new Test({
      creator: userId,
      author,
      title,
      description,
      tag,
      date,
      content,
      count,
      image,
    });

    await newArticle.save();

    return new Response(JSON.stringify(newArticle), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to create a new article"), {
      status: 500,
    });
  }
};
