export const fetchCount = async (id: string) => {
  const response = await fetch(`/api/articles/${id}`, {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();

    return data.count;
  }
};
