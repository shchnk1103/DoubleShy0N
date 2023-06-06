import { Schema, models, model } from "mongoose";

const articleSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  tag: {
    type: String,
    ref: "Tags",
    required: [true, "Tag is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  count: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

const Test = models.Test || model("Test", articleSchema);

export default Test;
