"use client";

import { useState } from "react";
import {
  Input,
  Label,
  Button,
  Textarea,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@relume_io/relume-ui";
import { BiEnvelope } from "react-icons/bi";
import { GoEye } from "react-icons/go";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: {
    title: string;
    variant?: 'primary' | 'secondary' | 'secondary-alt' | 'tertiary' | 'link' | 'link-alt';
    size?: "primary" | "sm" | "icon" | "link";
  }[];
  image: ImageProps;
};

export type Form4Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Form4 = (props: Form4Props) => {
  const { heading, description, buttons, image } = {
    ...Form4Defaults,
    ...props,
  };

  const [userNameInput, setUserNameInput] = useState("");
  const [aboutInput, setAboutInput] = useState("");
  const [photoInput, setPhotoInput] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [artImages, setArtImages] = useState<string[]>([]);
  const [stylesInput, setStylesInput] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name: userNameInput,
      bio: aboutInput,
      profile_pic: previewUrl || image.src, // In production, use uploaded S3 URL
      art_pictures: artImages,
      styles: stylesInput,
      location: locationInput,
    };

    try {
      const response = await fetch("https://jmhj1f9z4i.execute-api.us-west-2.amazonaws.com/portfolio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Profile updated successfully:", data);
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  const handleArtUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setArtImages((prev) => [...prev, objectUrl]);

    // Replace with S3 upload logic if needed
  };

  return (
    <section id="relume">
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
        {/* Left: Art Upload */}
        <div>
          <h2 className="text-xl font-bold md:text-2xl mb-4">{heading}</h2>
          <p className="mb-4">{description}</p>

          <Label htmlFor="art-upload" className="mb-2 block">Upload Art Image</Label>
          <Input id="art-upload" type="file" onChange={handleArtUpload} />
          {artImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {artImages.map((src, idx) => (
                <div key={idx} className="overflow-hidden rounded-md border">
                  <img src={src} alt={`Art ${idx + 1}`} className="w-full h-32 object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 border border-border-primary px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 items-center">
            <Label className="mb-2">Profile Photo</Label>
            <div className="flex items-center gap-6">
              <div className="size-20 shrink-0 overflow-hidden rounded-full border">
                <img
                  src={previewUrl || image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full"
                />
              </div>
              <Label htmlFor="photo" className="cursor-pointer border border-border-primary px-5 py-2">
                Upload photo
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPhotoInput(file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center">
            <Label htmlFor="userName" className="mb-2">Name</Label>
            <Input id="userName" value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 items-center">
            <Label htmlFor="email" className="mb-2">Email address</Label>
            <Input
              id="email"
              type="email"
              value={emailInput}
              icon={<BiEnvelope className="size-6" />}
              iconPosition="left"
              placeholder="hello@relume.io"
              onChange={(e) => setEmailInput(e.target.value)}
              className="input-icon-left"
            />
          </div>

          <div className="grid grid-cols-1 items-center">
            <Label htmlFor="about" className="mb-2">About</Label>
            <Textarea
              id="about"
              placeholder="Tell us about your art..."
              className="h-auto min-h-[11.25rem] p-3"
              maxLength={263}
              value={aboutInput}
              onChange={(e) => setAboutInput(e.target.value)}
            />
            <p className="mt-2 text-sm">{263 - aboutInput.length} characters left</p>
          </div>

          <div className="grid grid-cols-1 items-center">
            <Label className="mb-2">Styles</Label>
            <Select
              onValueChange={(value) => setStylesInput(value ? [value] : [])}
              value={stylesInput[0] || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a style..." />
              </SelectTrigger>
              <SelectContent className="bg-background text-foreground">
                {[
                  "minimalist",
                  "linework",
                  "traditional",
                  "fine line",
                  "blackwork",
                  "watercolor",
                  "geometric",
                  "neo-traditional",
                  "realism",
                  "stick-and-poke",
                ].map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 items-center">
            <Label htmlFor="location" className="mb-2">Location</Label>
            <Input
              id="location"
              placeholder="City, State"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 items-center">
            <Label htmlFor="password" className="mb-2">Password</Label>
            <div className="flex flex-col space-y-4">
              <Input
                id="password"
                type="password"
                value={passwordInput}
                icon={<GoEye className="size-5" />}
                iconPosition="left"
                placeholder="Current password"
                onChange={(e) => setPasswordInput(e.target.value)}
                className="input-icon-left"
              />
              <Input
                id="newPassword"
                type="password"
                value={newPasswordInput}
                icon={<GoEye className="size-5" />}
                iconPosition="left"
                placeholder="New password"
                onChange={(e) => setNewPasswordInput(e.target.value)}
                className="input-icon-left"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-4 md:mt-6">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                size={button.size}
                title={button.title}
              >
                {button.title}
              </Button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
};

export const Form4Defaults: Props = {
  heading: "Create Your Artist Profile",
  description: "Upload your artwork and tell us about your style. This will help clients get to know your work.",
  buttons: [
    { title: "Cancel", variant: "secondary", size: "sm" },
    { title: "Save Profile", size: "sm" },
  ],
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg",
    alt: "Your profile photo",
  },
};
