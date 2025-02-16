"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import Dropdown from "@/components/profile/dropdown"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tag, Star, Send, X } from "lucide-react"

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
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create Post</h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
          onClick={() => window.history.back()}
        >
          <X size={24} />
        </Button>
      </div>

      {/* Main Form */}
      <Card className="bg-white dark:bg-[#1A1F2C] border-none shadow-lg">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Title Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="text-2xl bg-transparent border-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-0 p-0 focus:bg-gray-50 dark:focus:bg-[#2A2F3C] transition-colors"
                    placeholder="Post title"
                  />
                )}
              />
              {errors.title && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{errors.title.message}</p>}
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
                    className="bg-transparent border-none text-gray-700 dark:text-gray-200 focus:border-none placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-0 p-0 text-lg resize-none focus:bg-gray-50 dark:focus:bg-[#2A2F3C] transition-colors"
                    placeholder="Write your post content here..."
                  />
                )}
              />
              {errors.body && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{errors.body.message}</p>}
            </div>

            {/* Bottom Toolbar */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-[#0F1218]/50">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Skill Dropdown */}
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={16} className="text-[#5B9BF3]" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">Skill</span>
                  </div>
                  <Dropdown enums={enums} value={skill} setter={setSkill} />
                  {errors.skill && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.skill.message}</p>
                  )}
                </div>

                {/* Points Input */}
                <div className="w-32">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={16} className="text-[#5B9BF3]" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">Points</span>
                  </div>
                  <Controller
                    control={control}
                    name="points"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        className="bg-white dark:bg-[#0F1218] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-[#5B9BF3] transition-colors"
                        placeholder="0"
                      />
                    )}
                  />
                  {errors.points && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.points.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#5B9BF3] hover:bg-[#4A8AE2] text-white px-6 py-2 rounded-full ml-auto flex items-center gap-2 h-10"
                >
                  <Send size={16} />
                  {loading ? "Posting..." : "Post"}
                </Button>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

