"use client";

import dynamic from "next/dynamic";

const DashboardShell = dynamic(
  () =>
    import("@/components/modules/dashboard/DashboardShell").then(
      (m) => m.DashboardShell
    ),
  { ssr: false }
);

export function DashboardShellClient({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardShell>{children}</DashboardShell>;
}
