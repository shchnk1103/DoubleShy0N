import "@/styles/globals.css";
import Provider from "@/components/Provider";
import TheThemeProvider from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
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

// export function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "zh-CN" }];
// }

const RootLayout = async ({
  children,
  session,
  params: { locale },
}: RootLayoutProps) => {
  // let messages;
  // try {
  //   messages = (await import(`../../../messages/${locale}.json`)).default;
  // } catch (error) {
  //   notFound();
  // }

  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body>
        {/* <NextIntlClientProvider locale={locale} messages={messages}> */}
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
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
};

export default RootLayout;
