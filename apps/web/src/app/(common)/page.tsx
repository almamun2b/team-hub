import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Target,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Collaborate. Track. <br className="hidden md:block" /> Achieve More
            Together.
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            The all-in-one hub for teams to manage shared goals, post
            announcements, and track action items in real-time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-lg" asChild>
              <Link href="/register">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-lg"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything Your Team Needs
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Streamline your workflow with tools designed for high-performance
              collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Target className="h-10 w-10 text-primary" />}
              title="Goals & Milestones"
              description="Define clear objectives and track progress with nested milestones and real-time activity feeds."
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-primary" />}
              title="Rich Announcements"
              description="Keep everyone informed with rich-text posts, reactions, and threaded comments."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-primary" />}
              title="Real-time Updates"
              description="Stay in sync with instant notifications and live updates powered by Socket.io."
            />
          </div>
        </div>
      </section>

      {/* Kanban Highlight */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold">Visual Action Tracking</h2>
              <p className="text-lg text-muted-foreground">
                Move projects forward with our powerful Kanban board. Assign
                tasks, set priorities, and watch your team cross the finish line
                together.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Drag-and-drop task management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Priority levels and due dates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Linked items to parent goals</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 overflow-hidden rounded-xl border bg-background shadow-xl">
              <Image
                src="/images/kanban.png"
                alt="Kanban board preview"
                width={1200}
                height={630}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to empower your team?
          </h2>
          <p className="text-xl opacity-90 max-w-xl mx-auto">
            Join hundreds of teams already achieving their goals with Team Hub.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="h-12 px-8 text-lg"
            asChild
          >
            <Link href="/register">Join Now - It&apos;s Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
