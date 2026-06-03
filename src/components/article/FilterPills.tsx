"use client";

import { useRouter } from "next/navigation";

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

  const handlePillClick = (pill: string) => {
    if (pill === "全部") {
      router.push(`?type=${currentType}`, { scroll: false });
    } else {
      router.push(`?type=${currentType}&filter=${encodeURIComponent(pill)}`, {
        scroll: false,
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2.5 mb-12 justify-center max-w-2xl mx-auto select-none">
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
