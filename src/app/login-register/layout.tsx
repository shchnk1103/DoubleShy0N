const layout = ({ children }) => {
  return (
    // Background
    <div className="w-screen h-screen flex-center relative">{children}</div>
  );
};

export default layout;
