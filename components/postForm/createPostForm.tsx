"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Star, Tag, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import Dropdown from "@/components/profile/dropdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const handleFormSubmit = async (data: PostFormValues) => {
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
      redirect(`/dashboard/browse?modal=true`);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between px-4">
        <h1 className="animate-fade-in-up text-2xl font-semibold text-gray-900 transition-all dark:text-white">
          Create Post
        </h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
          onClick={() => window.history.back()}
        >
          <X size={24} />
        </Button>
      </div>

      {/* Main Form */}
      <Card className="animate-fade-in-up-2 border-none bg-white shadow-lg transition-all dark:bg-[#1A1F2C]">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Title Section */}
            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="border-none border-transparent bg-transparent p-0 text-2xl text-gray-900 transition-colors placeholder:text-gray-400 focus:border-transparent focus:bg-gray-50 focus:outline-none focus:ring-0 dark:text-white dark:placeholder:text-gray-500 dark:focus:bg-[#2A2F3C]"
                    placeholder="Post title"
                  />
                )}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Body Section */}
            <div className="p-6">
              <Controller
                control={control}
                name="body"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    rows={12}
                    className="resize-none border-none border-transparent bg-transparent p-0 text-lg text-gray-700 transition-colors placeholder:text-gray-400 focus:border-none focus:border-transparent focus:bg-gray-50 focus:outline-none focus:ring-0 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:bg-[#2A2F3C]"
                    placeholder="Write your post content here..."
                  />
                )}
              />
              {errors.body && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                  {errors.body.message}
                </p>
              )}
            </div>

            {/* Bottom Toolbar */}
            <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#0F1218]/50">
              <div className="flex flex-wrap items-center gap-4">
                {/* Skill Dropdown */}
                <div className="min-w-[200px] flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Tag size={16} className="text-[#5B9BF3]" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      Skill
                    </span>
                  </div>
                  <Dropdown enums={enums} value={skill} setter={setSkill} />
                  {errors.skill && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {errors.skill.message}
                    </p>
                  )}
                </div>

                {/* Points Input */}
                <div className="w-32">
                  <div className="mb-2 flex items-center gap-2">
                    <Star size={16} className="text-[#5B9BF3]" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      Points
                    </span>
                  </div>
                  <Controller
                    control={control}
                    name="points"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        className="border-gray-300 bg-white text-gray-900 transition-colors placeholder:text-gray-400 focus:border-[#5B9BF3] focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-[#0F1218] dark:text-white dark:placeholder:text-gray-500"
                        placeholder="0"
                      />
                    )}
                  />
                  {errors.points && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {errors.points.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="ml-auto flex h-10 items-center gap-2 rounded-full bg-[#5B9BF3] px-6 py-2 text-white hover:bg-[#4A8AE2]"
                >
                  <Send size={16} />
                  {loading ? "Posting..." : "Post"}
                </Button>
              </div>

              {error && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-500/20 dark:bg-red-500/10">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
