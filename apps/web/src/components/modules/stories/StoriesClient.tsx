"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface StoriesClientProps {
  stories: Story[];
  initialSearchTerm: string;
  initialCategory: string;
  initialSortBy: string;
}

interface Story {
  id: number;
  title: string;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  destination: string;
  duration: string;
  story: string;
  highlights: string[];
  rating: number;
  likes: number;
  comments: number;
  featured?: boolean;
  image: string;
}

export default function StoriesClient({
  stories,
  initialSearchTerm,
  initialCategory,
  initialSortBy,
}: StoriesClientProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialSortBy);

  const filteredStories = stories
    .filter((story) => {
      const matchesSearch =
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.story.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        (selectedCategory === "Adventure" &&
          story.destination.includes("Asia")) ||
        (selectedCategory === "Romance" &&
          story.destination.includes("Mediterranean")) ||
        (selectedCategory === "Work & Travel" &&
          story.destination.includes("Europe")) ||
        (selectedCategory === "Solo Travel" &&
          story.destination.includes("Japan"));
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "recent") return 0;
      if (sortBy === "popular") return b.likes - a.likes;
      return 0;
    });

  return (
    <>
      {/* Search and Filter */}
      <Card className="border-0 shadow-3 mb-8 hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                onClick={() => setSelectedCategory("All")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={sortBy === "recent" ? "default" : "outline"}
                onClick={() => setSortBy("recent")}
                size="sm"
              >
                Recent
              </Button>
              <Button
                variant={sortBy === "popular" ? "default" : "outline"}
                onClick={() => setSortBy("popular")}
                size="sm"
              >
                Popular
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stories Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {filteredStories.map((story) => (
          <Card
            key={story.id}
            className="border-0 shadow-3 overflow-hidden hover:shadow-4 transition-all"
          >
            <div className="relative h-48">
              <Image
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
                width={800}
                height={400}
              />
              {story.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {story.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <div>
                    <h4 className="font-semibold">{story.author.name}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {story.author.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {story.duration} • {story.destination}
                  </div>
                </div>
              </div>
              <h3 className="font-semibold mb-2">{story.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                {story.story}
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex flex-wrap gap-2">
                  {story.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium">{story.rating}.0</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="text-red-500">♥</span>
                      <span>{story.likes}</span>
                      <span className="text-blue-500">💬</span>
                      <span>{story.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mb-20">
        <Button variant="outline" size="lg">
          Load More Stories
        </Button>
      </div>
    </>
  );
}
