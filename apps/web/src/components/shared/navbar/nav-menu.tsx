/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavMenuProps = NavigationMenuProps & {
  onClickMenu?: () => void;
  navMenus: {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[];
};

export const NavMenu = ({ onClickMenu, navMenus, ...props }: NavMenuProps) => {
  const pathname = usePathname();

  const isActiveRoute = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 gap-y-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start text-base font-medium">
        {navMenus.map((menu: any) => {
          const isActive = isActiveRoute(menu.href);
          return (
            <NavigationMenuItem key={menu.label}>
              <NavigationMenuLink
                asChild
                className={cn("transition-all duration-200 relative")}
                data-active={isActive}
              >
                <Link href={menu.href} onClick={onClickMenu}>
                  {menu.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
