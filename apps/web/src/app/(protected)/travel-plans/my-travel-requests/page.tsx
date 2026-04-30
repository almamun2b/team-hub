import MyTravelRequest from "@/components/modules/travelPlan/MyTravelRequest";
import { getMyTravelRequests } from "@/services/travelPlans/getMyTravelRequests";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Travel Requests - Travel Buddy",
  description:
    "View and manage your travel requests on Travel Buddy. Track your applications to join other travelers' plans.",
};

const page = async () => {
  const result = await getMyTravelRequests();

  return <MyTravelRequest travelRequests={result.success ? result.data : []} />;
};

export default page;
