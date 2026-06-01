import Link from "next/link";

export default function EnvelopeCard({
  title,
  date,
  category,
  position,
  slug,
}) {
  const dateString = date ? date.split("T")[0] : "2026-01-01";
  const [year, month, day] = dateString.split("-");
  return (
    <Link href={`/article/${slug}`} className="block">
      <div
        className={`flex items-center gap-8 ${position === "right" ? "flex-row-reverse" : ""}`}
      >
        {/* 日期郵戳 */}
        <div className="relative flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border-[3px] border-dashed border-[#d4ccba] bg-[#e8e0cf]">
          <div className="text-xs text-[#8a8272]">{year}</div>
          <div className="text-sm text-[#8a8272]">
            {month}/{day}
          </div>

          {/* 郵戳裝飾中線 */}
          <div className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-[#d4ccba]" />
        </div>

        {/* 信封卡片 */}
        <div className="group relative max-w-125 flex-1 cursor-pointer rounded-lg border border-[#d9d1c0] bg-[#ebe5d6] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          {/* 信封頂部漸層裝飾 */}
          <div className="absolute top-0 right-0 left-0 h-0.75 bg-linear-to-r from-transparent via-[#d4ccba] to-transparent" />

          {/* 郵票裝飾 */}
          <div className="absolute top-3 right-3 flex h-8 w-10 items-center justify-center border-2 border-dashed border-[#d4ccba] bg-[#e8e0cf] text-[10px] text-[#8a8272]">
            {category === "LeetCode" ? "LC" : "SP"}
          </div>

          {/* 內容區 */}
          <div className="pr-12">
            {/* 分類標籤 */}
            <div className="mb-3 inline-block rounded-full bg-[#d9d1c0] px-3 py-1 text-xs text-[#5a5446]">
              {category}
            </div>

            {/* 標題 */}
            <h3 className="text-lg text-[#5a5446] transition-transform group-hover:translate-x-1">
              {title}
            </h3>

            {/* 底部三段式折線 */}
            <div className="mt-4 flex gap-2">
              <div className="h-px flex-1 bg-[#d4ccba]" />
              <div className="h-px flex-1 bg-[#d4ccba]" />
              <div className="h-px flex-1 bg-[#d4ccba]" />
            </div>
          </div>

          {/* 信封封口裝飾三角形 (使用 Border 技巧) */}
          <div className="border-t-8px border-r-12px border-l-12px absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-t-[#ebe5d6] border-r-transparent border-l-transparent drop-shadow-[0_2px_1px_rgba(0,0,0,0.1)]" />
        </div>
      </div>
    </Link>
  );
}
