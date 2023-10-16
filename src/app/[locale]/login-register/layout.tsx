const layout = ({ children }) => {
  return (
    // Background
    <div className="w-screen h-screen flex-center relative padding">
      {children}
    </div>
  );
};

export default layout;
