"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@relume_io/relume-ui";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiCheck } from "react-icons/bi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Enter a valid email").min(1),
  bio: z.string().min(1, { message: "Bio is required" }),
  profile_pic: z.string().url("Must be a valid URL").min(1),
  art_pictures: z.array(z.string().url()).min(1, { message: "At least one art image is required" }),
  styles: z.array(z.string()).min(1, { message: "Select at least one style" }),
  location: z.string().min(1, { message: "Location is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface StepProps {
  form: ReturnType<typeof useForm<FormValues>>;
  addArtPicture?: (url: string) => void;
}

export const MultiForm13 = () => {
  const [step, setStep] = useState(0);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      profile_pic: "",
      art_pictures: [],
      styles: [],
      location: "",
    },
    mode: "onChange",
  });

  const addArtPicture = (url: string) => {
    const current = form.getValues("art_pictures");
    form.setValue("art_pictures", [...current, url]);
  };

  const onSubmit = async (values: FormValues) => {
    const res = await fetch("https://jmhj1f9z4i.execute-api.us-west-2.amazonaws.com/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      alert("Profile created!");
    } else {
      alert("Failed to create profile.");
    }
  };

  const steps = [
    { component: StepOne, fields: ["name", "email", "bio"] },
    { component: StepTwo, fields: ["profile_pic", "art_pictures"] },
    { component: StepThree, fields: ["styles", "location"] },
  ] as const;

  const Step = steps[step].component;
  const currentFields = steps[step].fields;
  const totalSteps = steps.length;
  const isLastStep = step === steps.length - 1;
  const isFirstStep = step === 0;

  const handleNext = async () => {
    const output = await form.trigger(currentFields);
    if (output) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-md">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isLastStep) {
                handleNext();
              } else {
                form.handleSubmit(onSubmit)();
              }
            }}
          >
            {/* <ProgressBar step={step} totalSteps={totalSteps} /> */}
            <Step form={form} addArtPicture={addArtPicture} />
            <StepAction isFirstStep={isFirstStep} isLastStep={isLastStep} handlePrev={handlePrev} />
          </form>
        </Form>
      </div>
    </section>
  );
};

// const ProgressBar = ({ step, totalSteps }: { step: number; totalSteps: number }) => {
//   return (
//     <div className="relative mb-8 flex justify-between before:absolute before:left-0 before:top-1/2 before:-z-10 before:h-px before:w-full before:-translate-y-1/2 before:bg-border-primary">
//       {Array.from({ length: totalSteps }, (_, index) => (
//         <div
//           key={index}
//           className={clsx(
//             "flex size-8 items-center justify-center rounded-full border border-border-primary",
//             step >= index
//               ? "bg-background-alternative text-text-alternative"
//               : "bg-white text-text-primary",
//           )}
//         >
//           {step > index ? <BiCheck className="size-6" /> : index + 1}
//         </div>
//       ))}
//     </div>
//   );
// };

const StepAction = ({
  isFirstStep,
  isLastStep,
  handlePrev,
}: {
  isFirstStep: boolean;
  isLastStep: boolean;
  handlePrev: () => void;
}) => (
  <div className="mt-6 flex flex-wrap justify-end gap-4">
    <Button
      type="button"
      variant="secondary"
      onClick={() => {
        if (!isFirstStep) {
          handlePrev();
        }
      }}
    >
      {isFirstStep ? "Cancel" : "Back"}
    </Button>
    <Button type="submit">{isLastStep ? "Create Profile" : "Next"}</Button>
  </div>
);

const StepOne: React.FC<StepProps> = ({ form }) => (
  <>
    <FormField name="name" control={form.control} render={({ field }) => (
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl><Input {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
    <FormField name="email" control={form.control} render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl><Input {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
    <FormField name="bio" control={form.control} render={({ field }) => (
      <FormItem>
        <FormLabel>Short Bio</FormLabel>
        <FormControl><Input {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
  </>
);

const StepTwo: React.FC<StepProps> = ({ form }) => {
  const tattooStyles = [
    "minimalist",
    "stick-and-poke",
    "handpoke",
    "blackwork",
    "color",
  ];

  return (
    <>
      <FormField
        name="styles"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pick your styles</FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {tattooStyles.map((style) => (
                  <Button
                    key={style}
                    type="button"
                    variant={field.value.includes(style) ? "primary" : "secondary"}
                    onClick={() =>
                      field.onChange(
                        field.value.includes(style)
                          ? field.value.filter((s: string) => s !== style)
                          : [...field.value, style]
                      )
                    }
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="location"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const StepThree: React.FC<StepProps> = ({ form, addArtPicture }) => (
  <>
    <FormField name="profile_pic" control={form.control} render={({ field }) => (
      <FormItem>
        <FormLabel>Profile Picture URL</FormLabel>
        <FormControl><Input {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
    <FormItem>
      <FormLabel>Art Portfolio Image URLs</FormLabel>
      <Input
        placeholder="Paste image URL & press enter"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const input = e.target as HTMLInputElement;
            const url = input.value;
            if (url) addArtPicture?.(url);
            input.value = "";
          }
        }}
      />
    </FormItem>
  </>
);
