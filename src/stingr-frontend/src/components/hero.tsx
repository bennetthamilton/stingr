"use client";

import { Button, Input } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  inputPlaceholder?: string;
  button: ButtonProps;
  image: ImageProps;
  termsAndConditions: string;
};

export type Header6Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header6 = (props: Header6Props) => {
  const {
    heading,
    description,
    button,
    inputPlaceholder,
    image,
    // termsAndConditions,
  } = {
    ...Header6Defaults,
    ...props,
  };

  const [emailInput, setEmailInput] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ emailInput });
  };

  const router = useRouter();

  const handleSignUpClick = () => {
    router.push("/signup");
  };

  return (
    <section id="hero" className="relative px-6 md:px-12 lg:px-[5%]">
      <div className="container relative z-10 mx-auto">
        <div className="flex max-h-[60rem] min-h-screen items-center py-16 md:py-24 lg:py-28">
          <div className="max-w-xl">
            <h1 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground">
              {heading}
            </h1>
            <p className="text-lg md:text-xl font-body text-foreground">
              {description}
            </p>
            <div className="mt-6 w-full max-w-sm md:mt-8">
              <form
                onSubmit={handleSubmit}
                className="mb-4 grid grid-cols-1 gap-y-3 sm:grid-cols-[1fr_auto] sm:gap-4"
              >
                <Input
                  id="email"
                  type="email"
                  placeholder={inputPlaceholder}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <Button {...button} type="button" onClick={handleSignUpClick}>
                  {button.title}
                </Button>
              </form>
              {/* <div
                className="text-xs text-foreground font-body"
                dangerouslySetInnerHTML={{ __html: termsAndConditions }}
              /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Background Image + Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={image.src}
          className="h-full w-full object-cover"
          alt={image.alt}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
};

export const Header6Defaults: Props = {
  heading: "Swipe. Match. Tattoo.",
  description:
    "Stingr connects you with talented tattoo artists who match your style and vision. Experience a seamless journey from discovery to booking your next tattoo.",
  inputPlaceholder: "Enter your email",
  button: {
    title: "Sign Up",
    variant: "primary",
    size: "link",
  },
  termsAndConditions: `
    <p>
      By clicking Sign Up you agree to our
      <a href='#' class='underline ml-1'>Terms and Conditions</a>.
    </p>
  `,
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Tattoo artist background",
  },
};
