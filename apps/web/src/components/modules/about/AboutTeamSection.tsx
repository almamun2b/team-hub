import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former travel blogger with 10+ years of exploring 50+ countries",
    avatar: "https://picsum.photos/seed/alex-chen/200/200",
    initials: "AC",
    expertise: ["Asia", "Adventure Travel"],
  },
  {
    name: "Maria Rodriguez",
    role: "Head of Community",
    bio: "Expert in building travel communities and sustainable tourism",
    avatar: "https://picsum.photos/seed/maria-rodriguez/200/200",
    initials: "MR",
    expertise: ["Community", "Eco-Tourism"],
  },
  {
    name: "David Kim",
    role: "Lead Developer",
    bio: "Tech enthusiast who believes in connecting people through code",
    avatar: "https://picsum.photos/seed/david-kim/200/200",
    initials: "DK",
    expertise: ["Technology", "UX Design"],
  },
  {
    name: "Sarah Johnson",
    role: "Travel Expert",
    bio: "Certified travel planner with focus on unique cultural experiences",
    avatar: "https://picsum.photos/seed/sarah-johnson/200/200",
    initials: "SJ",
    expertise: ["Cultural", "Luxury Travel"],
  },
];

export default function AboutTeamSection() {
  return (
    <section className="py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="title">Meet Our Team</h2>
          <p className="mt-4 subtile">
            Passionate travelers and experts dedicated to your journey
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name}>
              <Card className="h-full border-0 bg-card shadow-3 hover:shadow-6 transition-all">
                <CardContent className="p-6 text-center">
                  <Avatar className="mx-auto mb-4 h-24 w-24">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="mb-1 text-lg font-semibold">{member.name}</h3>
                  <p className="mb-3 text-sm text-primary">{member.role}</p>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((exp) => (
                      <Badge key={exp} variant="secondary" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
