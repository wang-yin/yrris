"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi"; // 💡 引入一個細緻的向上箭頭

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 💡 1. 監聽網頁滾動距離
  useEffect(() => {
    const toggleVisibility = () => {
      // 當下滑超過 300 像素時亮起，否則隱藏
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // 🧹 良好習慣：組件卸載時清除監聽器，防止記憶體洩漏（面試加分點）
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 💡 2. 平滑滾動回頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 💡 瀏覽器原生平滑滾動
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-6 bottom-6 lg:right-8 lg:bottom-8 p-3 rounded-full border-2 border-BuffIt bg-SugarQuill text-Umber shadow-md cursor-pointer transition-all duration-500 ease-out z-50 group hover:bg-DinosaurEgg hover:border-DinosaurEgg hover:text-SugarQuill hover:-translate-y-1 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="回到頂部"
    >
      {/* 箭頭 Icon：Hover 時加上往上微微彈跳的動畫 */}
      <FiArrowUp
        size={20}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
