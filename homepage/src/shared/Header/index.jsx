import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const [activePath, setActivePath] = useState("");

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]);

    const linkClasses = (path) => `mx-[51px] p-2 ${activePath === path ? "text-[#919191]" : "text-white"}`;

    return (
        <nav className="flex text-white justify-between items-center text-[20px] ">
            <Link to="/">
                <img src="/images/logo.svg" alt="로고" width={154} height={63.179} />
            </Link>
            <div>
                <Link to="/about" className={linkClasses("/about")}>
                    About
                </Link>
                <Link to="/learn" className={linkClasses("/learn")}>
                    Learn
                </Link>
                <Link to="/premium" className={linkClasses("/premium")}>
                    Premium
                </Link>
                <Link to="/newsletter" className={linkClasses("/newsletter")}>
                    NewsLetter
                </Link>
            </div>
            <p className="w-[143px] h-[46px] rounded-2xl bg-white text-[#121212] flex justify-center items-center">
                Get the App
            </p>
        </nav>
    );
}

export default Header;