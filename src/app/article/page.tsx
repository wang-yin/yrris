"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense, useMemo } from "react";
import ArticleFileCard from "@/components/article/ArticleFileCard";
import { getAllArticlesForArchive } from "@/sanity/lib/queries";

type FilterType = "category" | "tag" | "year";

// 💡 頁面中文字與 FilterType 的映射對照表
const FILTER_TYPE_MAP: Record<string, FilterType> = {
  分類: "category",
  標籤: "tag",
  年份: "year",
};

const FILTER_LABELS = ["分類", "標籤", "年份"];

// ── 子元件：專職處理檔案櫃邏輯（隔離 useSearchParams） ──
function ArchiveContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 從 Sanity 撈回來的實質文章狀態
  const [rawArticles, setRawArticles] = useState<any[]>([]);
  console.log("rawArticles: ", rawArticles);
  const [loading, setLoading] = useState(true);

  // 當前選中的篩選大分類 (分類/標籤/年份)
  const [filterType, setFilterType] = useState<FilterType>("category");

  // 從 URL 網址列獲取當前的具體 Pill（例如：?filter=LeetCode），預設為 "全部"
  const currentPill = searchParams.get("filter") || "全部";

  // 初次載入時，去 Sanity 撈取實質文章資料
  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getAllArticlesForArchive();
        setRawArticles(data || []);
      } catch (error) {
        console.error("撈取檔案櫃文章失敗:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // 從 rawArticles 中動態萃取出目前分類的所有「不重複 Pills」
  const dynamicPills = useMemo(() => {
    if (rawArticles.length === 0) return ["全部"];

    const pillsSet = new Set<string>();

    rawArticles.forEach((article) => {
      if (filterType === "category" && article.category) {
        pillsSet.add(article.category);
      } else if (filterType === "tag" && Array.isArray(article.tags)) {
        article.tags.forEach((tag) => pillsSet.add(tag));
      } else if (filterType === "year" && article.publishedAt) {
        const year = article.publishedAt.split("-")[0];
        pillsSet.add(year);
      }
    });

    return ["全部", ...Array.from(pillsSet)];
  }, [rawArticles, filterType]);

  // 根據當前選中的 Pill，動態過濾出要顯示的文章
  const filteredArticles = useMemo(() => {
    if (currentPill === "全部") return rawArticles;

    return rawArticles.filter((article) => {
      if (filterType === "category") {
        return article.category === currentPill;
      }
      if (filterType === "tag") {
        return (
          Array.isArray(article.tags) && article.tags.includes(currentPill)
        );
      }
      if (filterType === "year" && article.publishedAt) {
        return article.publishedAt.startsWith(currentPill);
      }
      return true;
    });
  }, [rawArticles, filterType, currentPill]);

  // 切換大分類時，把具體過濾 Pill 重設回「全部」並清空網址
  const handleTypeChange = (type: FilterType) => {
    setFilterType(type);
    router.push("/article", { scroll: false }); // 清空網址 query 參數，維持在全部
  };

  // 點擊具體 Pill 時，更新網址列
  const handlePillClick = (pill: string) => {
    if (pill === "全部") {
      router.push("/article", { scroll: false });
    } else {
      router.push(`?filter=${encodeURIComponent(pill)}`, { scroll: false });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-SmokingMirror text-sm">
        正在開啟檔案櫃抽屜...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pb-24">
      {/* 篩選類型切換 (分類、標籤、年份) */}
      <div className="mb-8 flex justify-center">
        <div className="flex items-center gap-2 bg-SilverBird p-1.5 rounded-full border border-Merino shadow-[inset_0_1px_3px_rgba(90,84,70,0.04)]">
          {FILTER_LABELS.map((label) => {
            const typeValue = FILTER_TYPE_MAP[label];
            const isActive = filterType === typeValue;
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

      {/* 動態生成的具體篩選 Pills */}
      <div className="flex flex-wrap gap-2.5 mb-12 justify-center max-w-2xl mx-auto">
        {dynamicPills.map((pill) => {
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

      {/* 文章網格展示區 */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => {
            const dateStr = article.publishedAt || new Date().toISOString();
            const formattedDate = dateStr.split("T")[0];

            return (
              <ArticleFileCard
                key={article._id || article.slug} // 優化：優先使用 Sanity 的 _id
                title={article.title}
                date={article.date}
                categories={article.categories || "未分類"}
                tags={article.tags || []}
                slug={article.slug}
                excerpt={article.excerpt || "點擊閱讀更多精彩內容..."}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 select-none">
          <div className="text-5xl mb-4 opacity-70">☁️</div>
          <div className="text-sm font-medium text-ForgottenSandstone">
            這個抽屜是空的
          </div>
        </div>
      )}

      {/* 底部總計常數 */}
      <div className="text-SmokingMirror mt-12 text-center text-xs tracking-wider border-t border-BuffIt/50 pt-6 max-w-xs mx-auto font-mono">
        共 {filteredArticles.length} 篇
      </div>
    </div>
  );
}

// ── 主頁面外殼：包裹 Suspense 確保 Next.js 15 正常編譯 ──
export default function ArticlePage() {
  return (
    <div className="w-full min-h-screen pt-12">
      {/* 標題區 */}
      <div className="mx-auto max-w-xl text-center mb-12 select-none">
        <h1 className="text-Umber font-(family-name:--font-luoyan) text-4xl mb-4 tracking-widest">
          文　章　檔　案　櫃
        </h1>
        <div className="border-AlmondMilk mx-auto w-24 border"></div>
      </div>

      {/* 用 Suspense 優雅包裹內層 Container */}
      <Suspense
        fallback={
          <div className="text-center py-24 text-SmokingMirror text-sm">
            整理檔案櫃中...
          </div>
        }
      >
        <ArchiveContainer />
      </Suspense>
    </div>
  );
}
