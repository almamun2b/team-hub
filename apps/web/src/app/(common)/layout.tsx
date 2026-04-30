import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
// import { Suspense } from "react";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <main className="min-h-dvh container mx-auto px-6">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
}
