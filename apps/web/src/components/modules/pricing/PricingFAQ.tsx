export default function PricingFAQ() {
  return (
    <section className="py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl border border-border rounded-lg px-8 py-10">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">Can I switch plans anytime?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes
                take effect immediately.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">
                Is there a free trial for paid plans?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We offer a 7-day free trial for both Monthly and Yearly plans.
                No credit card required.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">How do cancellations work?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You can cancel anytime. If you cancel a paid plan, youll keep
                access until the end of your billing period.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">
                What payment methods do you accept?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We accept all major credit cards, PayPal, and in some regions,
                local payment methods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
