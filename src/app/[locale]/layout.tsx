import "@/styles/globals.css";
import Provider from "@/components/Provider";
import TheThemeProvider from "@/components/ThemeProvider";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Session } from "next-auth";

export const metadata = {
  title: "DoubleShy0N",
  description: "My own website",
};

const locales = ["en", "zh-CN"];

type RootLayoutProps = {
  children: ReactNode;

  params: {
    session: Session;
    locale: string;
  };
};

const RootLayout = async ({
  children,
  params: { session, locale },
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

            <main className="app font-poppins relative">{children}</main>
          </Provider>
        </TheThemeProvider>

        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
