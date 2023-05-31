import Link from "next/link";
import SelectTag from "./SelectTag";
import UploadImage from "./UploadImage";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const convertToBase64 = (event) => {
    const render = new FileReader();
    render.readAsDataURL(event.target.files[0]);
    render.onload = () => {
      setPost({ ...post, image: render.result });
    };

    render.onerror = (error) => {
      console.log("Image Upload Error: ", error);
    };
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and Share amazing news with the world.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-semibold text-base text-gray-700">Title:</span>

          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="write your title here..."
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-semibold text-base text-gray-700">Tag:</span>

          <SelectTag post={post} setPost={setPost} />
        </label>

        <label>
          <span className="font-semibold text-base text-gray-700">
            Content:
          </span>

          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder="write your content here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-semibold text-base text-gray-700">Image:</span>

          <UploadImage convertToBase64={convertToBase64} post={post} />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg_blue_gradient rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
