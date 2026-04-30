import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function StoriesCTA() {
  return (
    <Card className="border-0 bg-linear-to-br from-primary/5 via-card to-primary/5 shadow-3 mt-8">
      <CardContent className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Share Your Travel Story</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Have you found an amazing travel companion through Travel Buddy?
          We&apos;d love to hear your story and inspire others in our community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/contact">
              <TrendingUp className="h-4 w-4" />
              Share Your Story
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/register">
              <Users className="h-4 w-4" />
              Find Travel Buddy
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
