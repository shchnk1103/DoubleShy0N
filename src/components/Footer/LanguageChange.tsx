"use client";

import { useLocale } from "next-intl";
import Link from "next-intl/link";
import React, { useEffect, useState } from "react";

type Props = {
  locales: {
    name: string;
    locale: string;
  }[];
};

const LanguageChange = ({ locales }: Props) => {
  const locale = useLocale();
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const [defaultLanguage, setDefaultLanguage] = useState<string>("English");

  const changeLanguage = (locale: string) => {
    setShowLanguage(false);
    setDefaultLanguage(locale);
  };

  useEffect(() => {
    for (let index = 0; index < locales.length; index++) {
      const p_locale = locales[index];
      if (p_locale.locale === locale) {
        setDefaultLanguage(p_locale.name);
      }
    }
  }, []);

  return (
    <div className="md:flex md:flex-row hidden text-blue-600 dark:text-gray-500 relative">
      <div
        className="border px-2 rounded-full border-blue-600 cursor-pointer"
        onClick={() => setShowLanguage(!showLanguage)}
      >
        {defaultLanguage}
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
              locale={locale.locale}
              key={locale.locale}
              className="whitespace-nowrap cursor-pointer hover:bg-blue-600 text-gray-500 hover:text-white w-full px-2 rounded-lg text-end transition z-20"
              onClick={() => changeLanguage(locale.name)}
            >
              {locale.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageChange;
