import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const UploadImage = ({ convertToBase64, post }) => {
  const [isClicked, setIsClicked] = useState(false);

  const clickInput = () => {
    document.getElementById("input-img").click();
  };

  useEffect(() => {
    const input = document.getElementById("input-img");
    if (!isClicked) {
      input.addEventListener("click", clickInput);
    }

    return () => {
      if (input) {
        input.removeEventListener("click", clickInput);
      } else {
        return;
      }
    };
  }, [isClicked]);

  return (
    <AnimatePresence>
      {post.image ? (
        <motion.img
          key="image"
          src={post.image}
          alt="article-img"
          className="flex-center w-full h-full rounded-xl shadow-md border mt-4 object-cover"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        />
      ) : (
        <motion.button
          key="button"
          onClick={(e) => {
            e.preventDefault();
            setIsClicked(true);
            clickInput();
          }}
          className="flex-center w-full min-h-[250px] rounded-xl shadow-sm mt-4 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-500 text-xl capitalize"
          >
            click here to upload image...
          </motion.span>
        </motion.button>
      )}

      <input
        name="input-img"
        id="input-img"
        accept="image/*"
        type="file"
        onChange={convertToBase64}
        required
        className="hidden opacity-0"
      />
    </AnimatePresence>
  );
};

export default UploadImage;
