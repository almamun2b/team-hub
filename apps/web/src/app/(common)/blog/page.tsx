import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Filter, Search } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Travel Blog - Travel Buddy",
  description:
    "Read travel tips, stories, and guides from the Travel Buddy community and travel experts.",
};

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips for Solo Female Travelers",
    excerpt:
      "Discover practical safety tips and empowering advice for women traveling alone. From choosing destinations to staying connected, this guide covers everything you need to know.",
    content: "Traveling solo as a woman can be incredibly empowering...",
    author: {
      name: "Sarah Martinez",
      avatar: "https://picsum.photos/seed/sarah/100/100",
      bio: "Solo travel enthusiast and safety advocate",
    },
    category: "Safety Tips",
    tags: ["solo-travel", "safety", "female-travel"],
    readTime: "8 min read",
    publishDate: "2024-01-15",
    image: "https://picsum.photos/seed/solo-female-travel/800/400",
    likes: 234,
    comments: 45,
    featured: true,
  },
  {
    id: 2,
    title: "Hidden Gems of Southeast Asia: Beyond the Tourist Trail",
    excerpt:
      "Explore untouched paradises and local secrets in Vietnam, Cambodia, and Laos. These destinations offer authentic experiences away from the crowds.",
    content: "Southeast Asia is famous for its bustling cities...",
    author: {
      name: "Marcus Chen",
      avatar: "https://picsum.photos/seed/marcus/100/100",
      bio: "Adventure seeker and cultural explorer",
    },
    category: "Destinations",
    tags: ["southeast-asia", "hidden-gems", "off-the-beaten-path"],
    readTime: "12 min read",
    publishDate: "2024-01-12",
    image: "https://picsum.photos/seed/se-asia-gems/800/400",
    likes: 189,
    comments: 32,
  },
  {
    id: 3,
    title: "How to Find the Perfect Travel Buddy: A Complete Guide",
    excerpt:
      "Learn the art of finding compatible travel partners. From setting expectations to building trust, this guide covers the entire process.",
    content: "Finding the right travel companion can transform your journey...",
    author: {
      name: "Alex Thompson",
      avatar: "https://picsum.photos/seed/alex/100/100",
      bio: "Travel matching expert and community manager",
    },
    category: "Travel Tips",
    tags: ["travel-buddy", "matching", "partnerships"],
    readTime: "10 min read",
    publishDate: "2024-01-10",
    image: "https://picsum.photos/seed/travel-buddy-guide/800/400",
    likes: 412,
    comments: 67,
    featured: true,
  },
  {
    id: 4,
    title: "Budget Travel: 50 Destinations Under $50/Day",
    excerpt:
      "Stretch your travel budget with these affordable destinations. From Eastern Europe to Latin America, amazing experiences don't have to break the bank.",
    content: "Traveling on a budget doesn't mean sacrificing quality...",
    author: {
      name: "Emma Wilson",
      avatar: "https://picsum.photos/seed/emma/100/100",
      bio: "Budget travel specialist and digital nomad",
    },
    category: "Budget Travel",
    tags: ["budget", "affordable", "destinations"],
    readTime: "15 min read",
    publishDate: "2024-01-08",
    image: "https://picsum.photos/seed/budget-travel/800/400",
    likes: 567,
    comments: 89,
  },
  {
    id: 5,
    title: "Digital Nomad Visa Guide: 10 Countries for Remote Work",
    excerpt:
      "Complete guide to countries offering digital nomad visas. Learn requirements, costs, and application processes for remote work visas.",
    content: "The rise of remote work has opened new possibilities...",
    author: {
      name: "David Kim",
      avatar: "https://picsum.photos/seed/david/100/100",
      bio: "Remote work consultant and digital nomad",
    },
    category: "Digital Nomad",
    tags: ["digital-nomad", "visas", "remote-work"],
    readTime: "18 min read",
    publishDate: "2024-01-05",
    image: "https://picsum.photos/seed/digital-nomad/800/400",
    likes: 298,
    comments: 54,
  },
];

const categories = [
  { name: "All Posts", count: 45 },
  { name: "Travel Tips", count: 12 },
  { name: "Destinations", count: 8 },
  { name: "Safety Tips", count: 6 },
  { name: "Budget Travel", count: 9 },
  { name: "Digital Nomad", count: 5 },
  { name: "Food & Culture", count: 5 },
];

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Travel Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover travel tips, inspiring stories, and expert guides from
              our community of experienced travelers.
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="border-0 shadow-3 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search articles..." className="pl-10" />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Categories
                  </Button>
                  <Button variant="outline" size="sm">
                    Latest
                  </Button>
                  <Button variant="outline" size="sm">
                    Popular
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Featured Post */}
              {featuredPost && (
                <Card className="border-0 shadow-3 overflow-hidden">
                  <div className="relative h-64 md:h-96">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                          />
                          <AvatarFallback>
                            {featuredPost.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {featuredPost.author.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {featuredPost.author.bio}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(
                            featuredPost.publishDate,
                          ).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{featuredPost.category}</Badge>
                        {featuredPost.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild>
                        <Link href={`/blog/${featuredPost.id}`}>Read More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Regular Posts Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {regularPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="border-0 shadow-3 overflow-hidden"
                  >
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={post.author.avatar}
                            alt={post.author.name}
                          />
                          <AvatarFallback className="text-xs">
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">
                          {post.author.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/blog/${post.id}`}>Read More</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Categories */}
              <Card className="border-0 shadow-3">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between"
                    >
                      <Button
                        variant="ghost"
                        className="justify-start p-0 h-auto font-normal"
                      >
                        {category.name}
                      </Button>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className="border-0 shadow-3">
                <CardHeader>
                  <CardTitle className="text-lg">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "solo-travel",
                      "budget-travel",
                      "safety",
                      "digital-nomad",
                      "backpacking",
                      "adventure",
                      "culture",
                      "food",
                    ].map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="border-0 shadow-3">
                <CardHeader>
                  <CardTitle className="text-lg">Newsletter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Get weekly travel tips and destination guides delivered to
                    your inbox.
                  </p>
                  <Input placeholder="Enter your email" />
                  <Button className="w-full">Subscribe</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
