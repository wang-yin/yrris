"use client";

import { MdOutlineFormatAlignLeft } from "react-icons/md";
import { convertTextToId } from "./utils/articleHelpers";
import { useState, useEffect, useMemo } from "react";
import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

interface TOCItem {
  text: string;
  id: string;
  level: "h2";
}

interface TableOfContentsProps {
  body: PortableTextBlock[];
  publishedAt?: string; // 💡 新增：接收從 Sanity 傳過來的發布日期
  wordCount: number;
  readingTime: number;
}

export default function TableOfContents({
  body,
  publishedAt,
  wordCount,
  readingTime,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // 💡 1. 擷取所有 H2 大標題
  const headings: TOCItem[] = useMemo(() => {
    return (body || [])
      .filter((block) => block._type === "block" && block.style === "h2")
      .map((block) => {
        const text =
          block.children
            ?.map((child) => (child as PortableTextSpan).text)
            .join("") || "";

        const id = convertTextToId(text);

        return { text, id, level: block.style as "h2" };
      });
  }, [body]);

  // 💡 3. 格式化發布日期 (例如將 2026-06-06T00:00:00Z 轉成 2026-06-06)
  const formattedDate = useMemo(() => {
    if (!publishedAt) return "未知日期";
    try {
      const date = new Date(publishedAt);
      return date.toISOString().split("T")[0];
    } catch {
      return publishedAt;
    }
  }, [publishedAt]);

  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-48px 0px -65% 0px",
      },
    );

    headingElements.forEach((el) => el && observer.observe(el));

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
              <li key={index} className="pl-0">
                <a
                  href={`#${heading.id}`}
                  className={`relative text-left w-full transition-all duration-200 text-sm leading-6 block ${
                    isActive
                      ? "text-Kilimanjaro font-medium"
                      : "text-SmokingMirror font-normal"
                  }`}
                >
                  {isActive && (
                    <span className="w-px h-7/10 bg-Umber absolute -left-4 translate-y-1/2"></span>
                  )}
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 💡 4. 文章數據欄位調整 */}
      <div className="mt-8 pt-5 text-xs space-y-2 border-t border-t-NobleCream text-ForgottenSandstone">
        <div className="flex justify-between px-1">
          <span>發布日期</span>
          <span className="text-SmokingMirror font-mono">{formattedDate}</span>
        </div>
        <div className="flex justify-between px-1">
          <span>文章字數</span>
          <span className="text-SmokingMirror font-mono">{wordCount} 字</span>
        </div>
        <div className="flex justify-between px-1">
          <span>閱讀時間</span>
          <span className="text-SmokingMirror font-mono">
            約 {readingTime} 分鐘
          </span>
        </div>
      </div>
    </aside>
  );
}
