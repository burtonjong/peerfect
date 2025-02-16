"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import Dropdown from "@/components/profile/dropdown";

const postFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Description is required"),
  points: z.string(), 
  skill: z.string(),
});

type PostFormValues = z.infer<typeof postFormSchema>;

interface CreatePostFormProps {
  enums: string[];
  user: any;
}

export function CreatePostForm({ enums, user }: CreatePostFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skill, setSkill] = useState("");

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      body: "",
      points: "0", 
      skill: "",
    },
  });

  const { handleSubmit, control, formState: { errors } } = form;

  const handleFormSubmit = async (data: PostFormValues) => {
    console.log("ASD")
    setLoading(true);
    setError(null);

    const parsedData = {
      ...data,
      points: Number(data.points),  
      author_id: user.id,
      skill,
    };

    try {
      const res = await fetch(`${window.location.origin}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      });

      const result = await res.json();

      if (res.ok) {
        form.reset();
        setSkill("");
      } else {
        setError(result.error || "An error occurred while creating the post.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent className="border rounded-lg pt-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Create a New Post</h2>
      <Separator className="mb-6" />
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label className="block text-lg font-medium">Title</label>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-4 py-2 border rounded-lg bg-transparent focus:ring focus:ring-blue-500"
              />
            )}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-lg font-medium">Description</label>
          <Controller
            control={control}
            name="body"
            render={({ field }) => (
              <textarea
                {...field}
                rows={6}
                className="w-full px-4 py-2 border rounded-lg bg-transparent focus:ring focus:ring-blue-500"
              />
            )}
          />
          {errors.body && <p className="text-red-500 text-sm">{errors.body.message}</p>}
        </div>

        <div>
          <label className="block text-lg font-medium">Assign Skill</label>
          <Dropdown
            enums={enums}
            value={skill}
            setter={setSkill}
          />
          {errors.skill && <p className="text-red-500 text-sm">{errors.skill.message}</p>}
        </div>

        <div>
          <label className="block text-lg font-medium">Points</label>
          <Controller
            control={control}
            name="points"
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-4 py-2 border rounded-lg bg-transparent focus:ring focus:ring-blue-500"
                type="number"
                min="0"
              />
            )}
          />
          {errors.points && <p className="text-red-500 text-sm">{errors.points.message}</p>}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Post"}
          </Button>
        </div>
      </form>
    </CardContent>
  );
}
