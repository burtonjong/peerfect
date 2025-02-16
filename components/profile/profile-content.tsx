"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
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

import Dropdown from "./dropdown";

const profileFormSchema = z.object({
  skillsGoodAt: z.array(z.string()),
  skillsNeedHelpWith: z.array(z.string()),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  skillsGoodAt: [],
  skillsNeedHelpWith: [],
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

  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const { data: skillsData, error } = await supabase
            .from("user_profiles")
            .select("skills_had, skills_needed")
            .eq("id", user.id)
            .single();

          if (error) {
            throw error;
          }

          form.setValue("skillsGoodAt", skillsData.skills_had || []);
          form.setValue("skillsNeedHelpWith", skillsData.skills_needed || []);
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

      try {
        const { error } = await supabase
          .from("user_profiles")
          .update({
            [skillType === "skillsGoodAt" ? "skills_had" : "skills_needed"]:
              updatedSkills,
          })
          .eq("id", user.id);

        if (error) {
          throw error;
        }

        if (skillType === "skillsGoodAt") {
          setNewSkillGoodAt("");
        } else {
          setNewSkillNeedHelpWith("");
        }
      } catch (error) {
        console.error("Failed to update skills", error);
      }
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

    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          [skillType === "skillsGoodAt" ? "skills_had" : "skills_needed"]:
            updatedSkills,
        })
        .eq("id", user.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Failed to update skills", error);
    }
  };

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CardContent>
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
                      <Dropdown
                        enums={availableEnums} // Only enums not selected in either field
                        value={newSkillGoodAt}
                        setter={setNewSkillGoodAt}
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
                      <Dropdown
                        enums={availableEnums} // Same filtered enums here
                        value={newSkillNeedHelpWith}
                        setter={setNewSkillNeedHelpWith}
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
        </form>
      </Form>
    </CardContent>
  );
}
