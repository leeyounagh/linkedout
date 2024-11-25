import React, { useEffect, useState } from "react";
import { SideBar } from "@/shared/ui/sidebar";
import { useRouter } from "next/navigation";
import { useStore } from "@/shared/store";
import { Menu } from "@/shared/ui/menu";
import { usePathname } from "next/navigation";


interface IconMap {
  home: React.ReactElement;
  myessay: React.ReactElement;
  community: React.ReactElement;
  mypage: React.ReactElement;
  setting: React.ReactElement;
}

const routerMapper = {
  home: "/web/main",
  myessay: "/web/myessay",
  community: "/web/community",
  mypage: "/web/mypage",
  setting: "setting",
};

function ActiveSidebar({ isModalOpen }: { isModalOpen?: boolean }) {
  const router = useRouter();
  const path = useStore((state) => state.path);
  const setPath = useStore((state) => state.setPath);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const trimmedPathname = pathname.replace(/\/$/, "");
    setPath(trimmedPathname);
  }, [pathname]);

  const focusedKey =
    (Object.keys(routerMapper) as Array<keyof IconMap>).find(
      (key) => routerMapper[key] === path
    ) || "home";

  const handleIconClick = (key: keyof IconMap) => {
    setPath(routerMapper[key]);
    if (key !== "setting") {
      setIsMenuOpen(false);
      router.push(routerMapper[key]);
    } else {
      // 메뉴 관리 state 상태 변경
      setIsMenuOpen(true);
    }
  };
  if (isModalOpen) {
    return;
  }
  return (
    <>
      <SideBar focusedKey={focusedKey} onIconClick={handleIconClick} />

      {isMenuOpen && <Menu />}
    </>
  );
}

export default ActiveSidebar;
