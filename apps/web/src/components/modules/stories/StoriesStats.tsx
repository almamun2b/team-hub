import { Card, CardContent } from "@/components/ui/card";

interface StatsProps {
  totalStories: number;
  averageRating: number;
  totalLikes: number;
}

export default function StoriesStats({
  totalStories,
  averageRating,
  totalLikes,
}: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card className="border-0 shadow-3">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {totalStories}+
          </div>
          <p className="text-sm text-muted-foreground">Success Stories</p>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-3">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {averageRating.toFixed(1)}
          </div>
          <p className="text-sm text-muted-foreground">Average Rating</p>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-3">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {totalLikes.toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">Total Likes</p>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-3">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">150+</div>
          <p className="text-sm text-muted-foreground">Countries Visited</p>
        </CardContent>
      </Card>
    </div>
  );
}
