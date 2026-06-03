"use client";

import { PostSummary } from "@/types/blog";
import Link from "next/link";
import { useState } from "react";

interface PostcardCategoryProps {
  title: string;
  slug: string | null;
  posts: PostSummary[];
}

export default function PostcardCategory({
  title,
  posts,
  slug,
}: PostcardCategoryProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    // 1. 確保最外層有 perspective 和 transform-style-3d
    <div
      className="perspective-1000 transform-style-3d relative h-full w-full"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`bg-SugarQuill transform-style-3d relative h-full w-full rounded-md border border-gray-300 transition-transform duration-700 ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* 正面：翻轉後 z-index 變低，且隱藏背面 */}
        <div
          className={`absolute inset-0 backface-hidden ${isFlipped ? "z-0 pointer-events-none" : "z-10 pointer-events-auto"}`}
          style={{ transform: "rotateY(0deg)" }} // 強制宣告正面視角
        >
          <div className="border-Antique absolute top-4 right-4 flex h-12 w-14 items-center justify-center border-2 border-dashed">
            {title === "LeetCode" ? "LC" : "SP"}
          </div>
          <div className="absolute bottom-4 left-8">
            <h3 className="text-Molasses mb-2 text-3xl">{title}</h3>
            <div className="bg-AlmondMilk mt-4 h-0.5 w-16"></div>
          </div>
        </div>

        {/* 背面：翻轉後 z-index 變高 (z-20)，確保它在最上層 */}
        <div
          className={`bg-SugarQuill absolute inset-0 rotate-y-180 rounded-md border border-gray-300 backface-hidden ${isFlipped ? "z-20 pointer-events-auto" : "z-0 pointer-events-none"}`}
          style={{ transform: "rotateY(180deg) translateZ(1px)" }} // 關鍵：用 translateZ(1px) 讓它在 3D 空間中浮出來
        >
          <div className="mt-6 ml-3 text-xl">{title}</div>
          <div className="grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-12 p-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/article/${post.slug}`}
                className="inline-block max-w-full truncate text-gray-600 hover:underline cursor-pointer"
              >
                {post.title}
              </Link>
            ))}
          </div>
          <p className="p-4 text-xs text-gray-400">
            {posts?.length || 0} 篇文章
          </p>
          <Link
            href={`/article?category=${title}`}
            className="absolute right-0 bottom-0 border-AlmondMilk text-Molasses rounded border-t border-l px-5 py-3 text-sm  cursor-pointer transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:border hover:bg-white hover:shadow-xl"
          >
            查看更多
          </Link>
        </div>
      </div>
    </div>
  );
}
