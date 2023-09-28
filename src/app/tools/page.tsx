import ToolCard from "@/components/Tools/ToolCard";
import { PokemonTool } from "@/components/Tools/ToolTypes";

const User = async () => {
  return (
    <div className="min-h-[75vh] w-full flex-start flex-col gap-8 padding">
      <div className={"text-left w-full flex-start flex-col gap-2"}>
        <h1 className={"blue_gradient text-5xl font-semibold mt-4"}>Tools</h1>
        <span className={"text-xl"}>Here will be some self-made tools.</span>
      </div>

      <div className={"w-full grid md:grid-cols-2 grid-cols-1"}>
        <ToolCard type={PokemonTool} />
      </div>
    </div>
  );
};

export default User;
