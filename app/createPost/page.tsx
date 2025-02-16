'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export default function CreatePost() {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await fetch(`${window.location.origin}/api/skills`);
      const data = await res.json();
      if (data && !data.error) {
        setSkills(data);
      }
    };

    fetchSkills();
  }, []);

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    skills: [] as string[],
    points: 0, 
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (postData.skills.length === 0) {
      setDropdownOpen(true); // Open dropdown when no skill is selected
    }
  }, [postData.skills]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSkillSelect = (skill: string) => {
    setPostData((prevData) => ({
      ...prevData,
      skills: [skill], // Only allow one skill to be selected
    }));
    setDropdownOpen(false); // Close dropdown once a skill is selected
  };

  const handleRemoveSkill = () => {
    setPostData((prevData) => ({
      ...prevData,
      skills: [],
    }));
    setDropdownOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Post created:', postData);
    setPostData({
      title: '',
      content: '',
      category: '',
      tags: '',
      skills: [],
      points: 0, 
    });
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container min-w-[750px] mx-auto px-4 py-8 flex justify-center">
      <div className="border shadow-lg rounded-lg p-6 max-w-lg w-full relative">
        <h2 className="text-3xl font-bold mb-6 text-center">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg bg-transparent focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Description</label>
            <textarea
              name="content"
              value={postData.content}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-2 border rounded-lg bg-transparent focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Assign Skill</label>
            <div className="flex items-center gap-4 mt-1">
              <Button variant="outline" onClick={handleDropdownToggle}>
                <Plus className="mr-2 h-4 w-4" /> Add Skill
              </Button>
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {postData.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2">
                    {skill}
                    <button type="button" onClick={handleRemoveSkill} className="text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {dropdownOpen && (
              <div className="absolute mt-2 bg-blue-50 border border-blue-200 rounded-lg shadow-lg w-40 z-10 max-h-40 overflow-y-auto rounded-b-lg">
                {skills.filter((skill) => !postData.skills.includes(skill)).map((skill) => (
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

          <div>
            <label className="block text-lg font-medium">Points</label>
            <input
              type="number"
              name="points"
              value={postData.points}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg bg-transparent focus:ring focus:ring-blue-500"
              min="0"
              required
            />
          </div>

          <div className="flex justify-center">
            <Button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Submit Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
