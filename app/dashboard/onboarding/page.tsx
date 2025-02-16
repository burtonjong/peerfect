"use client";

import React, { useState } from "react";

export default function Onboarding() {
  const [teachSkills, setTeachSkills] = useState("");
  const [learnSkills, setLearnSkills] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Skills to teach:", teachSkills);
    console.log("Skills to learn:", learnSkills);
  };

  return (
    <div className="onboarding-container">
      <h1>Welcome to the Skills Exchange Platform!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teachSkills">Skills you can teach:</label>
          <input
            type="text"
            id="teachSkills"
            value={teachSkills}
            onChange={(e) => setTeachSkills(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="learnSkills">Skills you want to learn:</label>
          <input
            type="text"
            id="learnSkills"
            value={learnSkills}
            onChange={(e) => setLearnSkills(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
