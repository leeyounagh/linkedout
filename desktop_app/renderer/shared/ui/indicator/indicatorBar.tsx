import React from "react";
import IndicatorBarStep1 from "@/shared/assets/img/IndicatorBarStep1.svg";
import IndicatorBarStep2 from "@/shared/assets/img/IndicatorBarStep2.svg";
import IndicatorBarStep3 from "@/shared/assets/img/IndicatorBarStep3.svg";
import IndicatorBarStep4 from "@/shared/assets/img/IndicatorBarStep4.svg";

function IndicatorBar({
  step,
  onClick,
}: {
  step: string;
  onClick?: () => void;
}) {
  const getSvg = () => {
    switch (step) {
      case "step1":
        return <IndicatorBarStep1 className="indicator" onClick={onClick} />;
      case "step2":
        return <IndicatorBarStep2 className="indicator" onClick={onClick} />;
      case "step3":
        return <IndicatorBarStep3 className="indicator" onClick={onClick} />;
      case "step4":
        return <IndicatorBarStep4 className="indicator" onClick={onClick} />;
      default:
        return <IndicatorBarStep1 className="indicator" onClick={onClick} />;
    }
  };
  return getSvg();
}

export default IndicatorBar;
