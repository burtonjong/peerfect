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
    <Card key={id} className="mb-8">
      <CardContent>
        <h2 className="pt-4 text-2xl font-semibold">{title}</h2>
        <div className="text-sm text-gray-500">
          <span>{new Date(created_at || "").toLocaleDateString()}</span>
        </div>
        <Separator className="my-2" />
        <p className="text-base">{body}</p>
        <Button onClick={handleOpenModal} className="mt-4">
          View Details
        </Button>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="mb-4 text-2xl font-bold">{title}</h2>
          <p className="mb-4 text-gray-600">{skill}</p>
          <p className="mb-4 text-gray-500">
            {new Date(created_at || "").toLocaleString()}
          </p>
          <p className="mb-4">{body}</p>
          {/* Button to start chat here, connect it via on click i guess idk*/}
          <Button onClick={() => handleStartChat()}>Start Chat</Button>
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
