import { Schema, models, model } from "mongoose";

const articleSchema = new Schema({
  id: {
    type: String,
    required: [true, "Article id is required"],
  },
  count: {
    type: Number,
    default: 0,
  },
});

const ArticleCount =
  models.ArticleCount || model("ArticleCount", articleSchema);

export default ArticleCount;
