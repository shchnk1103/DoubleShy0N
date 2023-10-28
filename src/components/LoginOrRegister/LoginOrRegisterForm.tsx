"use client";

import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnimatedInput from "../AnimatedInput";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  formData: {
    login: string;
    register: string;
    subtitleLogin: string;
    subtitleRegister: string;
    email: string;
    name: string;
    password: string;
    password2: string;
    loginTip: string;
    loginTip2: string;
    registerTip: string;
    registerTip2: string;
  };
};

const LoginOrRegisterForm = ({ formData }: Props) => {
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
      <div className="h-full py-4 flex-1 flex items-start justify-center flex-col gap-4 px-8">
        {/* Title */}
        <div className="h-fit flex-start flex-col gap-4">
          <span className="blue_gradient font-bold text-5xl text-left w-full h-[55px]">
            {loginMode ? formData.login : formData.register}
          </span>

          <span className="text-sm text-gray-600 dark:text-gray-400">
            {loginMode ? formData.subtitleLogin : formData.subtitleRegister}
          </span>
        </div>

        <form
          className="flex-center flex-col py-2 h-fit w-full gap-6 mt-2"
          onSubmit={handleSubmit}
        >
          {/* email */}
          <AnimatedInput
            inputName={formData.email}
            type="email"
            input={inputEmail}
            setInput={setInputEmail}
          />

          {/* Name */}
          {!loginMode && (
            <AnimatedInput
              inputName={formData.name}
              type="name"
              input={inputName}
              setInput={setInputName}
            />
          )}

          {/* Password */}
          <AnimatedInput
            inputName={formData.password}
            type="password"
            input={inputPassword}
            setInput={setInputPassword}
          />

          {/* Password2 */}
          {!loginMode && (
            <AnimatedInput
              inputName={formData.password2}
              type="password"
              input={inputPassword2}
              setInput={setInputPassword2}
            />
          )}

          {loginMode ? (
            <span className="w-full text-gray-500 text-sm">
              {formData.loginTip + " "}
              <span
                className="font-semibold hover:text-blue-600 transition-colors cursor-pointer"
                onClick={changeLoginMode}
              >
                {formData.loginTip2}
              </span>
            </span>
          ) : (
            <span className="w-full text-gray-500 text-sm">
              {formData.registerTip + " "}
              <span
                className="font-semibold hover:text-blue-600 transition-colors cursor-pointer"
                onClick={changeLoginMode}
              >
                {formData.registerTip2}
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
              {loginMode ? formData.login : formData.register}
            </span>
          </button>
        </form>

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

export default LoginOrRegisterForm;
