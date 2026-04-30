import ComingSoon from "@/components/shared/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon - Travel Buddy",
  description:
    "This is a coming soon page. We're working on it and will be available soon.",
};

const ContactPage = () => {
  return (
    <ComingSoon
      title="Coming Soon"
      description="We're working on it and will be available soon."
      showNotification={false}
    />
  );
};

export default ContactPage;
