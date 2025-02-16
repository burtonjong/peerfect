"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ProfileContent } from "@/components/profile/profile-content";
import { ProfileHeader } from "@/components/profile/profile-header";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  age: z.number().min(18, {
    message: "You must be at least 18 years old.",
  }),
  bio: z.string().max(500, {
    message: "Bio must not be longer than 500 characters.",
  }),
  skillsGoodAt: z.array(z.string()),
  skillsNeedHelpWith: z.array(z.string()),
  isAvailableToHelp: z.boolean(),
  isLookingForHelp: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  firstName: "",
  lastName: "",
  age: 18,
  bio: "",
  skillsGoodAt: [],
  skillsNeedHelpWith: [],
  isAvailableToHelp: false,
  isLookingForHelp: false,
};

export default function ProfilePage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    Toaster({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    console.log(data);
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <ProfileHeader />
        <ProfileContent form={form} onSubmit={onSubmit} />
      </Card>
    </div>
  );
}
