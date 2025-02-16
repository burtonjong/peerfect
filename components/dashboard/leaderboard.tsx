"use client";

import { useCallback, useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { Separator } from "../ui/separator";

interface Leader {
  id: string;
  username: string;
  email: string;
  points: number;
  skills_had: string[];
  created_at: string;
}

const getPositionColor = (position: number) => {
  switch (position) {
    case 1:
      return "bg-yellow-500";
    case 2:
      return "bg-gray-300";
    case 3:
      return "bg-amber-600";
    default:
      return "bg-gray-500";
  }
};

const getBorderColor = (position: number) => {
  switch (position) {
    case 1:
      return "border-2 border-primary";
    case 2:
      return "border-2 border-[#004F90]";
    case 3:
      return "border-2 border-[#004277]";
    default:
      return "";
  }
};

export default function Leaderboard({
  leaderboard,
}: {
  leaderboard: Leader[];
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleHoverStart = useCallback((id: string) => {
    setHoveredId(id);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredId(null);
  }, []);

  if (!mounted) {
    return null; // or a loading placeholder
  }

  const topTenLeaders = leaderboard.slice(0, 10);

  return (
    <>
      <h2 className="mb-3 font-brand text-2xl font-semibold">
        Peerfect Leaderboard
      </h2>
      <Separator className="mb-4" />
      <div className="space-y-4">
        {topTenLeaders.length > 0 ? (
          topTenLeaders.map((leader, index) => (
            <div
              key={leader.id}
              className="animate-fade-in-up translate-y-4"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => handleHoverStart(leader.id)}
              onMouseLeave={handleHoverEnd}
            >
              <Card
                className={`overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg ${getBorderColor(index + 1)}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${getPositionColor(index + 1)} font-bold text-white`}
                    >
                      {index + 1}
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${leader.username}`}
                        alt={leader.username}
                      />
                      <AvatarFallback>
                        {leader.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h3
                        className={`text-xl font-semibold ${index < 3 ? "text-primary" : "text-foreground"}`}
                      >
                        {leader.username}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {leader.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-2xl font-bold ${index < 3 ? "text-primary" : "text-foreground"}`}
                      >
                        {leader.points}
                      </span>
                      <p className="text-sm text-muted-foreground">points</p>
                    </div>
                  </div>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredId === leader.id ? "auto" : 0,
                      opacity: hoveredId === leader.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 overflow-hidden"
                  >
                    <p className="mb-2 text-sm text-muted-foreground">
                      Skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {leader.skills_had.length > 0 ? (
                        leader.skills_had.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground">
                          No skills to display yet.
                        </p>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Joined: {new Date(leader.created_at).toLocaleDateString()}
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No leaders to display yet.</p>
        )}
      </div>
    </>
  );
}
