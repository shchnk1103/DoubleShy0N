import "@/styles/globals.css";
import Provider from "@/components/Provider";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar/NavBar";
import TheThemeProvider from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";

export const metadata = {
  title: "DoubleShy0N",
  description: "My own website",
};

type RootLayoutProps = {
  children: ReactNode;
  session: any;
};

const RootLayout = ({ children, session }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <TheThemeProvider>
          <Provider session={session}>
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app font-poppins">
              <NavBar />

              {children}

              <Footer />

              <Analytics />
            </main>
          </Provider>
        </TheThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
