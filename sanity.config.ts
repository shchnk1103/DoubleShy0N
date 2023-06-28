import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemas } from "./sanity/schemas";
import { visionTool } from "@sanity/vision";

export const config = defineConfig({
  name: "default",
  title: "doubleshy0n",

  projectId: "ro8zjgoo",
  dataset: "production",
  apiVersion: "2023-06-21",
  basePath: "/admin",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemas,
  },
});
