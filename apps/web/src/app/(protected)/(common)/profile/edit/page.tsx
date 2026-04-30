/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateProfileForm } from "@/components/modules/profile/EditProfileForm";
import { me } from "@/services/auth/me";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Profile - Travel Buddy",
  description:
    "Update your Travel Buddy profile information, travel preferences, and personal details to enhance your travel matching experience.",
};

const EditProfilePage = async () => {
  const res = (await me()) as any;

  if (!res?.data?.email) {
    notFound();
  }

  return <UpdateProfileForm user={res?.data} />;
};

export default EditProfilePage;
