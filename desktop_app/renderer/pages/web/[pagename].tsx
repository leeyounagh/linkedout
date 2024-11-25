"use client";
import RenderView from "@/pages-flat/index";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function Index() {
  const [pageName, setPageName] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pagename = searchParams.get("pagename");
    if (pagename) {
      setPageName(pagename);
    }
  }, [router, searchParams]);

  return (
    <div id="scroll-event">
      {pageName ? <RenderView pageName={pageName} /> : <div>Loading...</div>}
    </div>
  );
}

export default Index;
