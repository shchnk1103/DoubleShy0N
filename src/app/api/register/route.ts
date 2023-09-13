import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";
import { signIn } from "next-auth/react";

export const POST = async (req, res) => {
  const { email, name, password } = await req.json();

  try {
    await connectToDatabase();

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      // 用户已存在，跳转到登录页面
      return new Response(
        JSON.stringify({ message: "account exists", loginMode: true }),
        { status: 200 }
      );
    } else {
      // 用户不存在，先创建用户再登录
      await User.create({
        email: email,
        username: name,
        image: "/assets/icons/default_avatar.jpeg",
        password: password,
        role: "user",
      });

      return new Response(
        JSON.stringify({ message: "success register", loginMode: true }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Failed to register a new user"), {
      status: 500,
    });
  }
};
