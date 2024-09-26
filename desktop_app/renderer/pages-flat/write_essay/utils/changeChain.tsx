import StepZeroGroupRing from "@/shared/assets/img/ring/5chained.svg";
import StepOneGroupRing from "@/shared/assets/img/ring/4chained.webp";
import StepTwoGroupRing from "@/shared/assets/img/ring/3chained.webp";
import StepThreeGroupRing from "@/shared/assets/img/ring/2chained.webp";
import StepFourGroupRing from "@/shared/assets/img/ring/0chained.webp";
import StepOneSingleRing from "@/shared/assets/img/loop.svg";
import StepTwoSingleRing from "@/shared/assets/img/ring/single2ring.webp";
import StepThreeSingleRing from "@/shared/assets/img/ring/single3ring.webp";

function changeGroupChain(action: string) {
  switch (action) {
    case "zero":
      return <StepZeroGroupRing className="forward-click-able"/>;
    case "one":
      return <img className="forward-click-able" src={StepOneGroupRing.src} alt="Step One Group Ring" />;
    case "two":
      return <img className="forward-click-able" src={StepTwoGroupRing.src} alt="Step Two Group Ring" />;
    case "three":
      return <img className="forward-click-able" src={StepThreeGroupRing.src} alt="Step Three Group Ring" />;
    case "four":
      return <img className="forward-click-able" src={StepFourGroupRing.src} alt="Step Four Group Ring" />;
    default:
      return <StepZeroGroupRing  className="forward-click-able"/>;
  }
}
function changeSingleChain(action: string) {
  switch (action) {
    case "zero":
      return null;
    case "one":
      return <StepOneSingleRing className="reverse-click-able"/>;
    case "two":
      return <img className="reverse-click-able"src={StepTwoSingleRing.src} alt="Step Two single Ring" />;
    case "three":
      return <img className="reverse-click-able"src={StepThreeSingleRing.src} alt="Step Three single Ring" />;
    case "four":
      return null;
    default:
      return null;
  }
}
export { changeGroupChain, changeSingleChain };
