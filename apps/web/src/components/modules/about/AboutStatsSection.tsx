"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Target, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    label: "Countries Covered",
    numericValue: 85,
    icon: <MapPin className="h-6 w-6" />,
  },
  {
    label: "Happy Travelers",
    numericValue: 50000,
    icon: <Users className="h-6 w-6" />,
  },
  {
    label: "Successful Matches",
    numericValue: 120000,
    icon: <Target className="h-6 w-6" />,
  },
  {
    label: "Average Rating",
    numericValue: 4.8,
    hasDecimal: true,
    icon: <Star className="h-6 w-6" />,
  },
];

export default function AboutStatsSection() {
  const [visibleStats, setVisibleStats] = useState<Set<number>>(new Set());
  const [animatedValues, setAnimatedValues] = useState<{
    [key: number]: string;
  }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const statRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const animateValue = (index: number) => {
    const stat = stats[index];
    const targetValue = stat.numericValue;
    const hasDecimal = stat.hasDecimal || false;

    // Dynamic suffix logic
    let suffix = "";
    if (hasDecimal) {
      suffix = "";
    } else if (stat.label === "Countries Covered") {
      suffix = "+";
    } else if (targetValue > 999) {
      suffix = "K+";
    }

    let currentValue = 0;
    const increment = hasDecimal ? 0.1 : Math.ceil(targetValue / 100);
    const duration = 2000;
    const stepTime = duration / (targetValue / increment);

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }

      const displayValue = hasDecimal
        ? currentValue.toFixed(1)
        : currentValue >= 1000
          ? `${(currentValue / 1000).toFixed(0)}`
          : currentValue.toString();

      setAnimatedValues((prev) => ({
        ...prev,
        [index]: displayValue + suffix,
      }));
    }, stepTime);
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
            setVisibleStats((prev) => new Set(prev).add(index));
            animateValue(index);
          }
        });
      },
      { threshold: 0.1 },
    );

    Object.values(statRefs.current).forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <section className="py-16 pb-32">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="title">Our Impact in Numbers</h2>
          <p className="mt-4 subtile">
            Discover how we&apos;re connecting travelers worldwide and creating
            unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => {
                statRefs.current[index] = el;
              }}
              data-index={index}
            >
              <Card className="border-0 bg-card shadow-3 hover:shadow-6 transition-all">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <div className="text-primary">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-bold text-primary min-h-[40px] flex items-center">
                    {visibleStats.has(index)
                      ? animatedValues[index] || "0"
                      : "0"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
