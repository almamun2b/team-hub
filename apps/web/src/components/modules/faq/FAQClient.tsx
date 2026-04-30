"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react";
import { useState } from "react";

interface FAQClientProps {
  faqData: FAQ[];
  faqCategories: FAQCategory[];
  initialSearchTerm: string;
  initialSelectedCategory: string;
}

interface FAQ {
  category: string;
  question: string;
  answer: string;
  tags: string[];
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
}

export default function FAQClient({
  faqData,
  faqCategories,
  initialSearchTerm,
  initialSelectedCategory,
}: FAQClientProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialSelectedCategory,
  );

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const getCategoryCount = (category: string) => {
    return faqData.filter((faq) => faq.category === category).length;
  };

  return (
    <>
      {/* Search */}
      <Card className="border-0 shadow-3 mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            onClick={() => setSelectedCategory("All")}
            className="gap-2"
          >
            All Categories ({faqData.length})
          </Button>
          {faqCategories.map((category) => (
            <Button
              key={category.title}
              variant={
                selectedCategory === category.title ? "default" : "outline"
              }
              onClick={() => setSelectedCategory(category.title)}
              className="gap-2"
            >
              <div className={`p-1 rounded ${category.color}`}>
                {category.icon}
              </div>
              {category.title} ({getCategoryCount(category.title)})
            </Button>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => {
          const isExpanded = expandedItems.includes(index);
          const categoryInfo = faqCategories.find(
            (cat) => cat.title === faq.category,
          );

          return (
            <Card key={index} className="border-0 shadow-3">
              <CardContent className="p-0">
                <button
                  className="w-full text-left p-6 hover:bg-muted/50 transition-colors"
                  onClick={() => toggleExpanded(index)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {categoryInfo && (
                          <div className={`p-1 rounded ${categoryInfo.color}`}>
                            {categoryInfo.icon}
                          </div>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold pr-8">{faq.question}</h3>
                    </div>
                    <div className="shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t">
                    <div className="pt-4">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredFaqs.length === 0 && (
        <Card className="border-0 shadow-3">
          <CardContent className="text-center py-12">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or browse different categories.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
