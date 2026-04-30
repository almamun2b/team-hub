import ComingSoon from "@/components/shared/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - Travel Buddy",
  description:
    "Reset your Travel Buddy password securely and regain access to your travel plans",
};

const ForgotPasswordPage = () => {
  return (
    <ComingSoon
      title="Coming Soon"
      description="This feature is currently under development. We'll notify you when it's ready!"
      showNotification={false}
    />
  );
};

export default ForgotPasswordPage;
