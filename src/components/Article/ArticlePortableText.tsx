import "@/styles/js.css";
import {PortableText, PortableTextComponentProps, type PortableTextComponents,} from "@portabletext/react";
import Image from "next/image";
import {urlFor} from "../../../sanity/utils";
import Link from "next/link";
import SyntaxHighLighter from "react-syntax-highlighter";
import {tomorrowNight} from "react-syntax-highlighter/dist/esm/styles/hljs";

const components: PortableTextComponents = {
  types: {
    image: ({value}: any) => {
      return (
        <div
          className="relative h-80 md:h-[520px] m-10 mx-auto w-full bg-white dark:bg-black rounded-2xl backdrop-filter backdrop-blur-2xl">
          <Image
            src={urlFor(value).url()}
            alt={value}
            fill
            className="w-full shadow-xl dark:shadow-gray-600/95 border dark:border-gray-500 rounded-2xl object-contain"
          />
        </div>
      );
    },
    myCode: ({value}: any) => {
      return (
        <SyntaxHighLighter
          language={value.language}
          style={tomorrowNight}
          className="rounded-2xl !p-4 my-1 mb-3 shadow-lg shadow-slate-800 dark:shadow-gray-600/95 dark:border-gray-500"
        >
          {value.code}
        </SyntaxHighLighter>
      );
    },
  },
  list: {
    bullet: ({children}: any) => {
      return (
        <ul className="ml-10 py-5 list-disc space-y-5 dark:text-gray-400 text-lg">
          {children}
        </ul>
      );
    },
    number: ({children}: any) => {
      return <ol className="mt-10 list-decimal">{children}</ol>;
    },
  },
  block: {
    h1: ({children}: PortableTextComponentProps<any>) => {
      return <h1 className="text-5xl py-6 font-bold">{children}</h1>;
    },
    h2: ({children}: any) => {
      return <h2 className="text-4xl py-6 font-bold">{children}</h2>;
    },
    h3: ({children}: any) => {
      return <h3 className="text-3xl py-6 font-bold">{children}</h3>;
    },
    h4: ({children}: any) => {
      return <h4 className="text-2xl py-4 font-bold">{children}</h4>;
    },
    normal: ({children}: any) => {
      return (
        <p className="text-lg text-gray-600 dark:text-gray-400">{children}</p>
      );
    },

    blockquote: ({children}: any) => {
      return (
        <blockquote className="border-l-blue-600 border-l-4 pl-3 my-3">
          {children}
        </blockquote>
      );
    },
  },
  marks: {
    link: ({children, value}: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferer noopener"
        : undefined;

      return (
        <Link
          href={value.href}
          rel={rel}
          className="underline decoration-blue-600 text-blue-600 hover:decoration-black font-semibold"
        >
          {children}
        </Link>
      );
    },
  },
};

export const ArticlePortableText = (props: {
  value: any;
  components?: PortableTextComponents;
}) => {
  return (
    <PortableText
      value={props.value}
      components={props.components ?? components}
    />
  );
};
