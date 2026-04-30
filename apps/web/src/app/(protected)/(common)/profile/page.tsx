import { ProfileContent } from "@/components/modules/profile/ProfileContent";
import { me } from "@/services/auth/me";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "My Profile - Travel Buddy",
  description:
    "View and manage your Travel Buddy profile. Update your information, travel interests, and connect with fellow travelers.",
};

const ProfilePage = async () => {
  const res = await me();

  if (!res?.data?.email) {
    notFound();
  }

  return <ProfileContent user={res.data} />;
};

export default ProfilePage;
