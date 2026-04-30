"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";

interface NavigationSheetProps {
  userInfo?: {
    success: boolean;
    data?: {
      email: string;
    };
  } | null;
  navMenus: {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

export const NavigationSheet = ({
  userInfo,
  navMenus,
}: NavigationSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isLoggedIn = userInfo?.data?.email;

  const isActiveRoute = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-sm">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
      <SheetDescription className="sr-only">
        Mobile navigation menu with links to all pages
      </SheetDescription>
      <SheetContent side="left" className="w-80 sm:w-96 p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <Logo />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="rounded-sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {navMenus.map((menu) => {
              const isActive = isActiveRoute(menu.href);
              return (
                <Link
                  key={menu.label}
                  href={menu.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive &&
                      "bg-accent text-accent-foreground font-semibold",
                  )}
                >
                  {menu.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer with Auth */}
        <div className="p-6 border-t bg-muted/30">
          {isLoggedIn ? (
            <Button asChild className="w-full" onClick={handleLinkClick}>
              <Link href="/dashboard" className="flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <div className="space-y-2">
              <Button
                variant="outline"
                asChild
                className="w-full"
                onClick={handleLinkClick}
              >
                <Link href="/login" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild className="w-full" onClick={handleLinkClick}>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
