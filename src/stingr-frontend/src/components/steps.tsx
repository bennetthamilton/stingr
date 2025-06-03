"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { MotionValue, useMotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RxChevronRight } from "react-icons/rx";
import clsx from "clsx";
import React from "react";
import { useRouter } from "next/navigation";

type ImageProps = {
  src: string;
  alt?: string;
};

type FeatureSectionProps = {
  tagline: string;
  heading: string;
  description: string;
  buttons: (ButtonProps & { href?: string })[];
  image: ImageProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  featureSections: FeatureSectionProps[];
};

export type Layout409Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const calculateScales = (totalSections: number, scrollYProgress: MotionValue<number>) => {
  return Array.from({ length: totalSections }, (_, index) => {
    const sectionFraction = 1 / totalSections;
    const start = sectionFraction * index;
    const end = sectionFraction * (index + 1);

    return index < totalSections - 1
      ? useTransform(scrollYProgress, [start, end], [1, 0.8])
      : useMotionValue(1);
  });
};

export const Layout409 = (props: Layout409Props) => {
  const { featureSections } = {
    ...Layout409Defaults,
    ...props,
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end 60%"],
  });

  const scales = calculateScales(featureSections.length, scrollYProgress);

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div ref={containerRef} className="sticky top-0 grid grid-cols-1 gap-6 md:gap-0">
          {featureSections.map((featureSection, index) => (
            <FeatureSection key={index} {...featureSection} scale={scales[index]} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureSection = ({
  scale,
  index,
  ...featureSection
}: FeatureSectionProps & {
  scale: MotionValue<number>;
  index: number;
}) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isEven = index % 2 === 0;

  return (
    <React.Fragment>
      {isMobile ? (
        <div className="static grid grid-cols-1 content-center overflow-hidden border border-border-primary bg-background">
          <FeatureSectionContent isEven={isEven} {...featureSection} />
        </div>
      ) : (
        <motion.div
          className="static grid grid-cols-1 content-center overflow-hidden border border-border-primary bg-background md:sticky md:top-[10%] md:mb-[10vh] md:h-[80vh] md:grid-cols-2"
          style={{ scale }}
        >
          <FeatureSectionContent isEven={isEven} {...featureSection} />
        </motion.div>
      )}
    </React.Fragment>
  );
};

const FeatureSectionContent = ({
  isEven,
  ...featureSection
}: FeatureSectionProps & { isEven: boolean }) => {
  const router = useRouter();

  return (
    <>
      <div
        className={clsx(
          "order-first flex flex-col justify-center p-6 md:p-8 lg:p-12",
          isEven ? "md:order-first" : "md:order-last"
        )}
      >
        <p className="mb-2 font-semibold">{featureSection.tagline}</p>
        <h2 className="rb-5 mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
          {featureSection.heading}
        </h2>
        <p>{featureSection.description}</p>
        <div className="mt-6 flex items-center gap-x-4 md:mt-8">
          {featureSection.buttons.map((button, index) => (
            <Button
              key={index}
              {...button}
              onClick={() => {
                if (button.href) {
                  router.push(button.href);
                }
              }}
            >
              {button.title}
            </Button>
          ))}
        </div>
      </div>
      <div
        className={clsx(
          "order-last flex flex-col items-center justify-center",
          isEven ? "md:order-last" : "md:order-first"
        )}
      >
        <img src={featureSection.image.src} alt={featureSection.image.alt} />
      </div>
    </>
  );
};

export const Layout409Defaults: Props = {
  tagline: "How It Works",
  heading: "A Better Way to Get Tattooed",
  description:
    "We’re reimagining how people find tattoo artists — and how artists connect with new clients. Here’s how Stingr works:",
  featureSections: [
    {
      tagline: "Step 1",
      heading: "Swipe to Find Your Style",
      description:
        "Easily browse portfolios by tattoo style, location, or vibe. Like what you see? Swipe right to save your favorites.",
      buttons: [
        { title: "Browse Artists", variant: "primary", href: "/browse" },
      ],
      image: {
        src: "https://source.unsplash.com/800x600/?tattoo,portfolio",
        alt: "Swiping through artist profiles",
      },
    },
    {
      tagline: "Step 2",
      heading: "Instantly Match & Chat",
      description:
        "When there’s a match, you’ll instantly be able to chat. No awkward emails, no waiting days for a reply.",
      buttons: [
        { title: "Sign Up", variant: "primary", href: "/signup" },
      ],
      image: {
        src: "https://source.unsplash.com/800x600/?chat,mobile-app",
        alt: "Client messaging tattoo artist",
      },
    },
    {
      tagline: "Step 3",
      heading: "Book Your Consultation",
      description:
        "Schedule your consultation or tattoo session directly in the app. Everything happens in one place.",
      buttons: [
        { title: "Create an Account", variant: "primary", href: "/signup" },
      ],
      image: {
        src: "https://source.unsplash.com/800x600/?calendar,booking",
        alt: "Booking screen example",
      },
    },
    {
      tagline: "Step 4",
      heading: "Get Inked With Confidence",
      description:
        "From discovery to booking — Stingr makes the entire process effortless. All that’s left is to show up and get inked.",
      buttons: [
        {
          title: "Explore Artists",
          variant: "link",
          size: "link",
          iconRight: <RxChevronRight />,
          href: "/browse",
        },
      ],
      image: {
        src: "https://source.unsplash.com/800x600/?tattoo-session",
        alt: "Tattoo artist working on a client",
      },
    },
  ],
};
