"use client";

import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { useRouter } from "next/navigation";

type Props = {
  loginText: string;
  loginLink: {
    text: string;
    url: string;
  };
  title: string;
  description: string;
  artistSignUpButton: ButtonProps;
  // clientSignUpButton: ButtonProps;
  footerText: string;
};

export type Signup1Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Signup1 = (props: Signup1Props) => {
  const {
    loginText,
    loginLink,
    title,
    description,
    artistSignUpButton,
    // clientSignUpButton,
    footerText,
  } = {
    ...Signup1Defaults,
    ...props,
  };

  const router = useRouter();

  return (
    <section id="relume" className="px-[5%]">
      <div className="relative flex min-h-svh flex-col justify-center overflow-auto py-24 lg:pb-24 lg:pt-16">
        <div className="absolute left-0 right-0 top-0 flex h-16 items-center justify-between md:h-18">
          <div className="inline-flex gap-x-1">
            <p className="hidden md:block">{loginText}</p>
            <a href={loginLink.url} className="underline">
              {loginLink.text}
            </a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <div className="rb-6 mb-6 text-center md:mb-8">
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{title}</h1>
            <p className="md:text-md">{description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Button
              variant={artistSignUpButton.variant}
              size={artistSignUpButton.size}
              iconLeft={artistSignUpButton.iconLeft}
              iconRight={artistSignUpButton.iconRight}
              onClick={() => router.push("/signup/artist")}
            >
              {artistSignUpButton.title}
            </Button>
            {/* <Button
              variant={clientSignUpButton.variant}
              size={clientSignUpButton.size}
              iconLeft={clientSignUpButton.iconLeft}
              iconRight={clientSignUpButton.iconRight}
              onClick={() => router.push("/signup/client")}
            >
              {clientSignUpButton.title}
            </Button> */}
          </div>
        </div>
        <footer className="absolute bottom-0 left-0 right-0 flex h-16 items-center justify-center md:h-18">
          <p className="text-sm">{footerText}</p>
        </footer>
      </div>
    </section>
  );
};

export const Signup1Defaults: Props = {
  loginText: "Already have an account?",
  loginLink: {
    text: "Log In",
    url: "/login",
  },
  title: "Sign Up",
  description: "Create your account and start discovering artists who match your style.",
  artistSignUpButton: {
    title: "Sign Up as Artist",
    variant: "primary",
  },
  // clientSignUpButton: {
  //   title: "Sign Up as Client",
  //   variant: "secondary",
  // },
  footerText: "© 2025 Stingr. All rights reserved.",
};
