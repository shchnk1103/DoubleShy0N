"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next-intl/link";
import { ChangeEvent, useEffect, useState, useTransition } from "react";

const locales = ["en", "zh-CN"];

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const [defaultLanguage, setDefaultLanguage] = useState<string>("en");

  const changeLanguage = (locale: string) => {
    setShowLanguage(false);
    setDefaultLanguage(locale);
  };

  useEffect(() => {
    if (locale) {
      setDefaultLanguage(locale);
    }
  }, []);

  return (
    <div className="w-full my-12 flex flex-col padding">
      <div className="h-[1px] w-full bg-slate-200 dark:bg-gray-500"></div>

      <div className="mt-4 flex-between relative">
        <span className="text-slate-600 font-light">
          {new Date().getFullYear()} &copy; All Rights Reserved.
        </span>

        <span className="md:absolute md:left-1/2 md:-translate-x-1/2 text-slate-600 font-light">
          built with{" "}
          <span className="text-pink-600 font-semibold text-lg">&#9825;</span>{" "}
          by DoubleShy0N
        </span>

        {/* Change Language */}
        <div className="md:flex md:flex-row hidden text-blue-600 dark:text-gray-500 relative">
          <div
            className="border px-2 rounded-full border-blue-600 cursor-pointer"
            onClick={() => setShowLanguage(!showLanguage)}
          >
            {t(defaultLanguage)}
          </div>

          {showLanguage && (
            <div className="absolute -top-[50px] right-0 flex justify-end items-center flex-col bg-gray-500/25 border rounded-lg">
              <div
                className="absolute h-screen w-screen bg-white/0"
                onClick={() => setShowLanguage(false)}
              ></div>

              {locales.map((locale) => (
                <Link
                  href="/"
                  locale={locale}
                  key={locale}
                  className="whitespace-nowrap cursor-pointer hover:bg-blue-600 text-gray-500 hover:text-white w-full px-2 rounded-lg text-end transition z-20"
                  onClick={() => changeLanguage(locale)}
                >
                  {t(locale)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
