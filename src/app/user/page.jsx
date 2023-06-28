import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { getArticles } from "../../../sanity/utils";

const User = async () => {
  const projects = await getArticles();

  return (
    <div className="min-h-[400px] flex-center">
      <AnimatedText
        text={"Give me some time..."}
        className="md:text-5xl !text-4xl"
      />

      {projects.map((project) => (
        <Link href={`/user/${project.slug}`}>
          <div key={project._id}>{project.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default User;
