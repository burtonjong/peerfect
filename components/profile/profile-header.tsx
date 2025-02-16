"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";

export function ProfileHeader({ user }: { user: any }) {
  const supabase = createClient();

  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    points: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        if (user) {
          const { data: userProfile, error } = await supabase
            .from("user_profiles")
            .select("username, email, points")
            .eq("id", user.id)
            .single();

          if (error) {
            throw error;
          }

          setUserData({
            username: userProfile.username,
            email: userProfile.email,
            points: userProfile.points,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-72 flex-row items-center justify-center space-y-4">
        <span className="text-2xl">Loading...</span>
      </div>
    );
  }

  if (!userData) {
    return <div>Failed to load user data</div>;
  }

  return (
    <CardHeader>
      <div className="flex flex-row justify-between space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${userData.username}`}
              alt="Profile picture"
            />
            <AvatarFallback>
              {userData.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="pb-1">{userData.username}</CardTitle>
            <CardDescription>{userData.email}</CardDescription>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <CardDescription className="text-xl">Your points: </CardDescription>
          <CardTitle className="pb-1 text-2xl text-primary">
            {userData.points}
          </CardTitle>
        </div>
      </div>
    </CardHeader>
  );
}
