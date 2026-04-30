"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, ThumbsUp } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    location: "Madrid, Spain",
    content:
      "Found the perfect travel buddy for my Bali trip! We're still friends and planning our next adventure together.",
    rating: 5,
    avatar: "https://picsum.photos/seed/travel-destination/400/300",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "James Wilson",
    location: "Toronto, Canada",
    content:
      "As a solo traveler, this platform changed everything. Met amazing people and shared unforgettable experiences.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Priya Patel",
    location: "Mumbai, India",
    content:
      "The matching algorithm is spot on! Found someone with exactly the same travel style and interests.",
    rating: 4,
    avatar: "https://picsum.photos/seed/travel-destination/400/300",
    date: "2 weeks ago",
  },
];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="pb-16 mt-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="title">Traveler Testimonials</h2>
          <p className="mt-4 subtitle">
            Hear from our community about their shared adventures
          </p>
        </div>

        <div className="mt-10 relative">
          <Carousel
            className="w-full max-w-2xl mx-auto"
            opts={{
              align: "center",
              loop: true,
            }}
            setApi={(api) => {
              if (api) {
                api.on("select", () => {
                  setCurrentSlide(api.selectedScrollSnap());
                });
              }
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div className="p-1">
                    <Card className="border-0 shadow-3 transition-all">
                      <CardContent className="p-8">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage
                              src={testimonial.avatar}
                              alt={testimonial.name}
                            />
                            <AvatarFallback className="text-lg">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="space-y-2">
                            <h4 className="font-semibold text-lg">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.location}
                            </p>
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">
                                {testimonial.rating}
                              </span>
                            </div>
                          </div>

                          <blockquote className="text-muted-foreground italic leading-relaxed">
                            &ldquo;{testimonial.content}&rdquo;
                          </blockquote>

                          <div className="flex items-center justify-between w-full text-sm">
                            <span className="text-muted-foreground">
                              {testimonial.date}
                            </span>
                            <div className="flex items-center gap-1 text-green-500">
                              <ThumbsUp className="h-4 w-4" />
                              <span>Helpful</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30"
                }`}
                onClick={() => {
                  const carouselElement = document.querySelector(
                    '[data-slot="carousel-content"]',
                  ) as HTMLElement;
                  if (carouselElement && "emblaApi" in carouselElement) {
                    const api = (
                      carouselElement as {
                        emblaApi: { scrollTo: (index: number) => void };
                      }
                    ).emblaApi;
                    api.scrollTo(index);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
