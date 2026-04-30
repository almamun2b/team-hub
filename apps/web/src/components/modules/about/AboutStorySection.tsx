import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Globe, Shield, Target } from "lucide-react";
import Link from "next/link";

export default function AboutStorySection() {
  return (
    <section className="py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Our Story</CardTitle>
                <CardDescription>
                  How it all began and where we&apos;re going
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Travel Buddy was born from a simple realization: some of the
                  best travel experiences happen when you share them with
                  others. Our founder, Alex, was solo traveling through Japan
                  when he met two other travelers at a local ramen shop. What
                  started as a shared meal turned into a week-long adventure
                  exploring hidden temples, local festivals, and creating
                  memories that lasted a lifetime.
                </p>
                <p className="text-muted-foreground">
                  Back home, Alex wondered how many others were missing out on
                  these magical connections simply because they didn&apos;t know
                  how to find travel companions. That&apos;s when Travel Buddy
                  was conceived — a platform designed to connect like-minded
                  travelers based on shared interests, travel styles, and
                  destinations.
                </p>
                <div className="pt-4 hidden">
                  <Button asChild>
                    <Link href="/how-it-works">
                      See How It Works
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Our Mission</CardTitle>
                <CardDescription>What drives us every day</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We believe travel is better when shared. Our mission is to
                  eliminate barriers to finding compatible travel companions
                  while ensuring safety, authenticity, and amazing experiences
                  for everyone.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Create Meaningful Connections
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Match travelers based on shared interests and travel
                        styles
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Ensure Safety & Trust</h4>
                      <p className="text-sm text-muted-foreground">
                        Robust verification and safety features for peace of
                        mind
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Promote Sustainable Tourism
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Encourage responsible travel that benefits local
                        communities
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
