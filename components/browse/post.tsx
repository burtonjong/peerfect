"use client";

import { useEffect, useState } from "react";

import { CalendarIcon, User } from "lucide-react";

import Modal from "@/components/browse/modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type PostProps = {
  id: string;
  title: string;
  body: string;
  skill: string;
  created_at: string | null;
  author_id: string;
};

type UserData = {
  id: string;
  username: string;
  avatar_url: string | null;
};

const Post = ({ id, title, body, skill, created_at, author_id }: PostProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `${window.location.origin}/api/users/${author_id}`
        );
        const data = await res.json();
        if (data && !data.error) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [author_id]);

  return (
    <Card
      key={id}
      className="mb-8 overflow-hidden shadow-lg transition-shadow hover:shadow-xl"
    >
      <CardHeader className="pb-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="mr-4 text-2xl font-semibold">{title}</h2>
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={userData?.avatar_url || ""}
                alt={userData?.username || ""}
              />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <time dateTime={created_at || ""}>
              {new Date(created_at || "").toLocaleDateString()}
            </time>
          </div>
          <span>{userData?.username || "Anonymous"}</span>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <p className="line-clamp-3 text-base">{body}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm">
          {skill}
        </Badge>
        <Button onClick={handleOpenModal} variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center">
            <Avatar className="mr-3 h-10 w-10">
              <AvatarImage
                src={userData?.avatar_url || ""}
                alt={userData?.username || ""}
              />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">
                {userData?.username || "Anonymous"}
              </p>
              <p className="text-sm text-muted-foreground">Points: 123</p>
              <p className="text-sm text-muted-foreground">
                Joined:{" "}
                {new Date(userData?.created_at || "").toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="mb-4 rounded-full px-3 py-1 text-sm"
          style={{
            backgroundColor: "var(--badge-bg-color, #1e3a8a)", // Darker blue for dark mode
            color: "var(--badge-text-color, #fff)",
          }}
        >
          {skill}
        </Badge>
        <p className="mb-4 flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="mr-1 h-4 w-4" />
          {new Date(created_at || "").toLocaleString()}
        </p>
        <p className="mb-6">{body}</p>
        <Button onClick={() => alert("Start Chat")} className="w-full">
          Start Chat
        </Button>
      </Modal>
    </Card>
  );
};

export default Post;
