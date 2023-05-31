import "@/styles/globals.css";
import Provider from "@/components/Provider";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar/NavBar";
import TheThemeProvider from "@/components/ThemeProvider";

export const metadata = {
  title: "DoubleShy0N",
  description: "My own website",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body>
          <TheThemeProvider>
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app font-poppins">
              <NavBar />

              {children}

              <Footer />
            </main>
          </TheThemeProvider>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
