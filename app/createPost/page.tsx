"use client";

import { useEffect, useState } from "react";

import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";

//placeholder for now
const skills = ["python", "java", "c", "javascript"];

export default function CreatePost() {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    skills: [] as string[],
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setDropdownOpen(false);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSkillSelect = (skill: string) => {
    if (!postData.skills.includes(skill)) {
      setPostData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, skill],
      }));
    }
    setDropdownOpen(false);
  };

  const handleRemoveSkill = (skill: string) => {
    setPostData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((item) => item !== skill),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPostData({
      title: "",
      content: "",
      category: "",
      tags: "",
      skills: [],
    });
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container mx-auto flex min-w-[750px] justify-center px-4 py-8">
      <div className="relative w-full max-w-lg rounded-lg border p-6 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold">
          Create a New Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-transparent px-4 py-2 focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Content</label>
            <textarea
              name="content"
              value={postData.content}
              onChange={handleInputChange}
              rows={6}
              className="w-full rounded-lg border bg-transparent px-4 py-2 focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Skills</label>
            <div className="mt-2 flex items-center gap-4">
              <Button variant="outline" onClick={handleDropdownToggle}>
                <Plus className="mr-2 h-4 w-4" /> Add Skill
              </Button>
              <div className="flex min-h-[40px] flex-wrap gap-2">
                {postData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-blue-700"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-48 rounded-lg border border-blue-200 bg-blue-50 shadow-lg">
                {skills
                  .filter((skill) => !postData.skills.includes(skill))
                  .map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillSelect(skill)}
                      className="block w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-100"
                    >
                      {skill}
                    </button>
                  ))}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            >
              Submit Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
