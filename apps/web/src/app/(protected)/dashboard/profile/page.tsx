import { me } from "@/services/auth/me";
import { redirect } from "next/navigation";
import { ProfileContent } from "@/components/modules/profile/ProfileContent";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await me();

  if (!user?.success || !user.data) {
    redirect("/login");
  }

  return <ProfileContent user={user.data} />;
}