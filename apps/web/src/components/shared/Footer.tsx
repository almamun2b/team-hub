import logo2 from "@/assets/logo2.png";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Travel Buddy",
      links: [
        { name: "About Us", href: "/about" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "Success Stories", href: "/coming-soon" },
      ],
    },
    {
      title: "Explore",
      links: [
        { name: "Browse Travel Plans", href: "/travel-plan" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="mt-20 border-t bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="space-y-6 max-w-[420px]">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <Image
                  width={128}
                  height={128}
                  className="w-[50px] h-[50px] aspect-square"
                  src={logo2}
                  alt="Company Logo"
                ></Image>
                <div>
                  <h2 className="text-xl font-bold">Travel Buddy</h2>
                  <p className="text-sm text-muted-foreground">
                    Connecting travelers worldwide
                  </p>
                </div>
              </Link>
              <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                Discover amazing travel companions and create unforgettable
                memories together. Join thousands of travelers who have found
                their perfect travel buddies through our platform.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>hello@travelbuddy.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-7">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 font-semibold">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            <p>
              © {currentYear} Travel Buddy. All rights reserved. Made with{" "}
              <Heart className="inline h-3 w-3 text-red-500" /> for travelers.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
