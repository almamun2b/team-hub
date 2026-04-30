"use client";

import { LayoutDashboard, LogOut, User, UserCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logoutUser } from "@/services/auth/logout";
import { UserProfile } from "@/types/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NavbarAuth({ user }: { user: UserProfile | null }) {
  return (
    <div className="flex items-center justify-end">
      {user?.email ? <ProfileDropdown userInfo={user} /> : <LoginButton />}
    </div>
  );
}

function ProfileDropdown({ userInfo }: { userInfo: UserProfile }) {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.success) {
      toast.success(res.message);
      router.push("/");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative h-9 w-9">
          <UserCircle className="h-8 w-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userInfo?.fullName || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userInfo?.email}
            </p>
          </div>
          <div className="border-t pt-3 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center p-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span className="text-sm">Dashboard</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center p-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
            >
              <User className="mr-2 h-4 w-4" />
              <span className="text-sm">Profile</span>
            </Link>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="flex items-center justify-start px-2.5! hover:bg-accent rounded-md cursor-pointer transition-colors w-full"
            >
              <LogOut className="mr-0 h-4 w-4" />
              <span className="text-sm">Log out</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function LoginButton() {
  return (
    <Button asChild size="sm" className="rounded-full px-5">
      <Link href="/login">Login</Link>
    </Button>
  );
}
