import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";

export default function PricingTrustBadges() {
  return (
    <>
      <Separator />
      <div className="py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                ✅ 30-day money-back guarantee • 🔒 Secure payment • 🌍 Trusted
                by 50,000+ travelers
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>SSL Secured</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
