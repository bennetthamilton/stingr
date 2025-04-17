"use client";

import { useState } from "react";
import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import Link from "next/link";

type NavLink = {
  url: string;
  title: string;
};

type Props = {
  navLinks: NavLink[];
  buttons: ButtonProps[];
};

export type Navbar2Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Navbar2 = (props: Navbar2Props) => {
  const { navLinks, buttons } = {
    ...Navbar2Defaults,
    ...props,
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const isMobile = useMediaQuery("(max-width: 991px)");

  const buttonLinks = ["/login", "/signup"];

  return (
    <section
      id="navbar"
      className="z-[999] flex w-full items-center border-b border-border-primary bg-background px-[5%] py-4"
    >
      <div className="mx-auto w-full flex items-center justify-between">
        {/* Logo as Text */}
        <Link href="/" className="text-2xl font-logo text-honeyGold tracking-wide">
          stingr
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 ml-auto mr-6 font-heading">
          {navLinks.map((navLink, index) => (
            <a
              key={index}
              href={navLink.url}
              className="text-base text-offWhite hover:text-honeyGold transition-colors"
            >
              {navLink.title}
            </a>
          ))}
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex gap-4">
          {buttons.map((button, index) => (
            <Link key={index} href={buttonLinks[index]}>
              <Button className="px-4 py-2" {...button}>
                {button.title}
              </Button>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="flex flex-col items-center justify-center"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-white"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={topLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-white"
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={middleLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-white"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={bottomLineVariants}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="absolute top-full left-0 w-full bg-background px-[5%] py-6 text-center md:hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((navLink, index) => (
              <a
                key={index}
                href={navLink.url}
                className="text-base font-heading text-offWhite hover:text-honeyGold"
              >
                {navLink.title}
              </a>
            ))}
            {buttons.map((button, index) => (
              <Link key={index} href={buttonLinks[index]}>
                <Button className="w-full px-4 py-2" {...button}>
                  {button.title}
                </Button>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};

// Default Props
export const Navbar2Defaults: Props = {
  navLinks: [
    { title: "Browse Artists", url: "/browse" },
    { title: "For Artists", url: "/artists" },
    { title: "About", url: "/about" },
    { title: "FAQ", url: "/faq" },
  ],
  buttons: [
    {
      title: "Log In",
      variant: "link",
      size: "sm",
    },
    {
      title: "Sign Up",
      variant: "primary",
      size: "sm",
    },
  ],
};

// Framer Motion Menu Line Variants
const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};
