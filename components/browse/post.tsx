import { useEffect, useState } from "react";

import { User } from "lucide-react";

import { createChat } from "@/app/dashboard/browse/actions";
import Modal from "@/components/browse/modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type PostProps = {
  id: string;
  title: string;
  body: string;
  skill: string;
  created_at: string | null;
  poster_id: string;
  user_id: string;
};

type UserData = {
  username: string;
  avatar_url: string | null;
  points: number;
  created_at: string | null;
};

const Post = ({
  id,
  title,
  body,
  skill,
  created_at,
  poster_id,
  user_id,
}: PostProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStartChat = async () => {
    const formData = new FormData();
    formData.set("post_id", id);
    formData.set("poster_id", poster_id);
    formData.set("responder_id", user_id);
    await createChat(formData);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users/${poster_id}`);
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [poster_id]);

  return (
    <Card key={id} className="relative mb-8">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2
              className="max-w-full truncate text-2xl font-semibold"
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              {title}
            </h2>
            <div className="mt-1 text-sm text-gray-500">
              <span>{new Date(created_at || "").toLocaleDateString()}</span>
            </div>
          </div>
          <div className="absolute right-4 top-4 flex flex-col items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={userData?.avatar_url || ""}
                alt={userData?.username || ""}
              />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <p className="mt-1 text-sm font-semibold">
              {userData?.username || "Anonymous"}
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <p className="text-base">{body}</p>
        <Button onClick={handleOpenModal} className="mt-4">
          View Details
        </Button>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="mb-6 flex items-start justify-between">
            <div className="flex-1">
              <h2 className="mb-2 text-2xl font-bold">{title}</h2>
              <Badge className="mb-2 bg-blue-500 text-xs text-white hover:bg-blue-600">
                {skill}
              </Badge>
              <p className="mb-4 text-sm text-gray-500">
                Posted: {new Date(created_at || "").toLocaleString()}
              </p>
              <p className="mb-4">{body}</p>
              <Button onClick={handleStartChat}>Start Chat</Button>
            </div>
            <div className="ml-6 flex flex-col items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={userData?.avatar_url || ""}
                  alt={userData?.username || ""}
                />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <p className="mt-2 text-lg font-semibold">
                {userData?.username || "Anonymous"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Points: {userData?.points || 0}
              </p>
              <p className="text-sm text-muted-foreground">
                Joined:{" "}
                {new Date(userData?.created_at || "").toLocaleDateString()}
              </p>
            </div>
          </div>
        </Modal>
        <div className="mt-4">
          <Badge variant="secondary" className="rounded-sm text-sm">
            {skill}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;
