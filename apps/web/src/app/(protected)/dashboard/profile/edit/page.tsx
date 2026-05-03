import { me } from "@/services/auth/me";
import { redirect } from "next/navigation";
import { UpdateProfileForm } from "@/components/modules/profile/EditProfileForm";

export const dynamic = "force-dynamic";

export default async function EditProfilePage() {
  const user = await me();

  if (!user?.success || !user.data) {
    redirect("/login");
  }

  return <UpdateProfileForm user={user.data} />;
}