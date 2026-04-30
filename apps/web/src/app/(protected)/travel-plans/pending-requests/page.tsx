import PendingRequests from "@/components/modules/travelPlan/PendingRequests";
import { getPendingRequestsForMyPlans } from "@/services/travelPlans/getPendingRequestsForMyPlans";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pending Requests - Travel Buddy",
  description:
    "Manage pending travel requests for your plans on Travel Buddy. Review and approve applications from fellow travelers.",
};

const page = async () => {
  const result = await getPendingRequestsForMyPlans();

  return (
    <PendingRequests pendingRequests={result.success ? result.data : []} />
  );
};

export default page;
