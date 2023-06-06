import { defineDocumentType, makeSource } from "@contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  fields: {
    id: {
      type: "string",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/articles/${post.id}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
});
