import Link from "next/link";

import { Search, Send } from "lucide-react";

import { Button } from "../ui/button";

export default function RecentChats({
  conversations,
  userId,
  formatDateToLocaleString,
}: {
  conversations: any[];
  userId: string;
  formatDateToLocaleString: (date: string) => string;
}) {
  return (
    <>
      <h2 className="mb-4 font-brand text-2xl font-semibold">
        Your Recent Chats
      </h2>
      <div className="mb-12 space-y-4">
        {conversations && conversations.length > 0 ? (
          conversations.map((conversation) => {
            const otherUser =
              conversation.poster_id.id === userId
                ? conversation.responder_id
                : conversation.poster_id;
            return (
              <div key={conversation.id} className="rounded-lg border p-4">
                <span className="text-sm text-muted-foreground">
                  {formatDateToLocaleString(conversation.created_at)}
                </span>
                <h3 className="text-xl font-semibold">
                  {conversation.post_id.title}
                </h3>
                <p className="text-gray-600">With {otherUser.username}</p>
                <div className="space-x-2">
                  <Link
                    href={`/dashboard/${conversation.post_id.id}/chat`}
                    passHref
                  >
                    <Button className="mt-4">
                      <Send className="mr-2 h-4 w-4" /> Chat
                    </Button>
                  </Link>
                  <Button variant="outline" className="mt-4">
                    <Search className="mr-2 h-4 w-4" /> View Listing
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600">You have not created any posts yet.</p>
        )}
      </div>
    </>
  );
}
