const Footer = () => {
  return (
    <div className="w-full my-12 flex flex-col">
      <div className="h-[1px] w-full bg-slate-200"></div>

      <div className="mt-4 flex-between relative">
        <span className="text-slate-600 font-light">
          {new Date().getFullYear()} &copy; All Rights Reserved.
        </span>

        <span className="md:absolute md:left-1/2 md:-translate-x-1/2 text-slate-600 font-light">
          built with{" "}
          <span className="text-pink-600 font-semibold text-lg">&#9825;</span>{" "}
          by DoubleShy0N
        </span>

        <div className="md:flex md:flex-row text-gray-200 hidden">0.0</div>
      </div>
    </div>
  );
};

export default Footer;
