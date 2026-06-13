"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import CodeBlock from "@/components/article/CodeBlock";
import QuestionBlock from "@/components/article/QuestionBlock";
import { convertTextToId } from "./utils/articleHelpers";
import VideoBlock from "./VideoBlock";
import MermaidChart from "./MermaidChart";

interface ArticleRendererProps {
  body: PortableTextBlock[];
}

export default function ArticleRenderer({ body }: ArticleRendererProps) {
  if (!body || body.length === 0) {
    return <p className="text-gray-400 italic">這篇文章沒有內文。</p>;
  }

  // 客製化 Sanity 的區塊渲染規則
  const myComponents: PortableTextComponents = {
    types: {
      myCodeBlock: ({ value }) => {
        if (value.language === "mermaid") {
          return <MermaidChart chartCode={value.code} />;
        }
        return <CodeBlock value={value} />;
      },
      questionBlock: ({ value }) => <QuestionBlock value={value} />,
      videoFile: ({ value }) => <VideoBlock value={value} />,
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 my-4 space-y-3 text-Molasses leading-7">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 my-4 space-y-3 text-Molasses leading-7">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        // marker:text-BuffIt 可以幫你的 bullet 點點染上漂亮的和風大地方塊色，細節感滿滿
        <li className="marker:text-BuffIt pl-1 text-[15px]">{children}</li>
      ),
      number: ({ children }) => (
        <li className="marker:text-BuffIt pl-1 text-[15px]">{children}</li>
      ),
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
            className="text-[22px] font-medium mt-9 mb-4 scroll-mt-8 tracking-[0.01em] text-Kilimanjaro"
          >
            # {children}
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
            className="text-[17px] font-medium mt-8 mb-3 scroll-mt-24 tracking-[0.01em] text-Kilimanjaro/90"
          >
            {children}
          </h3>
        );
      },
      // 一般段落 P
      normal: ({ children }) => (
        <p className="mb-5 text-[15px] leading-[1.85] text-Umber">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-7 px-6 py-4 rounded-xl text-sm leading-[1.85] bg-PeacefulWhite border-DinosaurEgg border-l-4 text-Umber italic">
          {children}
        </blockquote>
      ),
    },
    marks: {
      // 強調粗體
      strong: ({ children }) => (
        <strong className="font-bold text-Kilimanjaro text-[15px] ">
          {children}
        </strong>
      ),
      // 程式碼標籤 `code`
      code: ({ children }) => (
        <code className="px-1.5 py-0.5 mx-0.5 bg-CowMilk text-[#b85a3c] rounded text-[13px] font-mono break-keep inline align-baseline border border-Kilimanjaro/5">
          {children}
        </code>
      ),
    },
  };

  return (
    <div className="prose max-w-none">
      <PortableText value={body} components={myComponents} />
    </div>
  );
}
