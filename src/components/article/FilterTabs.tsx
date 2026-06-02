"use client";

import { useRouter, useSearchParams } from "next/navigation";

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

  const handleTypeChange = (type: FilterType) => {
    // 切換大分類時，重設 type 參數，並清空具體的過濾值
    router.push(`?type=${type}`, { scroll: false });
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
