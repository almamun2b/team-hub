import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Home, XCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Cancelled - Travel Buddy",
  description:
    "Your Travel Buddy payment was cancelled. No charges were made. Return to pricing or homepage to continue your travel journey.",
};

const PaymentCancelPage = () => {
  return (
    <div className="container flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md border-destructive/20">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-destructive/10 p-3">
              <XCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-destructive">Payment Cancelled</CardTitle>
          <CardDescription>Your payment was not completed.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            You have cancelled the payment process. No charges have been made to
            your account.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full gap-2">
            <Link href="/pricing">
              <ArrowLeft className="h-4 w-4" />
              Back to Pricing
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentCancelPage;
