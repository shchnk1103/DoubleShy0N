import LoginOrRegisterForm from "@/components/LoginOrRegister/LoginOrRegisterForm";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const LoginOrRegister = () => {
  const t = useTranslations("LoginOrRegister");
  const formData = {
    login: t("login"),
    register: t("register"),
    subtitleLogin: t("subtitle_login"),
    subtitleRegister: t("subtitle_register"),
    email: t("email"),
    name: t("name"),
    password: t("password"),
    password2: t("password_confirmation"),
    loginTip: t("login_tip"),
    loginTip2: t("login_tip_2"),
    registerTip: t("register_tip"),
    registerTip2: t("register_tip_2"),
  };

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
        <LoginOrRegisterForm formData={formData} />
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

      {/* TODO: add error message */}
    </>
  );
};

export default LoginOrRegister;
