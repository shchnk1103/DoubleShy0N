import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Article } from "../types/Article";
import imageUrlBuilder from "@sanity/image-url";
import { Category } from "../types/Category";

const builder = imageUrlBuilder(clientConfig);

export const getArticles = async (): Promise<Article[]> => {
  return createClient(clientConfig).fetch(
    groq`*[_type == "article"]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      count,
      author->,
      body,
      categories[0]->,
    }`
  );
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  return createClient(clientConfig).fetch(
    groq`*[_type == "article" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      count,
      author->,
      body,
      categories[0]->,
    }`,
    { slug }
  );
};

export const getArticlesByCategory = async (
  category: string
): Promise<Article[]> => {
  return createClient(clientConfig).fetch(
    groq`*[_type == "article" && categories[0]->title == $category]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      count,
      author->,
      body,
      categories[0]->,
    }`,
    { category }
  );
};

export const getCategories = async (): Promise<Category[]> => {
  return createClient(clientConfig).fetch(
    groq`*[_type == "category"]{
      _id,
      _createdAt,
      title,
      description,
    }`
  );
};

export const urlFor = (source: any) => {
  return builder.image(source);
};
