import { Schema, model, models } from "mongoose";

const TagSchema = new Schema({
  name: {
    type: String,
    required: [true, "Tag name is required"],
  },
});

const Tags = models.Tags || model("Tags", TagSchema);

export default Tags;
