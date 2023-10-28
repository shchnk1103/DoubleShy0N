import "@/styles/globals.css";
import Provider from "@/components/Provider";
import TheThemeProvider from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import { notFound } from "next/navigation";

export const metadata = {
  title: "DoubleShy0N",
  description: "My own website",
};

const locales = ["en", "zh-CN"];

type RootLayoutProps = {
  children: ReactNode;
  session: any;
  params: {
    locale: string;
  };
};

const RootLayout = async ({
  children,
  session,
  params: { locale },
}: RootLayoutProps) => {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body>
        <TheThemeProvider>
          <Provider session={session}>
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app font-poppins relative">
              {children}

              <Analytics />
            </main>
          </Provider>
        </TheThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
