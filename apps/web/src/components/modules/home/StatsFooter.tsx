export default function StatsFooter() {
  return (
    <div className="py-36">
      <div className="container px-4 md:px-6 border-b py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">120K+</div>
            <div className="text-sm text-muted-foreground">
              Successful Matches
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">85+</div>
            <div className="text-sm text-muted-foreground">
              Countries Covered
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">4.8</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
