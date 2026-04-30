import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { me } from "@/services/auth/me";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AboutCTASection() {
  const user = await me();
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <Card className="border-0 bg-linear-to-br from-primary/5 via-card to-primary/5 shadow-2xl">
            <CardContent className="p-8 text-center md:p-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready for Your Next Adventure?
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Join thousands of travelers creating unforgettable memories
                together
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
