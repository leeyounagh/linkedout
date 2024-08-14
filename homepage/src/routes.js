import Main from "./pages/main";
import OperationalPolicy from "./pages/operational-policy";
import Terms from "./pages/terms";
import LocationTerms from "./pages/location-terms";
import PrivacyPolicy from "./pages/privacy-policy";

const routes = [
  {
    key: "main",
    route: "/",
    component: <Main />,
  },
  {
    key: "terms",
    route: "/terms",
    component: <Terms />,
  },
  {
    key: "location-terms",
    route: "/location-terms",
    component: <LocationTerms />,
  },
  {
    key: "privacy-policy",
    route: "/privacy-policy",
    component: <PrivacyPolicy />,
  },
  {
    key: "operational-policy",
    route: "/operational-policy",
    component: <OperationalPolicy />,
  },
];

export default routes;
