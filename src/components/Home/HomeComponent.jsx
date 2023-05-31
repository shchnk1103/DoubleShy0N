import AnimatedText from "../AnimatedText";
import HomeImage from "./HomeImage";

const HomeComponent = () => {
  return (
    <div className="flex-between w-full h-full min-h-screen">
      <div className="w-1/2 hidden md:flex">
        <HomeImage />
      </div>

      <div className="flex justify-start items-start flex-col w-full md:w-1/2">
        <AnimatedText text={"Welcome to my site!"} className="!text-left" />

        <span className="text-base text-left my-8 overflow-hidden pointer-events-none">
          My name is{" "}
          <span className="blue_gradient font-semibold">DoubleShy0N</span>, I am
          a full-stack developer, I like to share my experience and my thoughts
          on this site. I hope you can find what you want here. If I have any
          mistakes, please contact me. Thank you!
        </span>

        <a
          href="mailto:doubleshy0n@qq.com"
          className="capitalize bg_blue_gradient text-slate-100 text-xl px-8 py-3 rounded-xl mt-8 shadow-md hover:shadow-xl hover:scale-105 transition active:scale-95"
        >
          Contact
        </a>
      </div>
    </div>
  );
};

export default HomeComponent;
