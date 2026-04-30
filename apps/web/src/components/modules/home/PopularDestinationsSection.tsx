import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfileResponse } from "@/types/user";
import { Calendar, Search, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const popularDestinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    travelers: 45,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    country: "Indonesia",
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    travelers: 38,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    country: "Japan",
  },
  {
    id: 3,
    name: "Paris, France",
    travelers: 52,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    country: "France",
  },
  {
    id: 4,
    name: "New York, USA",
    travelers: 41,
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    country: "USA",
  },
  {
    id: 5,
    name: "Bangkok, Thailand",
    travelers: 36,
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=80",
    country: "Thailand",
  },
  {
    id: 6,
    name: "Sydney, Australia",
    travelers: 29,
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    country: "Australia",
  },
];

interface PopularDestinationsSectionProps {
  user: UserProfileResponse | null;
}

export default async function PopularDestinationsSection({
  user,
}: PopularDestinationsSectionProps) {
  return (
    <section className="py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <h2 className="title">Popular Destinations</h2>
          <p className="mt-4 subtile">Where our community is traveling next</p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {popularDestinations.map((destination) => (
            <Card
              key={destination.id}
              className="group overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl rounded-2xl bg-transparent py-0"
            >
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent rounded-t-2xl" />

                <div className="absolute bottom-4 left-4 right-4 text-white ">
                  <div className="mb-2">
                    <Badge className="bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30">
                      {destination.country}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold drop-shadow-lg">
                    {destination.name}
                  </h3>
                </div>

                <Badge className="absolute right-4 top-4 bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30">
                  <Users className="mr-1 h-3 w-3" />
                  {destination.travelers} travelers
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="gap-2 hover:bg-primary/10"
                  >
                    <Link href={`/travel-plan`}>
                      <Search className="h-4 w-4" />
                      Find Buddies
                    </Link>
                  </Button>
                  {user?.data && user.data.email && (
                    <Button size="sm" asChild className="gap-2">
                      <Link href={`/travel-plans/my-travel-plan`}>
                        <Calendar className="h-4 w-4" />
                        Create Plan
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
