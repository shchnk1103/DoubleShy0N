import Provider from "@/components/Provider";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar/NavBar";

export const metadata = {
  title: "DoubleShy0N",
  description: "My own website",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app font-poppins">
            <NavBar />

            {children}

            <Footer />
          </main>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
