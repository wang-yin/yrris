"use client";

import { useState, useMemo } from "react";
import Prism from "prismjs";

// 載入需要的語言語法解析器
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";

interface CodeBlockProps {
  value: {
    code: string;
    language?: string;
    filename?: string;
  };
}

export default function CodeBlock({ value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const codeText = value?.code || "";
  const lang = (value?.language || "javascript").toLowerCase();

  // 計算總行數
  const lines = useMemo(() => {
    return codeText.replace(/\n$/, "").split("\n");
  }, [codeText]);

  // 💡 設定超過幾行就自動觸發收合機制（這裡設定 10 行）
  const COLLAPSE_THRESHOLD = 10;
  const isLongCode = lines.length > COLLAPSE_THRESHOLD;

  // 控制展開/收合狀態：如果程式碼很長，預設就收合 (true)
  const [isCollapsed, setIsCollapsed] = useState(isLongCode);

  // 使用 useMemo 計算高亮 HTML
  const highlightedCode = useMemo(() => {
    if (!codeText) return "";
    try {
      const targetLang = lang === "c++" ? "cpp" : lang;
      const grammar = Prism.languages[targetLang] || Prism.languages.javascript;
      return Prism.highlight(codeText, grammar, targetLang);
    } catch (err) {
      console.error("Prism 高亮失敗:", err);
      return codeText;
    }
  }, [codeText, lang]);

  if (!codeText) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("複製失敗:", err);
    }
  };

  return (
    <div className="mb-6 rounded-xl overflow-hidden shadow-sm transition-all duration-300 border border-code">
      {/* Mac 風格頂部裝飾條 */}
      <div className="flex items-center justify-between px-4 py-2.5 select-none bg-codeselection border-b-code">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-codered" />
          <div className="w-2.5 h-2.5 rounded-full bg-codeyellow" />
          <div className="w-2.5 h-2.5 rounded-full bg-green" />

          <span className="text-xs ml-3 uppercase tracking-wider font-mono text-DarkSilver">
            {value.filename || lang || "code"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className={`cursor-pointer rounded px-2 py-1 text-xs font-mono transition-all duration-200 border${
            copied
              ? "text-green bg-/10 border-green/30"
              : "text-DarkSilver bg-transparent border-transparent"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* 程式碼內容包裝區：動態調整高度與動畫 */}
      <div
        className={`relative transition-all duration-500 ease-in-out overflow-hidden ${
          isCollapsed ? "max-h-65" : "max-h-500"
        }`}
      >
        {/* 實際程式碼內容 */}
        <div className="flex overflow-x-auto px-1 py-5 text-sm leading-relaxed scrollbar-hide bg-DarkCoffeeBrown font-['Courier_New',Courier,monospace]">
          {/* 左側：行號 */}
          <div className="select-none text-right pr-4 font-mono text-dansongyan border-r border-code min-w-10">
            {lines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>

          {/* 右側：真正的程式碼內容 */}
          <pre className="pl-4 m-0 flex-1 overflow-x-auto scrollbar-hide">
            <code
              className={`select-text block language-${lang} text-LightGrayishOrange whitespace-pre`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </div>

        {/* 遮罩漸層效果：只有在「程式碼很長」且「處於收合狀態」時才顯示 */}
        {isCollapsed && (
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(to top, #252018 15%, rgba(37, 32, 24, 0) 100%)",
            }}
          />
        )}
      </div>

      {/* 展開 / 收合 控制按鈕欄：只有當程式碼長度超過門檻時才渲染 */}
      {isLongCode && (
        <div className="flex justify-center py-2.5 select-none bg-codeselection border-t border-code">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="cursor-pointer text-xs font-mono tracking-wider px-4 py-1 rounded transition-colors duration-200 text-Ashwood border border-DarkGrayishBrown bg-DarkCoffeeBrown hover:text-LightGrayishOrange hover:border-dansongyan"
          >
            {isCollapsed ? "▼ 展開完整程式碼" : "▲ 收合程式碼"}
          </button>
        </div>
      )}
    </div>
  );
}
