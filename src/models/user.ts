import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should be between 8 and 20 characters, and can only contain letters, numbers, underscores and dots",
    ],
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password invalid, it should be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, and one number",
    ],
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = models.User || model("User", UserSchema);

export default User;
