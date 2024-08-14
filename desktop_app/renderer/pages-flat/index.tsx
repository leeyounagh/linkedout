"use client";
import { FindInfo } from "./findinfo";
import { Login } from "./authentication";
import { Mypage } from "./mypage";
import { Register } from "./register";
import { WriteEssay } from "./write_essay";
import { NotFound } from "./notfound";
import { SignUp } from "./authentication";
import { Complete } from "./authentication";
import { Main } from "./main";
import { withAuth } from "@/shared/lib/auth";
import { TermsofUse } from "./authentication";
import { Essay } from "./essay";
import { Community } from "./community";

const ProtectedMain = withAuth(Main);
const ProtectedFindInfo = withAuth(FindInfo);
const ProtectedMypage = withAuth(Mypage);
const ProtectedRegister = withAuth(Register);
const ProtectedWriteEssay = withAuth(WriteEssay);
const ProtectedComplete = withAuth(Complete);
const ProtectedEssay = withAuth(Essay);
const ProtectedCommunity = withAuth(Community);

type PageParams = {
  pagename: string;
};

export const getStaticPaths = async () => {
  const paths = [
    { params: { pagename: "main" } },
    { params: { pagename: "findinfo" } },
    { params: { pagename: "login" } },
    { params: { pagename: "signup" } },
    { params: { pagename: "complete" } },
    { params: { pagename: "mypage" } },
    { params: { pagename: "register" } },
    { params: { pagename: "write_essay" } },
  ];
  return { paths, fallback: false };
};

type StaticPropsContext = {
  params: PageParams;
};

export const getStaticProps = async ({ params }: StaticPropsContext) => {
  return {
    props: {
      pageName: params.pagename,
    },
  };
};

interface RenderViewProps {
  pageName: string;
}

const RenderView: React.FC<RenderViewProps> = ({ pageName }) => {
  if (!pageName) {
    return <div>Loading...</div>;
  }
  switch (pageName) {
    case "main":
      return <ProtectedMain />;
    case "findinfo":
      return <ProtectedFindInfo />;
    case "login":
      return <Login />;
    case "termsofuse":
      return <TermsofUse />;
    case "signup":
      return <SignUp />;
    case "essay":
      return <ProtectedEssay />;
    case "community":
      return <ProtectedCommunity />;
    case "complete":
      return <ProtectedComplete />;
    case "mypage":
      return <ProtectedMypage />;
    case "register":
      return <ProtectedRegister />;
    case "write_essay":
      return <ProtectedWriteEssay />;
    default:
      return <NotFound />;
  }
};

export default RenderView;
