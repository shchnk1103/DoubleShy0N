"use client";

import AnimatedInput from "@/components/AnimatedInput";
import { AnimatePresence, motion } from "framer-motion";
import { getProviders, signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const LoginOrRegister = () => {
  const t = useTranslations("LoginOrRegister");
  const router = useRouter();
  const [providers, setProviders] = useState<any>([]);
  // Form
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputPassword2, setInputPassword2] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loginMode, setLoginMode] = useState<boolean>(true);
  const [isLogging, setIsLogging] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginMode) {
      // Login
      setIsLogging(true);

      const result = await signIn("credentials", {
        email: inputEmail,
        password: inputPassword,
        redirect: false,
      });

      if (result.error) {
        setIsLogging(false);
        setError("Email or password is incorrect!");
      } else {
        setIsLogging(false);
        router.push("/");
      }
    } else {
      // Register
      if (inputPassword2 !== inputPassword) {
        setError("Password is not match!");
      } else {
        try {
          const result = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
              email: inputEmail,
              name: inputName,
              password: inputPassword2,
            }),
          });

          await result.json().then((data) => {
            if (data?.loginMode === true) {
              setLoginMode(true);
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const changeLoginMode = () => {
    setLoginMode(!loginMode);

    setInputPassword2("");
    setError("");
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response as any);
    };

    setUpProviders();
  }, []);

  return (
    <>
      {/* Content */}
      <div className="md:w-[850px] relative md:mx-4 filter backdrop-blur-2xl rounded-3xl border grid sm:grid-cols-2 grid-cols-1 shadow-md">
        {/* Image */}
        <div className="h-full w-full flex-1 hidden sm:flex">
          <Image
            alt="LoginImage"
            src={"/assets/images/LoginBackground.jpg"}
            width={200}
            height={200}
            loading="lazy"
            className="overflow-hidden rounded-l-3xl h-full w-full object-fill"
          />
        </div>

        {/* Form */}
        <div className="h-full py-4 flex-1 flex items-start justify-center flex-col gap-4 px-8">
          {/* Title */}
          <div className="h-fit flex-start flex-col gap-4">
            <span className="blue_gradient font-bold text-5xl text-left w-full h-[55px]">
              {loginMode ? t("title_login") : t("title_register")}
            </span>

            <span className="text-sm text-gray-600 dark:text-gray-400">
              {loginMode ? t("subtitle_login") : t("subtitle_register")}
            </span>
          </div>

          <form
            className="flex-center flex-col py-2 h-fit w-full gap-6 mt-2"
            onSubmit={handleSubmit}
          >
            {/* email */}
            <AnimatedInput
              inputName={t("email")}
              type="email"
              input={inputEmail}
              setInput={setInputEmail}
            />

            {/* Name */}
            {!loginMode && (
              <AnimatedInput
                inputName={t("name")}
                type="name"
                input={inputName}
                setInput={setInputName}
              />
            )}

            {/* Password */}
            <AnimatedInput
              inputName={t("password")}
              type="password"
              input={inputPassword}
              setInput={setInputPassword}
            />

            {/* Password2 */}
            {!loginMode && (
              <AnimatedInput
                inputName={t("password_confirmation")}
                type="password"
                input={inputPassword2}
                setInput={setInputPassword2}
              />
            )}

            {loginMode ? (
              <span className="w-full text-gray-500 text-sm">
                {t("login_tip") + " "}
                <span
                  className="font-semibold hover:text-blue-600 transition-colors cursor-pointer"
                  onClick={changeLoginMode}
                >
                  {t("login_tip_2")}
                </span>
              </span>
            ) : (
              <span className="w-full text-gray-500 text-sm">
                {t("register_tip") + " "}
                <span
                  className="font-semibold hover:text-blue-600 transition-colors cursor-pointer"
                  onClick={changeLoginMode}
                >
                  {t("register_tip_2")}
                </span>
              </span>
            )}

            <button
              type="submit"
              className={
                "border rounded-3xl px-4 py-2 w-full shadow-md " +
                (loginMode
                  ? inputEmail && inputPassword
                    ? "bg-blue-600 text-gray-200 hover:scale-105 hover:shadow-xl transition active:scale-95"
                    : "bg-transparent text-gray-500 pointer-events-none"
                  : inputEmail && inputPassword && inputPassword2
                  ? "bg-blue-600 text-gray-200 hover:scale-105 hover:shadow-xl transition active:scale-95"
                  : "bg-transparent text-gray-500 pointer-events-none")
              }
              disabled={
                loginMode
                  ? !(inputEmail && inputPassword)
                  : !(inputEmail && inputPassword && inputPassword2)
              }
            >
              <span className="font-semibold">
                {loginMode ? t("login") : t("register")}
              </span>
            </button>
          </form>

          {/* <span className="text-gray-500 text-sm">
            Forgot your password,{" "}
            <Link
              href={"/"}
              className="font-semibold hover:text-blue-600 transition-colors"
            >
              Reset Password
            </Link>
            ?
          </span> */}

          {/* ------ OR ------ */}
          <div className="flex-center flex-row w-full gap-2">
            <div className="h-[1px] w-full bg-gray-400"></div>
            <span className="text-gray-400">or</span>
            <div className="h-[1px] w-full bg-gray-400"></div>
          </div>

          {/* Providers */}
          <div className="flex-center flex-row w-full h-8 gap-2 mt-2">
            {providers &&
              Object.values(providers).map(
                (provider: any) =>
                  ({ ...provider }.name !== "Credentials" && (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id);
                      }}
                      className={
                        "border rounded-3xl px-4 py-2 w-full shadow-md hover:scale-105 hover:shadow-xl transition active:scale-95 bg-transparent hover:bg-blue-600  group"
                      }
                    >
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-200 dark:group-hover:text-gray-700">
                        {provider.name}
                      </span>
                    </button>
                  ))
              )}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="absolute top-8 left-8 w-12 h-12 flex-center border rounded-full p-2 group cursor-pointer hover:bg-blue-600 transition-colors shadow-md">
        <Link
          href={"/"}
          className="text-gray-300 text-3xl group-hover:text-gray-50"
        >
          {"<"}
        </Link>
      </div>

      <AnimatePresence>
        {error && (
          <div
            className="absolute bg-black/50 w-full h-full flex-center"
            onClick={() => setError("")}
          >
            <motion.span
              key={error}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="bg-white px-4 py-2 rounded-xl pointer-events-none text-red-600"
            >
              {error}
            </motion.span>
          </div>
        )}

        {isLogging && (
          <div className="absolute bg-black/50 w-full h-full flex-center">
            <div className="h-14 w-14 absolute bg-white dark:bg-gray-700 rounded-2xl"></div>
            <motion.span
              key={"isLogging"}
              animate={{
                rotate: 360,
                transition: {
                  type: "spring",
                  duration: 1.25,
                  repeat: Infinity,
                },
              }}
            >
              <AiOutlineLoading className="w-8 h-8" />
            </motion.span>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoginOrRegister;
