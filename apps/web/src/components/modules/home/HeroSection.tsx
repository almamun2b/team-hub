"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar,
  Check,
  ChevronDown,
  Globe,
  Heart,
  MapPin,
  Search,
  Shield,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [searchDestination, setSearchDestination] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchType, setSearchType] = useState("");

  const travelTypes = [
    { value: "SOLO", label: "Solo", icon: User },
    { value: "FAMILY", label: "Family", icon: Users },
    { value: "COUPLE", label: "Couple", icon: Users },
    { value: "GROUP", label: "Group", icon: Users },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchDestination) params.set("destination", searchDestination);
    if (searchDate) params.set("startDate", searchDate);
    if (searchType) params.set("travelType", searchType);

    router.push(`/travel-plan?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden pt-15 pb-10">
      <div className="container relative z-10 px-4 md:px-6 py-10 md:py-18 rounded-sm">
        <div className="mx-auto max-w-4xl text-center ">
          <Badge variant="outline" className="mb-6">
            <TrendingUp className="mr-2 h-3 w-3" />
            Join 50,000+ Travelers
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Travel <span className="text-primary">Together</span>, Create{" "}
            <span className="text-primary">Forever</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground md:text-2xl">
            Find perfect travel companions for your next adventure. Share
            experiences, split costs, and make lifelong friends.
          </p>

          {/* Search Bar */}
          <div className="mt-10">
            <Card className="mx-auto max-w-4xl border-0 bg-card/50 shadow-3 hover:shadow-6 transition-all">
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="destination"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      Destination
                    </Label>
                    <Input
                      id="destination"
                      placeholder="Where do you want to go?"
                      value={searchDestination}
                      onChange={(e) => setSearchDestination(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Travel Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Travel Type
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {searchType ? (
                            <span className="flex items-center gap-2 w-full">
                              {(() => {
                                const selectedType = travelTypes.find(
                                  (t) => t.value === searchType,
                                );
                                const Icon = selectedType?.icon || Users;
                                return (
                                  <>
                                    <Icon className="h-4 w-4" />
                                    {selectedType?.label ||
                                      searchType.charAt(0) +
                                        searchType.slice(1).toLowerCase()}
                                  </>
                                );
                              })()}
                            </span>
                          ) : (
                            "Any type"
                          )}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0" align="start">
                        <div className="grid gap-1 p-1.5 w-full">
                          {travelTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                              <Button
                                key={type.value}
                                variant={
                                  searchType === type.value
                                    ? "secondary"
                                    : "ghost"
                                }
                                className="justify-start gap-2"
                                onClick={() => setSearchType(type.value)}
                              >
                                <Icon className="h-4 w-4" />
                                {type.label}
                                {searchType === type.value && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </Button>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleSearch}
                      className="w-full gap-2"
                      size="lg"
                    >
                      <Search className="h-4 w-4" />
                      Find Buddies
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm">Verified Profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <span className="text-sm">85+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-sm">120K+ Successful Matches</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
