"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface FilterPillsProps {
  pills: string[];
  currentPill: string;
  currentType: string;
}

export default function FilterPills({
  pills,
  currentPill,
  currentType,
}: FilterPillsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePillClick = (pill: string) => {
    // 1. 建立一個全新的 URLSearchParams 機制，複製目前的網址參數
    const params = new URLSearchParams(searchParams.toString());

    // 2. 根據點擊的按鈕，精準修改參數
    params.set("type", currentType);

    if (pill === "全部") {
      params.delete("filter"); // 如果是全部，就把 filter 參數從網址拔掉
    } else {
      params.set("filter", pill); // 如果不是，就設定對應的標籤（URLSearchParams 會自動處理 encodeURIComponent，不用手動寫）
    }

    // 3. 用 startTransition 溫柔包裹
    startTransition(() => {
      // 💡 關鍵修正：必須帶上當前路徑（window.location.pathname），後面接上 ?${params.toString()}
      // 這樣 Next.js 才會知道你是在「當前網頁」內部做切換，而不是迷路跑去首頁！
      router.push(`${window.location.pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  return (
    <div className="flex flex-wrap gap-2.5 mb-12 justify-center max-w-2xl mx-auto select-none ">
      {pills.map((pill) => {
        const isSelected = currentPill === pill;
        return (
          <button
            key={pill}
            onClick={() => handlePillClick(pill)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 cursor-pointer ${
              isSelected
                ? "bg-DinosaurEgg text-SugarQuill border-DinosaurEgg shadow-xs"
                : "bg-DryBone border-BuffIt text-Molasses hover:border-Antique hover:bg-SilverBird"
            }`}
          >
            {pill}
          </button>
        );
      })}
    </div>
  );
}
