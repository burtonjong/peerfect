import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type PostProps = {
  id: string;
  title: string;
  body: string;
  skill: string;
  created_at: string | null;
};

const Post = ({ id, title, body, skill, created_at }: PostProps) => {
  return (
    <Card key={id} className="mb-8">
      <CardContent>
        <h2 className="text-2xl font-semibold pt-4">{title}</h2>
        <div className="text-sm text-gray-500">
          <span>{new Date(created_at || '').toLocaleDateString()}</span>
        </div>
        <Separator className="my-2" />
        <p className="text-base">{body}</p>
        <div className="mt-4">
          <Badge variant="secondary" className="text-sm rounded-sm">
            {skill}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;
