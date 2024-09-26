"use client";
import { FindInfo } from "./findinfo";
import { Login } from "./authentication";
import { Mypage } from "./mypage";
import { WriteEssay } from "./write_essay";
import { SignUp } from "./authentication";
import { Complete } from "./authentication";
import { Main } from "./main";
import { withAuth } from "@/shared/lib/auth";
import { TermsofUse } from "./authentication";
import { MyEssay } from "./my_essay";
import { Community } from "./community";
import { UnfinishedWriting } from "./unfinished_writing";
import { EssayDetail } from "./essay_detail";

const ProtectedMain = withAuth(Main);
const ProtectedUnfinishedWriting = withAuth(UnfinishedWriting);
const ProtectedFindInfo = withAuth(FindInfo);
const ProtectedMypage = withAuth(Mypage);
const ProtectedWriteEssay = withAuth(WriteEssay);
const ProtectedComplete = withAuth(Complete);
const ProtectedMyEssay = withAuth(MyEssay);
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
    case "myessay":
      return <ProtectedMyEssay />;
    case "community":
      return <ProtectedCommunity />;
    case "complete":
      return <ProtectedComplete />;
    case "mypage":
      return <ProtectedMypage />;
    case "write_essay":
      return <ProtectedWriteEssay />;
    case "essay_details":
      return <EssayDetail />;
    case "unfinished_writing":
      return <ProtectedUnfinishedWriting />;
    default:
      return <ProtectedMain />;
  }
};

export default RenderView;
