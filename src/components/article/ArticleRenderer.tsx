"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import CodeBlock from "@/components/article/CodeBlock";

// 這是一個輔助函式：把標題文字轉成乾淨的 ID（支援中英文、LeetCode 等特殊字元）
function convertTextToId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5-_]/g, "") // 僅保留中英數字、底線與連字號
    .replace(/\s+/g, "-"); // 空格轉連字號
}

export default function ArticleRenderer({ body }: { body: any }) {
  if (!body) return <p className="text-gray-400 italic">這篇文章沒有內文。</p>;

  // 客製化 Sanity 的區塊渲染規則
  const myComponents: PortableTextComponents = {
    types: {
      myCodeBlock: ({ value }) => <CodeBlock value={value} />,
    },
    block: {
      // 🟢 客製化 H2 渲染
      h2: ({ children }) => {
        // 抽出 children 裡面的純文字
        const text = Array.isArray(children)
          ? children.join("")
          : children?.toString() || "";
        const id = convertTextToId(text);
        return (
          <h2
            id={id}
            className="text-base font-medium mt-9 mb-4 scroll-mt-8 tracking-[0.01em] text-title"
          >
            {children}
          </h2>
        );
      },
      // 🟢 客製化 H3 渲染
      h3: ({ children }) => {
        const text = Array.isArray(children)
          ? children.join("")
          : children?.toString() || "";
        const id = convertTextToId(text);
        return (
          <h3
            id={id}
            className="text-xl font-semibold text-gray-800 mt-8 mb-3 scroll-mt-24"
          >
            {children}
          </h3>
        );
      },
      // 一般段落 P
      normal: ({ children }) => (
        <p className="mb-5 text-base leading-[1.85] text-articletitle">
          {children}
        </p>
      ),
    },
    marks: {
      // 強調粗體
      strong: ({ children }) => (
        <strong className="font-bold text-gray-900">{children}</strong>
      ),
      // 程式碼標籤 `code`
      code: ({ children }) => (
        <div className="mb-6 rounded-xl overflow-hidden border border-code">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-codeselection border-b-code">
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#febc2e",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#28c840",
              }}
            />
          </div>
          {children}
        </div>
      ),
    },
  };

  return (
    <div className="prose max-w-none">
      <PortableText value={body} components={myComponents} />
    </div>
  );
}
