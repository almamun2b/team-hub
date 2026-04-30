"use client";
import { NavMain } from "@/components/modules/dashboard/nav-main";
import { NavSettings } from "@/components/modules/dashboard/nav-settings";
import { NavUser } from "@/components/modules/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { me } from "@/services/auth/me";
import { UserProfileResponse } from "@/types/user";
import {
  GalleryVerticalEnd,
  Lock,
  Projector,
  Type,
  Upload,
  User,
} from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";

const settings = [
  {
    name: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    name: "Current Subscription",
    url: "/subscription",
    icon: User,
  },
  {
    name: "Update Profile",
    url: "/profile/edit",
    icon: Upload,
  },
  {
    name: "Update Password",
    url: "/change-password",
    icon: Lock,
  },
];

const getNavData = (userRole: string) => {
  const baseNav = [
    {
      title: "Reviews",
      url: "#",
      icon: Type,
      isActive: true,
      items: [
        {
          title: "My reviews",
          url: "/reviews/my-reviews",
        },
        {
          title: "Given Reviews",
          url: "/reviews/given-reviews",
        },
        {
          title: "To Review Plans",
          url: "/reviews/to-review-plans",
        },
      ],
    },
  ];

  const adminNav = [
    {
      title: "Users",
      url: "#",
      icon: Projector,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/users",
        },
      ],
    },
    {
      title: "Travel Plans",
      url: "#",
      icon: Type,
      isActive: true,
      items: [
        {
          title: "Travel Plans",
          url: "/travel-plans",
        },
        {
          title: "My Travel Plans",
          url: "/travel-plans/my-travel-plan",
        },
        {
          title: "Get my travel requests",
          url: "/travel-plans/my-travel-requests",
        },
        {
          title: "Get pending requests",
          url: "/travel-plans/pending-requests",
        },
      ],
    },
  ];

  const userNav = [
    {
      title: "Travel Plans",
      url: "#",
      icon: Type,
      isActive: true,
      items: [
        {
          title: "My Travel Plans",
          url: "/travel-plans/my-travel-plan",
        },
        {
          title: "Get my travel requests",
          url: "/travel-plans/my-travel-requests",
        },
        {
          title: "Get pending requests",
          url: "/travel-plans/pending-requests",
        },
      ],
    },
  ];

  if (userRole === "ADMIN") {
    return [...adminNav, ...baseNav];
  } else if (userRole === "USER") {
    return [...userNav, ...baseNav];
  }
  return baseNav;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userInfo, setUserInfo] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await me();
      setUserInfo(res);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const navMain = loading ? [] : getNavData(userInfo?.data?.role || "");

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 mb-2 border-b flex flex-row">
        <div className="text-sidebar-accent-foreground flex items-center gap-2 py-1.5">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-lg leading-tight">
            <span className="truncate font-medium">
              {userInfo?.data && userInfo.data.role === "ADMIN"
                ? "Admin Dashboard"
                : "User Dashboard"}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSettings settings={settings} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
