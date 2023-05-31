import { useEffect, useState } from "react";

const SelectTag = ({ post, setPost }) => {
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    const response = await fetch("/api/tags");
    const tags = await response.json();

    setTags(tags);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <select
      name="tag"
      id="tag"
      required
      className="form_input !w-1/2"
      placeholder="select your tag here..."
      onChange={(e) => setPost({ ...post, tag: e.target.value })}
    >
      <option value="">--- Please select a tag ---</option>
      {tags &&
        Array.from(tags).map((tag, index) => (
          <option key={index} value={tag.name}>
            {tag.name}
          </option>
        ))}
    </select>
  );
};

export default SelectTag;
