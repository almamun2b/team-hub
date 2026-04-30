import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera, Coffee, Heart, Mountain, Plane, Users } from "lucide-react";
import Link from "next/link";

const TravelCategoriesSection = () => {
  const categories = [
    {
      icon: Mountain,
      name: "Adventure",
      count: 3421,
      color: "from-green-500 to-teal-500 dark:from-green-600 dark:to-teal-600",
    },
    {
      icon: Camera,
      name: "Photography",
      count: 2134,
      color:
        "from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600",
    },
    {
      icon: Coffee,
      name: "Food & Culture",
      count: 2876,
      color: "from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600",
    },
    {
      icon: Heart,
      name: "Wellness",
      count: 1543,
      color: "from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600",
    },
    {
      icon: Users,
      name: "Group Tours",
      count: 1987,
      color:
        "from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600",
    },
    {
      icon: Plane,
      name: "Backpacking",
      count: 2345,
      color:
        "from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600",
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <Badge className="mb-4">Categories</Badge>
          <h2 className="title">Travel Categories</h2>
          <p className="subtitle mt-4">
            Find travelers who share your interests
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
            >
              <CardHeader className="pb-4">
                <Link href={`/travel-plan?category=${category.name}`}>
                  <div
                    className={`w-16 h-16 mx-auto bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-sm">{category.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {category.count} travelers
                  </CardDescription>
                </Link>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelCategoriesSection;
