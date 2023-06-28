import { PortableTextBlock } from "sanity";

export type Article = {
  _id: string;
  title: string;
  slug: string;
  author: author;
  categories: category;
  _createdAt: Date;
  count: number;
  body: any;
  mainImage: string;
};

type author = {
  _id: string;
  name: string;
  image: string[];
  bio: string[];
  _createdAt: Date;
};

type category = {
  _id: string;
  title: string;
  description: string;
  _createdAt: Date;
};
