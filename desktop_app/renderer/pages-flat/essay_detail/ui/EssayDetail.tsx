import React from "react";
import CompleteModal from "./contents/CompleteModal";
import { PrevButton } from "@/shared/ui/button";
import { ShowEssayDetails } from "@/features/showessaydetails";
import { useSearchParams } from "next/navigation";

function EssayDetail() {
  const searchParams = useSearchParams();
  const pageType = searchParams.get("pageType");
  const essayId = searchParams.get("id");
  const storyId =searchParams.get("storyId");
  const completedType = searchParams.get("type");

  return (
    <>
      <CompleteModal completedType={completedType?completedType:null}/>
      <ShowEssayDetails
        pageType={pageType ?? "public"}
        essayId={essayId ? Number(essayId) : 2643}
        storyId={Number(storyId)}
      />
    </>
  );
}

export default EssayDetail;
