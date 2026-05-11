"use client";

import Link from "next/link";
import { useState } from "react";

export default function PostcardCategory({ title, posts, slug }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 relative h-full w-full"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`bg-postcardbg transform-style-3d relative h-full w-full rounded-md border border-gray-300 backface-hidden transition-transform duration-700 ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* 正面 */}
        <div className="border-stamp absolute top-4 right-4 flex h-12 w-14 items-center justify-center border-2 border-dashed">
          {title === "LeetCode" ? "LC" : "SP"}
        </div>
        <div className="absolute bottom-4 left-8">
          <h3 className="text-postcardtitle mb-2 text-3xl">{title}</h3>
          <div className="bg-postcardtitlebar mt-4 h-0.5 w-16"></div>
        </div>
        {/* 背面 */}
        <div className="bg-postcardbg absolute inset-0 rotate-y-180 rounded-md border border-gray-300 backface-hidden">
          <div className="mt-6 ml-3 text-xl">{title}</div>
          <div className="grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-12 p-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="truncate text-gray-600"
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
            className="border-postcardtitlebar text-postcardtitle hover:bg-postcardtitlebar rounded border px-3 py-1 text-xs transition-colors hover:text-white"
          >
            查看更多
          </Link>
        </div>
      </div>
    </div>
  );
}
