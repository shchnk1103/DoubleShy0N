import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Provider = {
  id: string;
  name: string;
  type: string;
};

const AvatarImg = ({ session }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="shadow-md dark:shadow-gray-600/95 border rounded-full w-10 h-10 flex-center dark:border-gray-400"
    >
      <Image
        src={session?.user.image}
        width={36}
        height={36}
        className="rounded-full w-full h-full"
        alt="profile"
      />
    </motion.div>
  );
};

const Avatar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState([]);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleSignOut = async () => {
    await signOut();
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
      {session?.user ? (
        <DropdownMenu.Root
          open={toggleDropdown}
          onOpenChange={setToggleDropdown}
        >
          <DropdownMenu.Trigger>
            <AvatarImg session={session} />
          </DropdownMenu.Trigger>

          <AnimatePresence>
            {toggleDropdown && (
              <DropdownMenu.Portal forceMount>
                <DropdownMenu.Content align="end" className="z-50">
                  <motion.div
                    className="bg-slate-50/80 rounded-md p-2 backdrop-blur-sm shadow-md flex flex-col justify-start items-start gap-2 text-slate-600 text-sm origin-top-right"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                  >
                    <DropdownMenu.Group className="flex-start flex-col gap-2">
                      <DropdownMenu.Item>
                        <Link
                          href="/articles/tags"
                          className="w-full text-sm text-slate-400 hover:text-slate-800 transition-colors"
                          onClick={() => setToggleDropdown(false)}
                        >
                          Tags
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <Link
                          href="/articles/create"
                          className="w-full text-sm text-slate-400 hover:text-slate-800 transition-colors"
                          onClick={() => setToggleDropdown(false)}
                        >
                          Create Article
                        </Link>
                      </DropdownMenu.Item>
                    </DropdownMenu.Group>

                    <DropdownMenu.Separator className="h-px w-full bg-gray-300" />

                    <DropdownMenu.Group>
                      <DropdownMenu.Item>
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="rounded-md w-full text-red-400 hover:text-red-700 transition-colors font-semibold"
                        >
                          SignOut
                        </button>
                      </DropdownMenu.Item>
                    </DropdownMenu.Group>
                  </motion.div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            )}
          </AnimatePresence>
        </DropdownMenu.Root>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <motion.button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="border px-4 py-1 rounded-full bg-white shadow-md"
                initial={{ background: "#fff", color: "#000" }}
                animate={{ background: "#fff", color: "#000" }}
                whileHover={{
                  scale: 1.05,
                  background: "#2563eb",
                  color: "#fff",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            ))}
        </>
      )}
    </>
  );
};

export default Avatar;
