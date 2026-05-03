"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { 
  Target, 
  MessageSquare, 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3,
  User,
  Plus,
  Building2,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { User as UserType } from "@/types/auth";


const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Workspaces",
    href: "/workspaces",
    icon: Building2,
  },
  {
    name: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    name: "Announcements",
    href: "/announcements",
    icon: MessageSquare,
  },
  {
    name: "Kanban",
    href: "/kanban",
    icon: CheckSquare,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: UserType }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-lg">Team Hub</span>
                  <span className="truncate text-xs">Collaborative Workspace</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu className="p-2 space-y-1">
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild tooltip={item.name}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        {/* Workspace Switcher Placeholder */}
        <div className="mt-8 px-4 py-2 hidden">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 group-data-[collapsible=icon]:hidden">
            Workspaces
          </p>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start gap-2 border border-dashed hover:border-primary group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
                <Plus className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:hidden">New Workspace</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
