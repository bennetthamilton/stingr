"use client";

import { useEffect, useRef, useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  useMediaQuery,
} from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown, RxChevronRight, RxCross2 } from "react-icons/rx";
import { BiBell, BiSearch } from "react-icons/bi";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
};

export type ApplicationShell5Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const ApplicationShell5 = (props: ApplicationShell5Props) => {
  const { logo, navLinks } = {
    ...ApplicationShell5Defaults,
    ...props,
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchIconClicked, setIsSearchIconClicked] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 991px)");

  useEffect(() => {
    if (!isSearchIconClicked) return;
    const handleClickOutside = (event: PointerEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsSearchIconClicked(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isSearchIconClicked]);

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <section id="relume">
      <div className="sticky top-0 z-40 flex w-full flex-wrap items-center justify-between border-b border-border-primary bg-background-primary px-6 lg:px-8">
        <div className="flex min-h-16 items-center md:min-h-18">
          <button
            className="-ml-4 mr-4 flex size-12 flex-col items-center justify-center lg:hidden"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsSearchIconClicked(false);
            }}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={topLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={middleLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={bottomLineVariants}
            />
          </button>

          <a href={logo.url} className="text-2xl font-logo text-[var(--color-honeyGold)]">
            stingr
          </a>
        </div>

        <div className="ml-auto flex flex-row items-center gap-4 lg:order-last">
          <div className="hidden w-full max-w-md lg:block">
            <Input className="w-full" placeholder="Search" icon={<BiSearch className="size-6" />} />
          </div>
          <div className="flex shrink-0 items-center gap-2 md:gap-4">
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchIconClicked(!isSearchIconClicked);
              }}
              className="p-2 lg:hidden"
            >
              <BiSearch className="size-6" />
            </button>
            <AnimatePresence>
              {isSearchIconClicked && (
                <motion.div
                  ref={searchBarRef}
                  variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
                  initial="hidden"
                  exit="hidden"
                  animate={isSearchIconClicked ? "visible" : "hidden"}
                  className="absolute bottom-0 left-0 right-0 top-16 mt-px flex h-16 max-w-md items-center justify-center border-b border-border-primary bg-white px-6 lg:hidden"
                >
                  <Input
                    className="w-full pl-100"
                    placeholder="Search"
                    icon={<BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-foreground)] size-5" />}
                  />
                  <button onClick={() => setIsSearchIconClicked(false)}>
                    <RxCross2 className="ml-4 size-6" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notification Bell */}
            <DropdownMenu>
            <DropdownMenuTrigger className="relative btn-unstyled">
                <div className="absolute ..."/>
                <BiBell className="size-6 text-[var(--color-honeyGold)]" />
            </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-[19rem] px-0" align="end" sideOffset={0}>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between px-4 py-2">
                    <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
                    <a href="#">Mark as read</a>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="h-full max-h-[14rem] overflow-auto px-2 py-1">
                    <DropdownMenuItem className="mt-2 grid grid-cols-[max-content_1fr] gap-2 px-2 py-1">
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                        alt="Avatar"
                        className="size-6"
                      />
                      <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p className="mt-2 text-sm">11 Jan 2022</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="flex w-full items-end justify-end px-4 py-2">
                  <Button variant="link" size="link" iconRight={<RxChevronRight />} asChild>
                    <a href="#">View All</a>
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center btn-unstyled">
                <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Avatar"
                    className="size-10 rounded-full object-cover border-2 border-[var(--color-honeyGold)]"
                />
            </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={0} className="mt-1.5 min-w-32 px-0 py-2 md:min-w-48">
                <DropdownMenuGroup>
                  <DropdownMenuItem><a href="#">My Profile</a></DropdownMenuItem>
                  <DropdownMenuItem><a href="#">Profile Settings</a></DropdownMenuItem>
                  <DropdownMenuSeparator className="mx-4" />
                  <DropdownMenuItem><a href="#">Log Out</a></DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <motion.div
          ref={menuRef}
          variants={{ open: { height: "var(--height-open, auto)" }, close: { height: "var(--height-closed, 0)" } }}
          initial="close"
          exit="close"
          animate={isMobileMenuOpen ? "open" : "close"}
          transition={{ duration: 0.4 }}
          className="w-full overflow-hidden lg:order-2 lg:ml-6 lg:w-auto lg:grow lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          <div className="pb-8 pt-4 lg:flex lg:items-center lg:py-0">
            {navLinks.map((navLink, index) =>
              navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                <SubMenu key={index} navLink={navLink} isMobile={isMobile} />
              ) : (
                <a key={index} href={navLink.url} className="block py-3 lg:px-4 lg:py-2">
                  {navLink.title}
                </a>
              )
            )}
          </div>
        </motion.div>
      </div>
      <main className="bg-background-secondary">
        <div className="border-b-2 border-dashed border-[#d3d3d3] py-6 text-center text-black/50">
          <span>Click and paste Page Header</span>
        </div>
        <div className="container grid grid-cols-1 gap-12 px-6 py-8 md:grid-cols-[0.5fr_1fr] md:py-10 lg:px-0 lg:py-12">
          <span className="flex h-screen items-center justify-center border-2 border-dashed border-[#d3d3d3] text-center text-black/50">
            Click and paste Secondary Content
          </span>
          <span className="flex h-screen items-center justify-center border-2 border-dashed border-[#d3d3d3] text-center text-black/50">
            Click and paste Main Content
          </span>
        </div>
      </main>
    </section>
  );
};

