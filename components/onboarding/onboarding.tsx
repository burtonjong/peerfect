"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Onboarding({
  enums,
  userId,
}: {
  enums: string[];
  userId: string;
}) {
  if (!enums) {
    enums = [];
  }
  const [step, setStep] = useState(1);
  const [skillsGoodAt, setSkillsGoodAt] = useState<string[]>([]);
  const [skillsNeedHelpWith, setSkillsNeedHelpWith] = useState<string[]>([]);

  const addSkill = (skillType: "good" | "help", skill: string) => {
    if (skillType === "good") {
      setSkillsGoodAt((prev) => [...prev, skill]);
    } else {
      setSkillsNeedHelpWith((prev) => [...prev, skill]);
    }
  };

  const removeSkill = (skillType: "good" | "help", skillToRemove: string) => {
    if (skillType === "good") {
      setSkillsGoodAt((prev) =>
        prev.filter((skill) => skill !== skillToRemove)
      );
    } else {
      setSkillsNeedHelpWith((prev) =>
        prev.filter((skill) => skill !== skillToRemove)
      );
    }
  };

  const availableSkills = enums.filter(
    (skill: string) =>
      !skillsGoodAt.includes(skill) && !skillsNeedHelpWith.includes(skill)
  );

  const handleNext = () => {
    if (step === 1 && skillsGoodAt.length > 0) {
      setStep(2);
    } else if (step === 2) {
      console.log("Skills you're good at:", skillsGoodAt);
      console.log("Skills you need help with:", skillsNeedHelpWith);
      // Here you would typically submit the data to your backend
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-primary">
            {step === 1
              ? "What skills are you good at?"
              : "What skills do you need help with?"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <ScrollArea className="h-[100px] w-full rounded-md border p-4">
                <div className="flex flex-wrap gap-2">
                  {(step === 1 ? skillsGoodAt : skillsNeedHelpWith).map(
                    (skill, index) => (
                      <Badge
                        key={index}
                        variant={step === 1 ? "secondary" : "outline"}
                        className="text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() =>
                            removeSkill(step === 1 ? "good" : "help", skill)
                          }
                          className="ml-2 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )
                  )}
                </div>
              </ScrollArea>
              <div className="h-[200px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  {availableSkills.map((skill) => (
                    <Button
                      key={skill}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        addSkill(step === 1 ? "good" : "help", skill)
                      }
                      className="justify-start"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleNext}
            className="w-full"
            disabled={step === 1 && skillsGoodAt.length === 0}
          >
            {step === 1 ? "Next" : "Finish"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
