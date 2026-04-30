import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfileResponse } from "@/types/user";
import { ArrowRight, CheckCircle, Clock, Shield } from "lucide-react";
import Link from "next/link";

interface CTAProps {
  user: UserProfileResponse | null;
}

export default function CTASection({ user }: CTAProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <Card className="border-0 bg-linear-to-br from-primary/5 via-card to-primary/5 shadow-2xl">
          <CardContent className="p-8 text-center md:p-12">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Find Your Perfect Travel Buddy?
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Join thousands of travelers creating unforgettable memories
                together. Share costs, share experiences, make lifelong friends.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                {!user?.data && (
                  <Button size="lg" asChild className="gap-2">
                    <Link href="/register">
                      Start Your Journey
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                <Button size="lg" variant="outline" asChild>
                  <Link href="/travel-plan">Browse Travel Plans</Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  Set up in 5 minutes
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-500" />
                  100% verified profiles
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
