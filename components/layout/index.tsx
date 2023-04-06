import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import useMediaQuery from '@mui/material/useMediaQuery'

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const scrolled = useScroll(50);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Meta {...meta} />
      <div className="fixed h-full w-full bg-image bg-cover" />
      <div
        className={`transition-backdrop-blur fixed top-0 w-full duration-1000  ${
          scrolled ? "backdrop-blur-xl" : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-white">
            <Image
              src="/banner.png"
              alt="Precedent logo"
              width="250"
              height="250"
              className="mr-2 rounded-sm"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            ></Image>
          </Link>
          {isMobile ? (
            <div>
              <button
                className="inline-block rounded-md p-2 text-white hover:text-slate-500 focus:outline-none"
                onClick={toggleMenu}
              >
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                  ) : (
                    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                  )}
                </svg>
              </button>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-gray-900 p-5"
                    {...FADE_IN_ANIMATION_SETTINGS}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Link href="/teams">
                      <p className="md:text-md text-white transition-colors duration-300 hover:text-slate-500 sm:text-sm lg:text-lg xl:text-lg">
                        Our Team
                      </p>
                    </Link>
                    <Link href="/partners">
                      <p className="md:text-md text-white transition-colors duration-300 hover:text-slate-500 sm:text-sm lg:text-lg xl:text-lg">
                        Partners
                      </p>
                    </Link>
                    <Link href="/contact">
                      <p className="md:text-md text-white transition-colors duration-300 hover:text-slate-500 sm:text-sm lg:text-lg xl:text-lg">
                        Contact
                      </p>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div>
              <AnimatePresence>
                <motion.div
                  className="flex items-center space-x-4"
                  {...FADE_IN_ANIMATION_SETTINGS}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Link href="/teams">
                    <p className="md:text-md text-white transition-colors duration-300 hover:text-slate-500 sm:text-sm lg:text-lg xl:text-lg">
                      Our Team
                    </p>
                  </Link>
                  <Link href="/partners">
                    <p className="md:text-md text-white transition-colors duration-300 hover:text-slate-500 sm:text-sm lg:text-lg xl:text-lg">
                      Partners
                    </p>
                  </Link>
                  <Link href="/contact">
                    <p className="md:text-md text-white transition-colors duration-300 hover:text-slate-500 sm:text-sm lg:text-lg xl:text-lg">
                      Contact
                    </p>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      <main className=" w-full items-center justify-center py-32">
        {children}
      </main>
      <footer className="fixed bottom-0 left-0 flex h-20 w-full flex-col items-center justify-center border-none bg-transparent backdrop-blur-xl">
        <p className="text-sm text-white">
          © 2023 Project Horizon. All rights reserved.
        </p>
      </footer>
    </>
  );
}
