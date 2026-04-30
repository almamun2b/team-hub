import { VerifyEmailForm } from "@/components/modules/auth/VerifyEmailForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email - Travel Buddy",
  description:
    "Verify your email address to activate your Travel Buddy account and start your travel journey",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const email = params.email || "";

  return (
    <div className="max-w-md mx-auto py-10">
      <VerifyEmailForm email={email} />
    </div>
  );
}
