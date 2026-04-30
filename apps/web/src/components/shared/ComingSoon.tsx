import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Mail } from "lucide-react";
import Link from "next/link";

interface ComingSoonProps {
  title: string;
  description: string;
  showNotification?: boolean;
}

export default function ComingSoon({
  title,
  description,
  showNotification = true,
}: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">{title}</CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-6">
            <p className="text-lg text-muted-foreground">{description}</p>

            {showNotification && (
              <div className="bg-muted/50 rounded-lg p-6 border border-dashed">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Get Notified</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Be the first to know when this feature launches. We&apos;ll
                  send you an email as soon as it&apos;s ready.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button className="whitespace-nowrap">Notify Me</Button>
                </div>
              </div>
            )}

            <div className="pt-4">
              <Link href="/" className="text-primary hover:underline">
                Return to Homepage
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
