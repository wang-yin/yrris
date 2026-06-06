"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type FilterType = "category" | "tag" | "year";
const FILTER_LABELS = ["分類", "標籤", "年份"];
const FILTER_TYPE_MAP: Record<string, FilterType> = {
  分類: "category",
  標籤: "tag",
  年份: "year",
};

interface FilterTabsProps {
  currentType: FilterType;
}

export default function FilterTabs({ currentType }: FilterTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); // 🟢 3. 獲取當前 URL 參數
  const [isPending, startTransition] = useTransition(); // 🟢 4. 宣告過渡狀態

  const handleTypeChange = (type: FilterType) => {
    // 建立 URLSearchParams，防禦相對路徑地雷
    const params = new URLSearchParams(searchParams.toString());

    // 💡 切換大分類（Tabs）時，重設 type 參數，並徹底清空具體的過濾值（filter）
    params.set("type", type);
    params.delete("filter");

    // 🟢 5. 用 startTransition 溫柔包裹路由跳轉
    startTransition(() => {
      router.push(`${window.location.pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  return (
    <div className="mb-8 flex justify-center select-none">
      <div className="flex items-center gap-2 bg-SilverBird p-1.5 rounded-full border border-Merino shadow-[inset_0_1px_3px_rgba(90,84,70,0.04)]">
        {FILTER_LABELS.map((label) => {
          const typeValue = FILTER_TYPE_MAP[label];
          const isActive = currentType === typeValue;
          return (
            <button
              key={label}
              onClick={() => handleTypeChange(typeValue)}
              className={`px-5 py-2 text-sm rounded-full font-medium transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-Umber text-SugarQuill shadow-sm"
                  : "text-ForgottenSandstone hover:text-Umber"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