const SubMenu = ({ navLink, isMobile }: { navLink: NavLink; isMobile: boolean }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="btn-unstyled block py-3 lg:px-4 lg:py-2 text-left"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span className="inline-flex items-center gap-2">
            {navLink.title}
            <motion.span
                variants={{ rotated: { rotate: 180 }, initial: { rotate: 0 } }}
                animate={isDropdownOpen ? "rotated" : "initial"}
                transition={{ duration: 0.3 }}
            >
                <RxChevronDown />
            </motion.span>
        </span>
      </button>
      {isDropdownOpen && (
        <AnimatePresence>
          <motion.nav
            variants={{
              open: { visibility: "visible", opacity: "var(--opacity-open, 100%)", y: 0 },
              close: { visibility: "hidden", opacity: "var(--opacity-close, 0)", y: "var(--y-close, 0%)" },
            }}
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            transition={{ duration: 0.2 }}
            className="bg-background-primary lg:absolute lg:z-50 lg:border lg:border-border-primary lg:p-2 lg:[--y-close:25%]"
          >
            {navLink.subMenuLinks?.map((navLink, index) => (
              <a key={index} href={navLink.url} className="block px-4 py-2">
                {navLink.title}
              </a>
            ))}
          </motion.nav>
        </AnimatePresence>
      )}
    </div>
  );
};

export const ApplicationShell5Defaults: Props = {
  logo: {
    url: "/",
    src: "https://d22po4pjz3o32e.cloudfront.net/logo-image.svg",
    alt: "Stingr Logo",
  },
  navLinks: [
    { title: "Browse", url: "/browse" },
    { title: "Bookings", url: "/bookings" },
    { title: "Messages", url: "/messages" },
    {
      title: "More",
      url: "#",
      subMenuLinks: [
        { title: "FAQ", url: "/faq" },
        { title: "Support", url: "/support" },
      ],
    },
  ],
};

const topLineVariants = {
  open: { translateY: 8, transition: { delay: 0.1 } },
  rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
  closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
};

const middleLineVariants = {
  open: { width: 0, transition: { duration: 0.1 } },
  closed: { width: "1.5rem", transition: { delay: 0.3, duration: 0.2 } },
};

const bottomLineVariants = {
  open: { translateY: -8, transition: { delay: 0.1 } },
  rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
  closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
};
