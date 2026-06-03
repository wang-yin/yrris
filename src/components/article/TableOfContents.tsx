"use client";

import { MdOutlineFormatAlignLeft } from "react-icons/md";
import { convertTextToId } from "./utils/articleHelpers";
import { useState, useEffect } from "react";
import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

interface TOCItem {
  text: string;
  id: string;
  level: "h2" | "h3";
}

interface TableOfContentsProps {
  body: PortableTextBlock[];
}

export default function TableOfContents({ body }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const headings: TOCItem[] = (body || [])
    .filter(
      (block) =>
        block._type === "block" && ["h2", "h3"].includes(block.style || ""),
    )
    .map((block) => {
      // 💡 3. 將 child 斷言或標記為 PortableTextSpan (標準的 Sanity 文字子節點型別)
      const text =
        block.children
          ?.map((child) => (child as PortableTextSpan).text)
          .join("") || "";

      const id = convertTextToId(text);

      return { text, id, level: block.style as "h2" | "h3" };
    });

  useEffect(() => {
    if (headings.length === 0) return;

    // 1. 抓取文章內所有對應的標題 DOM 節點
    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    // 2. 建立交會監聽器
    const observer = new IntersectionObserver(
      (entries) => {
        // 找出目前在畫面上半部最活躍的標題
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        // 🔍 微調這個 rootMargin 可以決定標題滾到畫面哪個高度時觸發發亮（-20% 代表畫面中上方觸發）
        rootMargin: "-20% 0px -60% 0px",
      },
    );

    // 3. 開始綁定監聽
    headingElements.forEach((el) => el && observer.observe(el));

    // 4. 清理機制
    return () => {
      headingElements.forEach((el) => el && observer.unobserve(el));
    };
  }, [headings]);

  if (headings.length === 0) return null;
  return (
    <aside className="hidden lg:block shrink-0 w-50 sticky top-10">
      <div className="flex items-center gap-2 mb-4 text-SmokingMirror">
        <MdOutlineFormatAlignLeft size={13} />
        <span className="text-sm font-medium uppercase tracking-widest">
          目錄
        </span>
      </div>
      <nav className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-PolishedLimestone"></div>
        <ul className="space-y-1 pl-4">
          {headings.map((heading, index) => {
            const isActive = activeId === heading.id;

            return (
              <li
                key={index}
                className={heading.level === "h3" ? "pl-5" : "pl-0"}
              >
                <a
                  href={`#${heading.id}`}
                  className={`relative text-left w-full transition-all duration-200 text-sm leading-6 ${isActive ? "text-Kilimanjaro font-medium" : "text-SmokingMirror font-normal"}`}
                >
                  {isActive && (
                    <span className="w-px h-7/10 bg-Umber absolute -left-4 translate-y-1/2"></span>
                  )}
                  {heading.level === "h3" ? "└ " : ""}
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
