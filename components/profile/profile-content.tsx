"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";

import SpecialDropdown from "./specialdropdown";

const profileFormSchema = z.object({
  skillsGoodAt: z.array(z.string()),
  skillsNeedHelpWith: z.array(z.string()),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  skillsGoodAt: [],
  skillsNeedHelpWith: [],
  bio: "",
};

export function ProfileContent({ user, enums }: { user: any; enums: any }) {
  const supabase = createClient();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const selectedSkillsGoodAt = form.watch("skillsGoodAt");
  const selectedSkillsNeedHelpWith = form.watch("skillsNeedHelpWith");

  const allSelectedSkills = [
    ...selectedSkillsGoodAt,
    ...selectedSkillsNeedHelpWith,
  ];

  const availableEnums = enums.filter(
    (skill: string) => !allSelectedSkills.includes(skill)
  );

  const [loading, setLoading] = useState(true);
  const [newSkillGoodAt, setNewSkillGoodAt] = useState("");
  const [newSkillNeedHelpWith, setNewSkillNeedHelpWith] = useState("");
  const [isEditing, setIsEditing] = useState(false); // state for toggling between edit and view mode

  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const { data, error } = await supabase
            .from("user_profiles")
            .select("skills_had, skills_needed, bio")
            .eq("id", user.id)
            .single();

          if (error) {
            throw error;
          }

          form.setValue("skillsGoodAt", data.skills_had || []);
          form.setValue("skillsNeedHelpWith", data.skills_needed || []);
          form.setValue("bio", data.bio || "");
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [form, user]);

  const addSkill = async (skillType: "skillsGoodAt" | "skillsNeedHelpWith") => {
    const newSkill =
      skillType === "skillsGoodAt" ? newSkillGoodAt : newSkillNeedHelpWith;
    if (newSkill.trim() !== "") {
      const updatedSkills = [...form.getValues(skillType), newSkill.trim()];
      form.setValue(skillType, updatedSkills);
      skillType === "skillsGoodAt"
        ? setNewSkillGoodAt("")
        : setNewSkillNeedHelpWith("");
    }
  };

  const removeSkill = async (
    skillType: "skillsGoodAt" | "skillsNeedHelpWith",
    skillToRemove: string
  ) => {
    const updatedSkills = form
      .getValues(skillType)
      .filter((skill) => skill !== skillToRemove);
    form.setValue(skillType, updatedSkills);
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async (data: ProfileFormValues) => {
    try {
      console.log(data);
      const { error } = await supabase
        .from("user_profiles")
        .update({
          skills_had: data.skillsGoodAt,
          skills_needed: data.skillsNeedHelpWith,
          bio: data.bio,
        })
        .eq("id", user.id);

      if (error) {
        throw error;
      }
      setIsEditing(false); // exit edit mode after saving
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    if (isEditing) {
      handleSave(data); // Save data if editing
    }
  };

  if (loading) {
    return null;
  }

  return (
    <CardContent>
      <Separator className="mb-6" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        {isEditing ? (
                          <button
                            type="button"
                            onClick={() => removeSkill("skillsGoodAt", skill)}
                            className="ml-2 focus:outline-none"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        ) : null}
                      </Badge>
                    ))}
                    <div className="flex items-center">
                      <SpecialDropdown
                        isEditing={isEditing}
                        enums={availableEnums} // Only enums not selected in either field
                        value={newSkillGoodAt}
                        setter={setNewSkillGoodAt}
                      />
                      {isEditing ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addSkill("skillsGoodAt")}
                          className="ml-2"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      ) : null}
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
          <Separator />
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
                      <SpecialDropdown
                        isEditing={isEditing}
                        enums={availableEnums} // Same filtered enums here
                        value={newSkillNeedHelpWith}
                        setter={setNewSkillNeedHelpWith}
                      />
                      {isEditing ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addSkill("skillsNeedHelpWith")}
                          className="ml-2"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      ) : null}
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
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Bio</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full rounded border border-gray-300 p-2"
                    placeholder="Tell us about yourself"
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormDescription>
                  Write something about yourself.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />

          {isEditing ? (
            <Button
              type="button"
              onClick={() => form.handleSubmit(onSubmit)()}
              className="mt-4"
              variant="outline"
            >
              Save
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleEdit}
              className="mt-4"
              variant="outline"
            >
              Edit
              <Edit className="ml-2" />
            </Button>
          )}
        </form>
      </Form>
    </CardContent>
  );
}
