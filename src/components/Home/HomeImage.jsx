import Image from "next/image";

const HomeImage = () => {
  return (
    <>
      <Image
        alt="home-pic"
        src="/assets/images/me.jpg"
        width={500}
        height={500}
        className="w-2/3 md:w-1/2 md:flex animate-profileAnimation"
      />
    </>
  );
};

export default HomeImage;
