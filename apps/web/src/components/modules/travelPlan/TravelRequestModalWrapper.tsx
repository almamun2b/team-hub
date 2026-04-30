import { me } from "@/services/auth/me";
import TravelRequestModal from "./TravelRequestModal";

interface TravelRequestModalWrapperProps {
  travelPlanId: string;
}

export default async function TravelRequestModalWrapper({
  travelPlanId,
}: TravelRequestModalWrapperProps) {
  const userInfo = await me();

  if (!userInfo?.success || !userInfo?.data?.email) {
    return null;
  }

  return <TravelRequestModal travelPlanId={travelPlanId} />;
}
