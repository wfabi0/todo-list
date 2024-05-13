"use client";

import { useEffect, useState } from "react";

export default function NavTitleMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    isMobile && (
      <div>
        <h1 className="text-xl font-bold text-slate-800 ">TODO LIST</h1>
      </div>
    )
  );
}
