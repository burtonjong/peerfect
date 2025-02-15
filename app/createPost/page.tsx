'use client';

import { useState } from 'react';

const skills = [
  "python",
  "java",
  "c",
  "javascript"
];

export default function CreatePost() {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    skills: [] as string[], 
  });

  const [dropdownOpen, setDropdownOpen] = useState(false); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    console.log('Post created:', postData);
    setPostData({
        title: '',
        content: '',
        category: '',
        tags: '',
        skills: [],
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Create a New Post</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={postData.content}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Skills</label>
          <div className="flex items-center mt-2">
            <button
              type="button"
              className="flex items-center text-blue-500 border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Add Skill
            </button>

            <div className="ml-4 flex flex-wrap gap-2">
              {postData.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-lg font-medium text-gray-700 bg-blue-100 px-2 py-1 rounded-full flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            {dropdownOpen && (
              <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-48 z-10">
                {skills
                  .filter((skill) => !postData.skills.includes(skill)) 
                  .map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillSelect(skill)}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100"
                    >
                      {skill}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
}
