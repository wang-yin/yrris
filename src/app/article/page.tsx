import { Suspense } from "react";
import ArticleFileCard from "@/components/article/ArticleFileCard";
import FilterTabs from "@/components/article/FilterTabs";
import FilterPills from "@/components/article/FilterPills";
import { getAllArticlesForArchive } from "@/sanity/lib/queries";

type FilterType = "category" | "tag" | "year";

interface PageProps {
  searchParams: Promise<{
    type?: string;
    filter?: string;
  }>;
}

export default async function ArticlePage({ searchParams }: PageProps) {
  const { type, filter } = await searchParams;

  const currentType = (type as FilterType) || "category";
  const currentPill = filter || "全部";

  const rawArticles = (await getAllArticlesForArchive()) || [];

  const pillsSet = new Set<string>();
  rawArticles.forEach((article) => {
    if (currentType === "category" && article.category) {
      pillsSet.add(article.category);
    } else if (currentType === "tag" && Array.isArray(article.tags)) {
      article.tags.forEach((tag) => pillsSet.add(tag));
    } else if (currentType === "year" && article.publishedAt) {
      pillsSet.add(article.publishedAt.split("-")[0]);
    }
  });
  const dynamicPills = ["全部", ...Array.from(pillsSet)];

  const filteredArticles = rawArticles.filter((article) => {
    if (currentPill === "全部") return true;
    if (currentType === "category") return article.category === currentPill;
    if (currentType === "tag")
      return Array.isArray(article.tags) && article.tags.includes(currentPill);
    if (currentType === "year" && article.publishedAt)
      return article.publishedAt.startsWith(currentPill);
    return true;
  });

  return (
    <div className="w-full min-h-screen pt-12">
      {/* 標題區 */}
      <div className="mx-auto max-w-xl text-center mb-12 select-none">
        <h1 className="text-Umber font-(family-name:--font-luoyan) text-4xl mb-4 tracking-widest">
          文　章　檔　案　櫃
        </h1>
        <div className="border-AlmondMilk mx-auto w-24 border"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <FilterTabs currentType={currentType} />

        {/* pill */}
        <FilterPills
          pills={dynamicPills}
          currentPill={currentPill}
          currentType={currentType}
        />

        {/* 文章網格展示區 */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => {
              const dateStr = article.publishedAt || new Date().toISOString();
              const formattedDate = dateStr.split("T")[0];

              return (
                <ArticleFileCard
                  key={article._id || article.slug}
                  title={article.title}
                  date={formattedDate}
                  categories={article.categories || "未分類"}
                  tags={article.tags || []}
                  slug={article.slug}
                  excerpt={article.excerpt}
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

        {/* 底部總計 */}
        <div className="text-SmokingMirror mt-12 text-center text-xs tracking-wider border-t border-BuffIt/50 pt-6 max-w-xs mx-auto font-mono">
          TOTAL: {filteredArticles.length} PIECES
        </div>
      </div>
    </div>
  );
}
