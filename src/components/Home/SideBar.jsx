import Tags from "../Tags";

const SideBar = () => {
  return (
    <div className="flex justify-end items-end flex-col my-[46px] h-fit w-full gap-8">
      <div className="p-4 flex flex-col justify-end items-start gap-3 border rounded-2xl shadow overflow-hidden backdrop-blur-md w-full">
        <div className="flex flex-col gap-1">
          <span className="blue_gradient font-semibold">Tags:</span>
          <span className="inline-block text-slate-400">
            You can choose a tag to show your interest articles.
          </span>
        </div>

        <Tags />
      </div>

      <div className="p-4 flex flex-col gap-3 border rounded-2xl shadow overflow-hidden backdrop-blur-md">
        <span className="blue_gradient font-semibold">something else...</span>
      </div>
    </div>
  );
};

export default SideBar;
