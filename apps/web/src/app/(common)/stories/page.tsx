import CTASection from "@/components/modules/home/CTASection";
import StoriesClient from "@/components/modules/stories/StoriesClient";
import StoriesStats from "@/components/modules/stories/StoriesStats";
import { me } from "@/services/auth/me";
import { Award } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories - Travel Buddy",
  description:
    "Read inspiring travel stories from Travel Buddy users who found amazing companions and created unforgettable memories.",
};

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

const successStories: Story[] = [
  {
    id: 1,
    title: "From Solo Backpacker to World Travelers",
    author: {
      name: "Jake Martinez",
      avatar: "https://picsum.photos/seed/jake/100/100",
      location: "Denver, Colorado",
    },
    destination: "Southeast Asia",
    duration: "6 months",
    story:
      "I never thought I'd find someone crazy enough to join my spontaneous backpacking trip through Thailand, Vietnam, and Cambodia. But then I matched with Sarah, and she was not just willing but excited to embrace the chaos. We navigated crowded markets, survived 14-hour bus rides, and even found ourselves in the middle of a jungle trek. Six months later, we're still planning our next adventure together.",
    highlights: [
      "Visited 5 countries",
      "Made lifelong friend",
      "Learned basic Vietnamese",
    ],
    rating: 5,
    likes: 342,
    comments: 28,
    featured: true,
    image: "https://picsum.photos/seed/southeast-asia/800/400",
  },
  {
    id: 2,
    title: "Digital Nomads Find Perfect Work-Travel Balance",
    author: {
      name: "Priya Sharma",
      avatar: "https://picsum.photos/seed/priya/100/100",
      location: "Bangalore, India",
    },
    destination: "Europe Remote Work Circuit",
    duration: "3 months",
    story:
      "As a freelance designer, I struggled to find people who understood my work-travel lifestyle. Through Travel Buddy, I connected with Alex, a software developer from Germany. We spent three months working from cafes in Lisbon, Porto, and Barcelona while exploring on weekends. We pushed each other to be more productive and more adventurous. It was the perfect blend of work and wanderlust.",
    highlights: [
      "Worked from 4 countries",
      "Launched collaborative project",
      "Maintained client work",
    ],
    rating: 5,
    likes: 256,
    comments: 19,
    image: "https://picsum.photos/seed/digital-nomads/800/400",
  },
  {
    id: 3,
    title: "Overcoming Fear Together: First-Time International Travel",
    author: {
      name: "Marcus Chen",
      avatar: "https://picsum.photos/seed/marcus/100/100",
      location: "Seattle, Washington",
    },
    destination: "Japan",
    duration: "2 weeks",
    story:
      "I was terrified of my first international trip alone - language barrier, cultural differences, getting lost. Then I matched with Yuki, a local traveler who showed me Japan through her eyes. She taught me basic phrases, showed me hidden gems away from tourist spots, and gave me the confidence to explore. What would have been overwhelming alone became an incredible journey with a friend.",
    highlights: [
      "Learned basic Japanese",
      "Discovered local spots",
      "Overcame travel anxiety",
    ],
    rating: 4,
    likes: 189,
    comments: 34,
    image: "https://picsum.photos/seed/japan-travel/800/400",
  },
  {
    id: 4,
    title: "Safari Adventure: When Strangers Become Family",
    author: {
      name: "Emma Thompson",
      avatar: "https://picsum.photos/seed/emma/100/100",
      location: "Cape Town, South Africa",
    },
    destination: "Kenya & Tanzania",
    duration: "3 weeks",
    story:
      "My dream was always to see the Great Migration. I thought I'd have to wait until I was older or had a partner who shared my passion. Through Travel Buddy, I found David and Sarah, both experienced safari-goers. Our guide said we were the most enthusiastic group he'd had in years. We witnessed incredible wildlife, shared stories around the campfire, and supported each other through challenging hikes. We left as three friends with memories that will last forever.",
    highlights: [
      "Witnessed Great Migration",
      "Saw Big 5 animals",
      "Made lifelong friends",
    ],
    rating: 5,
    likes: 567,
    comments: 45,
    image: "https://picsum.photos/seed/safari/800/400",
  },
  {
    id: 5,
    title: "Cross-Country Road Trip: USA to Canada",
    author: {
      name: "Lucas Rodriguez",
      avatar: "https://picsum.photos/seed/lucas/100/100",
      location: "Austin, Texas",
    },
    destination: "Route 66 & Canadian Rockies",
    duration: "6 weeks",
    story:
      "I had this crazy idea to drive the entire length of Route 66 and continue into Canada. Everyone thought I was nuts until I matched with Mike, a photographer who was equally crazy. We fixed up an old van, camped under the stars, and chased sunsets across eight states. We argued over navigation, laughed at our mishaps, and created a photo documentary of our journey. Sometimes the craziest plans lead to the best adventures.",
    highlights: [
      "Drove 8,000 miles",
      "Visited 12 states",
      "Fixed up vintage van",
    ],
    rating: 5,
    likes: 423,
    comments: 67,
    image: "https://picsum.photos/seed/road-trip/800/400",
  },
  {
    id: 6,
    title: "Finding Love While Traveling: Mediterranean Romance",
    author: {
      name: "Sophie Laurent",
      avatar: "https://picsum.photos/seed/sophie/100/100",
      location: "Paris, France",
    },
    destination: "Greece, Italy, Spain",
    duration: "2 months",
    story:
      "I signed up for Travel Buddy hoping to find friends for my Mediterranean summer. I never expected to find love. Then I matched with Nico, a Greek architect who shared my passion for history and architecture. We explored ancient ruins in Greece, sailed the Amalfi Coast in Italy, and got lost in the charming streets of Barcelona. Two years later, we're planning our wedding and already talking about future adventures together.",
    highlights: [
      "Met life partner",
      "Visited 8 countries",
      "Found shared passion",
    ],
    rating: 5,
    likes: 892,
    comments: 78,
    featured: true,
    image: "https://picsum.photos/seed/mediterranean/800/400",
  },
];

export default async function SuccessStories() {
  const user = await me();
  const averageRating =
    successStories.reduce((sum, story) => sum + story.rating, 0) /
    successStories.length;
  const totalLikes = successStories.reduce(
    (sum, story) => sum + story.likes,
    0,
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container px-4 md:px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Success Stories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real stories from real travelers who found amazing companions and
              created unforgettable memories through Travel Buddy.
            </p>
          </div>

          {/* Stats */}
          <StoriesStats
            totalStories={successStories.length}
            averageRating={averageRating}
            totalLikes={totalLikes}
          />

          {/* Stories Client Component */}
          <StoriesClient
            stories={successStories}
            initialSearchTerm=""
            initialCategory="All"
            initialSortBy="recent"
          />

          <CTASection user={user} />
        </div>
      </div>
    </div>
  );
}
