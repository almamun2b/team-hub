import ErrorBoundary from "@/components/shared/ErrorBoundary";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh mx-auto">
      <ErrorBoundary>{children}</ErrorBoundary>
    </main>
  );
}
