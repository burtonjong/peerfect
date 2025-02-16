import { useState } from "react";

import { createChat } from "@/app/dashboard/browse/actions";
import Modal from "@/components/browse/modal";
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
        <Separator className="my-2" />
        <p className="text-base">{body}</p>
        <Button onClick={handleOpenModal} className="mt-4">
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
       <h2 className="mb-4 text-2xl font-bold">{title}</h2>
          <p className="mb-4 text-gray-600">{skill}</p>
          <p className="mb-4 text-gray-500">
            {new Date(created_at || "").toLocaleString()}
          </p>
          <p className="mb-4">{body}</p>
          {/* Button to start chat here, connect it via on click i guess idk*/}
          <Button onClick={() => handleStartChat()}>Start Chat</Button>
      </Modal>

    </Card>
  );
};

export default Post;
