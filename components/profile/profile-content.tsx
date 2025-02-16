"use client";

import { useState } from "react";

import { Plus, X } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface ProfileContentProps {
  form: UseFormReturn<{
    firstName: string;
    lastName: string;
    age: number;
    bio: string;
    skillsGoodAt: string[];
    skillsNeedHelpWith: string[];
    isAvailableToHelp: boolean;
    isLookingForHelp: boolean;
  }>;
  onSubmit: (data: any) => void;
}

export function ProfileContent({ form, onSubmit }: ProfileContentProps) {
  const [newSkillGoodAt, setNewSkillGoodAt] = useState("");
  const [newSkillNeedHelpWith, setNewSkillNeedHelpWith] = useState("");

  const addSkill = (skillType: "skillsGoodAt" | "skillsNeedHelpWith") => {
    const newSkill =
      skillType === "skillsGoodAt" ? newSkillGoodAt : newSkillNeedHelpWith;
    if (newSkill.trim() !== "") {
      form.setValue(skillType, [...form.getValues(skillType), newSkill.trim()]);
      if (skillType === "skillsGoodAt") {
        setNewSkillGoodAt("");
      } else {
        setNewSkillNeedHelpWith("");
      }
    }
  };

  const removeSkill = (
    skillType: "skillsGoodAt" | "skillsNeedHelpWith",
    skillToRemove: string
  ) => {
    form.setValue(
      skillType,
      form.getValues(skillType).filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about yourself" {...field} />
                </FormControl>
                <FormDescription>
                  Write a short bio about yourself. This will be visible to
                  other users.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name="skillsGoodAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills You're Good At</FormLabel>
                <FormControl>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {field.value.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill("skillsGoodAt", skill)}
                          className="ml-2 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <div className="flex items-center">
                      <Input
                        value={newSkillGoodAt}
                        onChange={(e) => setNewSkillGoodAt(e.target.value)}
                        placeholder="Add a skill"
                        className="h-8 w-32"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addSkill("skillsGoodAt")}
                        className="ml-2"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Add the skills you can offer help with.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skillsNeedHelpWith"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills You Need Help With</FormLabel>
                <FormControl>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {field.value.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {skill}
                        <button
                          type="button"
                          onClick={() =>
                            removeSkill("skillsNeedHelpWith", skill)
                          }
                          className="ml-2 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <div className="flex items-center">
                      <Input
                        value={newSkillNeedHelpWith}
                        onChange={(e) =>
                          setNewSkillNeedHelpWith(e.target.value)
                        }
                        placeholder="Add a skill"
                        className="h-8 w-32"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addSkill("skillsNeedHelpWith")}
                        className="ml-2"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Add the skills you're looking to improve.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="isAvailableToHelp"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Available to Help
                    </FormLabel>
                    <FormDescription>
                      Make yourself available to help others with your skills.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isLookingForHelp"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Looking for Help
                    </FormLabel>
                    <FormDescription>
                      Indicate if you're currently seeking help from others.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Update Profile</Button>
        </form>
      </Form>
    </CardContent>
  );
}
