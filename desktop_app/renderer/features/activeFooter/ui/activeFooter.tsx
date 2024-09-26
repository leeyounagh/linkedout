import React, { useState, useEffect } from "react";
import { Footer } from "@/shared/ui/footer";
import { useRouter } from "next/navigation";
import { useStore } from "@/shared/store";

interface IconMap {
  home: React.ReactElement;
  myessay: React.ReactElement;
  community: React.ReactElement;
  mypage: React.ReactElement;
}

const routerMapper = {
  home: "/web/main",
  myessay: "/web/myessay",
  community: "/web/community",
  mypage: "/web/mypage",
};

function ActiveFooter({ isModalOpen }: { isModalOpen?: boolean }) {
  const router = useRouter();
  const path = useStore((state) => state.path);
  const setPath = useStore((state) => state.setPath);
  const focusedKey =
    (Object.keys(routerMapper) as Array<keyof IconMap>).find(
      (key) => routerMapper[key] === path
    ) || "home";

  useEffect(() => {
    if (focusedKey !== "home") {
      setPath(routerMapper[focusedKey]);
    }
  }, [focusedKey, setPath]);

  const handleIconClick = (key: keyof IconMap) => {
    setPath(routerMapper[key]);
    router.push(routerMapper[key]);
  };

  return <Footer focusedKey={focusedKey} onIconClick={handleIconClick} isModalOpen={isModalOpen} />;
}

export default ActiveFooter;
