import Link from "next/link";

import { Search, Send } from "lucide-react";

import { Button } from "../ui/button";

export default function YourPosts({
  usersPosts,
  conversations,
  formatDateToLocaleString,
}: {
  usersPosts: any[];
  conversations: any[];
  formatDateToLocaleString: (date: string) => string;
}) {
  return (
    <>
      <h2 className="mb-4 pb-2 font-brand text-2xl font-semibold">
        Your Posts
      </h2>
      <div className="mb-12 space-y-4">
        {usersPosts && usersPosts.length > 0 ? (
          usersPosts.map((post: any) => (
            <div key={post.id} className="rounded-lg border p-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600">
                Posted {formatDateToLocaleString(post.created_at)}
              </p>
              <div className="space-x-2">
                {conversations?.some(
                  (conversation) => conversation.post_id.id === post.id
                ) ? (
                  <>
                    <Link href={`/dashboard/${post.id}/chat`} passHref>
                      <Button className="mt-4">
                        <Send className="mr-2 h-4 w-4" /> Chat
                      </Button>
                    </Link>
                    <Button variant="outline" className="mt-4">
                      <Search className="mr-2 h-4 w-4" /> View Listing
                    </Button>
                  </>
                ) : (
                  <Button className="mt-4">
                    <Search className="mr-2 h-4 w-4" /> View Listing
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">You have not created any posts yet.</p>
        )}
      </div>
    </>
  );
}
