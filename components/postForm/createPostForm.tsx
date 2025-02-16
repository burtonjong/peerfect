"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import Dropdown from "@/components/profile/dropdown"

const postFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Description is required"),
  points: z.string(),
  skill: z.string(),
})

type PostFormValues = z.infer<typeof postFormSchema>

interface CreatePostFormProps {
  enums: string[]
  user: any
}

export function CreatePostForm({ enums, user }: CreatePostFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [skill, setSkill] = useState("")

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      body: "",
      points: "0",
      skill: "",
    },
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form

  const handleFormSubmit = async (data: PostFormValues) => {
    setLoading(true)
    setError(null)

    const parsedData = {
      ...data,
      points: Number(data.points),
      author_id: user.id,
      skill,
    }

    try {
      const res = await fetch(`${window.location.origin}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      })

      const result = await res.json()

      if (res.ok) {
        form.reset()
        setSkill("")
      } else {
        setError(result.error || "An error occurred while creating the post.")
      }
    } catch (err) {
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-3xl py-8">
      <Card className="bg-white dark:bg-background/10 border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none dark:backdrop-blur-sm">
        <CardContent className="pt-6">
          <h2 className="text-3xl select-none font-bold mb-6 text-transparent bg-gradient-to-r from-[#5B9BF3] to-[#8AB4F8] bg-clip-text text-center">
            Create a New Post
          </h2>
          <Separator className="mb-6 bg-gray-200 dark:bg-white/20" />
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-background/20 border border-gray-300 dark:border-white/20 focus:border-blue-500 dark:focus:border-[#5B9BF3] focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-[#5B9BF3]/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                    placeholder="Enter post title"
                  />
                )}
              />
              {errors.title && <p className="text-red-600 dark:text-red-400 text-sm">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
              <Controller
                control={control}
                name="body"
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-background/20 border border-gray-300 dark:border-white/20 focus:border-blue-500 dark:focus:border-[#5B9BF3] focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-[#5B9BF3]/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                    placeholder="Describe your post in detail"
                  />
                )}
              />
              {errors.body && <p className="text-red-600 dark:text-red-400 text-sm">{errors.body.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Assign Skill</label>
              <Dropdown
                enums={enums}
                value={skill}
                setter={setSkill}
              />
              {errors.skill && <p className="text-red-600 dark:text-red-400 text-sm">{errors.skill.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Points</label>
              <Controller
                control={control}
                name="points"
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-background/20 border border-gray-300 dark:border-white/20 focus:border-blue-500 dark:focus:border-[#5B9BF3] focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-[#5B9BF3]/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                    placeholder="Enter points value"
                  />
                )}
              />
              {errors.points && <p className="text-red-600 dark:text-red-400 text-sm">{errors.points.message}</p>}
            </div>

            {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-[#5B9BF3] dark:hover:bg-[#4A8AE2] text-white px-8 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                {loading ? "Submitting..." : "Submit Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

