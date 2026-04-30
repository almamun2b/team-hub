import ComingSoon from "@/components/shared/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password - Travel Buddy",
  description:
    "Set a new password for your Travel Buddy account and secure your travel profile",
};

const ResetPasswordPage = () => {
  return (
    <ComingSoon
      title="Coming Soon"
      description="This feature is currently under development. We'll notify you when it's ready!"
      showNotification={false}
    />
  );
};

export default ResetPasswordPage;
