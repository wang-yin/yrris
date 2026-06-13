"use client";
import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  securityLevel: "loose",
});

interface MermaidChartProps {
  chartCode: string;
}

export default function MermaidChart({ chartCode }: MermaidChartProps) {
  const uniqueId = `mermaid-${useId().replace(/:/g, "")}`;
  const [isOpen, setIsOpen] = useState(false); // 控制全螢幕燈箱開關

  useEffect(() => {
    const renderChart = async () => {
      try {
        const element = document.getElementById(uniqueId);
        const modalElement = document.getElementById(`${uniqueId}-modal`);

        if (element) {
          element.removeAttribute("data-processed");
          element.innerHTML = chartCode; // 確保填入原始碼
          await mermaid.run({ nodes: [element] });
        }

        // 如果燈箱打開了，同步渲染燈箱裡的那張圖
        if (isOpen && modalElement) {
          modalElement.removeAttribute("data-processed");
          modalElement.innerHTML = chartCode;
          await mermaid.run({ nodes: [modalElement] });
        }
      } catch (error) {
        console.error("Mermaid 渲染失敗:", error);
      }
    };

    renderChart();
  }, [chartCode, uniqueId, isOpen]);

  return (
    <>
      {/* 1. 文章內顯示的小圖（點擊可放大） */}
      <div className="flex flex-col items-center my-8 group">
        <div
          onClick={() => setIsOpen(true)}
          className="w-full max-w-3xl border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-gray-50/50 dark:bg-gray-900/50 cursor-zoom-in hover:shadow-md transition-all overflow-hidden relative"
          title="點擊放大查看完整時序圖"
        >
          {/* 提示小標籤 */}
          <div className="absolute top-2 right-2 text-xs bg-gray-200/80 dark:bg-gray-800/80 text-gray-500 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            🔍 點擊放大
          </div>

          <pre
            id={uniqueId}
            className="mermaid flex justify-center bg-transparent m-0 text-sm"
          >
            {chartCode}
          </pre>
        </div>
      </div>

      {/* 2. 全螢幕大燈箱（Modal） */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in cursor-zoom-out"
          onClick={() => setIsOpen(false)}
        >
          {/* 右上角關閉按鈕 */}
          <button
            className="absolute top-6 right-6 text-white text-3xl font-light hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          {/* 燈箱內部大圖容器 */}
          <div
            className="w-[90vw] h-[85vh] bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl overflow-auto flex items-start justify-center cursor-default"
            onClick={(e) => e.stopPropagation()} // 防止點擊白色區域也關閉
          >
            <pre
              id={`${uniqueId}-modal`}
              className="mermaid bg-transparent m-0 min-w-[800px] w-full text-base"
            >
              {chartCode}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}
