import { getPostDetail } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { GoTag } from "react-icons/go";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import TableOfContents from "@/components/article/TableOfContents";
import ArticleRenderer from "@/components/article/ArticleRenderer";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostDetail(slug);

  // 如果找不到文章，直接觸發 Next.js 內建的 404 頁面
  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? post.publishedAt.split("T")[0]
    : "未知日期";

  return (
    <div className="flex">
      <div className="max-w-6xl mx-auto px-6 pb-0 pt-10">
        {/* 返回 */}
        <button className="flex items-center gap-2 mb-10 text-article cursor-pointer group font-(family-name:--font-luoyan)">
          <FaArrowLeft
            color="#a09688"
            size={15}
            className="transition-transform group-hover:-translate-x-0.75"
          />
          <span className="text-lg">返回列表</span>
        </button>
        <div className="flex pt-10 mt-12 max-w-6xl mx-auto px-6 pb-20  gap-10 items-start">
          {/* ── 左側目錄 ── */}
          <TableOfContents />

          {/* ── 主內容 ── */}
          <div className="flex-1 min-w-0">
            <div className="mb-10">
              {/* Tags */}
              <div></div>

              {/* 標題 */}
              <h1 className="text-4xl leading-tight mb-6 font-bold text-title">
                {post.title}
              </h1>

              {/* Meta 列 */}
              <div className="flex gap-x-5 gap-y-2 flex-wrap mb-10">
                <div className="flex items-center gap-1.5 text-article">
                  <span className="text-sm">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-article">
                  <FiClock size={12} />
                  <span className="text-sm">8 分鐘閱讀</span>
                </div>
                <div className="flex items-center text-article gap-2 flex-wrap">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="text-xs flex items-center gap-1">
                      <GoTag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 分割線 */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex-1 bg-cardcategorie h-px"></div>
                <div className="w-1.5 h-1.5 rounded-full border bg-circle border-circle"></div>
                <div className="flex-1 bg-cardcategorie h-px"></div>
              </div>
            </div>

            {/* 內文 */}
            <div className="rounded-2xl mb-8 bg-content border border-contentborder shadow-[0_2px_12px_rgba(90,84,70,0.07),0_1px_3px_rgba(90,84,70,0.05)]">
              <div className="px-10 py-10">
                <ArticleRenderer body={post.body} />
              </div>
              {/* 作者列 */}
              <div className="flex items-center justify-between px-10 py-5 border-contentborder border-t">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-cardcategorie text-articletitle">
                    Y
                  </div>
                  <div>
                    <div className="text-sm font-medium text-articletitle">
                      Yirris
                    </div>
                    <div className="text-xs text-data text-article">
                      {formattedDate}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-clock">8 分鐘閱讀</div>
              </div>
            </div>

            {/* 上 / 下一篇 */}
            <div className="grid grid-cols-2 gap-3 mt-10">
              <button className="border flex flex-col text-left p-4 rounded-xl bg-postcardbg border-articlebroder transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group">
                <div className="flex items-center text-article mb-2 gap-1.5">
                  <FaAngleLeft size={13} />
                  <span className="text-xs">上一篇</span>
                </div>
                <div className="text-sm font-medium leading-snug transition-transform group-hover:-translate-x-0.5 text-articletitle">
                  堆疊應用
                </div>
                <div className="text-xs mt-1 text-clock">2026-04-12</div>
              </button>
              <button className="border flex flex-col text-right p-4 rounded-xl bg-postcardbg border-articlebroder transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group">
                <div className="flex items-center justify-end text-article mb-2 gap-1.5">
                  <span className="text-xs">下一篇</span>
                  <FaAngleRight size={13} />
                </div>
                <div className="text-sm font-medium leading-snug transition-transform group-hover:-translate-x-0.5 text-articletitle">
                  堆疊應用
                </div>
                <div className="text-xs mt-1 text-clock">2026-04-12</div>
              </button>
            </div>
          </div>
          <div className="hidden lg:block shrink-0 w-50" />
        </div>
      </div>
    </div>
  );
}
