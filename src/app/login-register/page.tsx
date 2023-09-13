"use client";

import AnimatedInput from "@/components/AnimatedInput";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginOrRegister = () => {
  const router = useRouter();
  const [providers, setProviders] = useState<any>([]);

  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputPassword2, setInputPassword2] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loginMode, setLoginMode] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginMode) {
      // Login
      const result = await signIn("credentials", {
        email: inputEmail,
        password: inputPassword,
        redirect: false,
      });

      if (result.error) {
        setError("Email or password is incorrect!");
      } else {
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
      <div className="relative mx-4 filter backdrop-blur-2xl rounded-3xl border flex-center flex-row shadow-md">
        {error ? (
          <div className="absolute top-2 flex-center rounded-full border border-gray-300/25">
            <div className="w-full h-full bg-white bg-opacity-60 backdrop-filter blur-sm absolute rounded-full"></div>

            <p className="text-red-600 z-50 py-1 px-2 pointer-events-none">
              {error}
            </p>
          </div>
        ) : null}

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

        <div className="h-full py-4 flex-1 flex-center flex-col gap-1 px-8">
          {/* Title */}
          <div className="flex-start flex-col gap-2">
            <span className="blue_gradient font-bold text-3xl text-left w-full">
              {loginMode ? "Login" : "Register"}
            </span>

            <span className="text-sm text-gray-600 dark:text-gray-400">
              {loginMode
                ? "Login an account can access you to have more power with this site..."
                : "Register an account can access you to have more power with this site..."}
            </span>
          </div>

          <form
            className="flex-start flex-col p-2 h-full w-full gap-6 mt-2"
            onSubmit={handleSubmit}
          >
            {/* email */}
            <AnimatedInput
              inputName={"Email"}
              type="email"
              input={inputEmail}
              setInput={setInputEmail}
            />

            {/* Name */}
            {!loginMode && (
              <AnimatedInput
                inputName={"Name"}
                type="name"
                input={inputName}
                setInput={setInputName}
              />
            )}

            {/* Password */}
            <AnimatedInput
              inputName={"Password"}
              type="password"
              input={inputPassword}
              setInput={setInputPassword}
            />

            {/* Password2 */}
            {!loginMode && (
              <AnimatedInput
                inputName={"Check Your Password"}
                type="password"
                input={inputPassword2}
                setInput={setInputPassword2}
              />
            )}

            {loginMode ? (
              <span className="text-gray-500 text-sm">
                Don't have an account,{" "}
                <span
                  className="font-semibold hover:text-blue-600 transition-colors cursor-pointer"
                  onClick={changeLoginMode}
                >
                  Sign Up Now
                </span>{" "}
                !
              </span>
            ) : (
              <span className="text-gray-500 text-sm">
                Already have an account?{" "}
                <span
                  className="font-semibold hover:text-blue-600 transition-colors cursor-pointer"
                  onClick={changeLoginMode}
                >
                  Login Now
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
                {loginMode ? "Login" : "Register"}
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
          <div className="flex-center flex-row w-full gap-2 my-2">
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

      <div className="absolute top-8 left-8 w-12 h-12 flex-center border rounded-full p-2 group cursor-pointer hover:bg-blue-600 transition-colors shadow-md">
        <Link
          href={"/"}
          className="text-gray-300 text-3xl group-hover:text-gray-50"
        >
          {"<"}
        </Link>
      </div>
    </>
  );
};

export default LoginOrRegister;
