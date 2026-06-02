import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

interface ArticleFileCardProps {
  title: string;
  date: string;
  categories: string;
  tags: string[];
  slug: string;
  excerpt?: string;
}

export default function ArticleFileCard({
  title,
  date,
  categories,
  tags,
  slug,
  excerpt,
}: ArticleFileCardProps) {
  const dateString = date ? date.split("T")[0] : "2026-01-01";
  const [year, month, day] = dateString.split("-");
  return (
    <Link href={`article/${slug}`} className="block">
      <div className="bg-SugarQuill border-BuffIt relative cursor-pointer rounded-lg border p-6 font-sans transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        {/* 膠帶裝飾 */}
        <div className="bg-SoftOrange absolute -top-4 right-1/2 h-8 w-20 rotate-8"></div>
        {/* 日期和分類 */}
        <div className="mb-3 flex flex-wrap gap-2 text-start items-center">
          {/* 顯示第一個分類，若無則顯示未分類 */}
          <span className="bg-BuffIt text-Umber rounded-full px-3 py-1 text-sm">
            {categories && categories.length > 0 ? categories[0] : "未分類"}
          </span>
          <span className="text-Umber text-sm">
            {year}-{month}-{day}
          </span>
        </div>
        {/* 標題 */}
        <h3 className="text-Umber mb-3 text-start text-lg">{title}</h3>
        {/* 文章摘要 */}
        <p className="text-sm text-ForgottenSandstone leading-relaxed mb-4 line-clamp-2 min-h-10">
          {excerpt}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="border-BuffIt text-Antique bg-DryBone rounded border px-2 py-1 text-xs"
            >
              # {tag}
            </span>
          ))}
        </div>
        {/* Bar */}
        <div className="border-BuffIt mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-Antique text-xs">點擊查看</p>
            <MdArrowRightAlt className="text-Antique text-sm" />
          </div>
        </div>
      </div>
    </Link>
  );
}
