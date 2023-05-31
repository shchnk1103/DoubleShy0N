import AnimatedText from "@/components/AnimatedText";

const User = () => {
  return (
    <div className="min-h-[400px] flex-center">
      <AnimatedText
        text={"Give me some time..."}
        className="md:text-5xl !text-4xl"
      />
    </div>
  );
};

export default User;
