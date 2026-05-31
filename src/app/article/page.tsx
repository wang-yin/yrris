"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense, useMemo } from "react";
import ArticleFileCard from "@/components/article/ArticleFileCard";
import { getAllArticlesForArchive } from "@/sanity/lib/queries";

export default function Article() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [allArticles, setAllArticles] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("全部");
  const [activeItem, setActiveItem] = useState("");
  const filters = ["全部", "依分類", "依標籤", "依年份"];

  useEffect(() => {
    async function fetchData() {
      const data = await getAllArticlesForArchive();
      setAllArticles(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // 確保已經抓到資料，且 URL 有 category 參數
    if (allArticles.length > 0 && categoryFromUrl) {
      setSelectedFilter("依分類");
      setActiveItem(categoryFromUrl);
    }
  }, [categoryFromUrl, allArticles]);

  const dataMap = useMemo(() => {
    return {
      依分類: Array.from(
        new Set(allArticles.flatMap((a) => a.categories || [])),
      ),
      依標籤: Array.from(new Set(allArticles.flatMap((a) => a.tags || []))),
      依年份: Array.from(
        new Set(allArticles.map((a) => a.date?.split("-")[0] || "未知")),
      )
        .sort()
        .reverse(),
    };
  }, [allArticles]);

  const filteredArticles = (() => {
    if (selectedFilter === "全部") return allArticles;
    if (!activeItem) return [];

    return allArticles.filter((article) => {
      const year = article.date?.split("-")[0];
      if (selectedFilter === "依分類")
        return article.categories?.includes(activeItem);
      if (selectedFilter === "依標籤")
        return article.tags?.includes(activeItem);
      if (selectedFilter === "依年份") return year === activeItem;
      return true;
    });
  })();

  const currentItems = dataMap[selectedFilter] || [];

  return (
    <Suspense fallback={<div>整理檔案櫃中...</div>}>
      <div className="mx-auto mt-12 max-w-xl text-center">
        {/* 標題 */}
        <div className="mb-12">
          <h1 className="text-Umber font-(family-name:--font-luoyan) text-4xl">
            文　章　檔　案　櫃
          </h1>
          <div className="border-AlmondMilk mx-auto w-30 border"></div>
        </div>

        {/* 篩選類型切換 */}
        <div className="mb-12 grid grid-cols-2 justify-center gap-4 md:flex">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilter(filter);
                setActiveItem("");
              }}
              className={`cursor-pointer rounded-lg border px-3 py-1.5 transition-all duration-300 ${selectedFilter === filter ? "border-red-500 bg-red-100 text-red-500" : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 檔案櫃抽屜標籤 */}
        <div
          className={`mb-12 transform transition-all duration-500 ${selectedFilter === "全部" ? "hidden" : "block"}`}
        >
          <div className="bg-DryBone rounded-lg p-4">
            <div className="flex flex-wrap justify-start gap-4">
              {currentItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveItem(item)}
                  className={`cursor-pointer rounded-lg border px-3 py-1.5 transition-all ${activeItem === item ? "border-red-500 bg-red-100 text-red-500" : "border-gray-300"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 文章網格抽屜 */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 rounded-lg border bg-white p-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleFileCard
            key={article._id}
            title={article.title}
            date={article.date}
            categories={article.categories}
            tags={article.tags}
            slug={article.slug}
          />
        ))}
      </div>
      <div className="text-Antique mt-10 text-center text-sm">
        共找到 {filteredArticles.length} 篇文章
      </div>
    </Suspense>
  );
}
