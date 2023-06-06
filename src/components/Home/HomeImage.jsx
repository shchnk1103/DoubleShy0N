import Image from "next/image";

const HomeImage = () => {
  return (
    <>
      <Image
        alt="home-pic"
        src="/assets/images/developer-pic-1.png"
        width={500}
        height={500}
        className="w-1/2 hidden md:flex"
      />
    </>
  );
};

export default HomeImage;
