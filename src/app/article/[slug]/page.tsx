import { getReadingTime } from "@/components/article/utils/articleHelpers";
import { getPostDetail } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { GoTag } from "react-icons/go";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import TableOfContents from "@/components/article/TableOfContents";
import ArticleRenderer from "@/components/article/ArticleRenderer";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    const article = await getPostDetail(slug);
    console.log("article: ", article);

    if (article?.title) {
      return {
        // 💡 核心調整：拿掉後綴，直接回傳純粹的文章標題，完全覆蓋掉根目錄的 template
        title: article.title,
        description: article.excerpt || "閱讀完整文章內容",
      };
    }
  } catch (error) {
    console.error("動態 Metadata 生成失敗:", error);
  }

  return {
    title: "文章詳情", // 備用防線也維持極簡
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostDetail(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? post.publishedAt.split("T")[0]
    : "未知日期";

  const { minutes: minutesToRead, wordCount } = getReadingTime(post.body);

  return (
    // 💡 1. 移除最外層不必要的 flex，改用單純的區塊，由 max-w 全權控管大局
    <div className="w-full min-h-screen">
      <div className="max-w-6xl mx-auto px-0 sm:px-6 pb-20 pt-10">
        {/* 返回按鈕 */}
        <Link
          href="/article" // 💡 順手幫你把 button 改成 Link，這樣才能真正點擊返回列表喔！
          className="inline-flex items-center gap-2 mb-10 text-SmokingMirror cursor-pointer group font-(family-name:--font-luoyan)"
        >
          <FaArrowLeft
            color="#a09688"
            size={15}
            className="transition-transform group-hover:-translate-x-0.75"
          />
          <span className="text-lg">返回列表</span>
        </Link>

        {/* 💡 2. 這裡才是真正的左右三欄三明治架構 (目錄 | 內文 | 右側對稱空欄) */}
        <div className="flex w-full gap-10 items-start mt-12">
          {/* ── 左側目錄 ── */}
          <TableOfContents
            body={post.body}
            publishedAt={post.publishedAt}
            wordCount={wordCount}
            readingTime={minutesToRead}
          />

          {/* ── 主內容 ── */}
          {/* 💡 3. 關鍵修正：加上 w-full 與 lg:max-w 限制，確保字少時依然撐滿完整格局，字多時也不會擠壓 */}
          <div className="flex-1 w-full min-w-0">
            <div className="mb-10">
              {/* Tags */}
              <div></div>

              {/* 標題 */}
              <h1 className="text-4xl leading-tight mb-6 font-bold text-Kilimanjaro">
                {post.title}
              </h1>

              {/* Meta 列 */}
              <div className="flex gap-x-5 gap-y-2 flex-wrap mb-10">
                <div className="flex items-center gap-1.5 text-SmokingMirror">
                  <span className="text-sm">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-SmokingMirror">
                  <FiClock size={12} />
                  <span className="text-sm">{minutesToRead} 分鐘閱讀</span>
                </div>
                <div className="flex items-center text-SmokingMirror gap-2 flex-wrap">
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
                <div className="flex-1 bg-BuffIt h-px"></div>
                <div className="w-1.5 h-1.5 rounded-full border bg-DinosaurEgg border-DinosaurEgg"></div>
                <div className="flex-1 bg-BuffIt h-px"></div>
              </div>
            </div>

            {/* 內文白卷軸 */}
            <div className="rounded-2xl mb-8 bg-SilverBird border border-Merino shadow-[0_2px_12px_rgba(90,84,70,0.07),0_1px_3px_rgba(90,84,70,0.05)]">
              <div className="px-10 py-10 sm:px-6">
                <ArticleRenderer body={post.body} />
              </div>

              {/* 作者列 */}
              <div className="flex items-center justify-between px-10 py-5 border-Merino border-t">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-BuffIt text-Umber">
                    Y
                  </div>
                  <div>
                    <div className="text-sm font-medium text-Umber">Yirris</div>
                    <div className="text-xs text-data text-SmokingMirror">
                      {formattedDate}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-ForgottenSandstone">
                  {minutesToRead} 分鐘閱讀
                </div>
              </div>
            </div>

            {/* 上 / 下一篇 */}
            <div className="grid grid-cols-2 gap-3 mt-10 select-none">
              {post.prev ? (
                <Link
                  href={`/article/${post.prev.slug}`}
                  className="border flex flex-col text-left p-4 rounded-xl bg-SugarQuill border-WheatSheaf transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
                >
                  <div className="flex items-center text-SmokingMirror mb-2 gap-1.5">
                    <FaAngleLeft size={13} />
                    <span className="text-xs">上一篇</span>
                  </div>
                  <div className="text-sm font-medium leading-snug transition-transform group-hover:-translate-x-0.5 text-Umber">
                    {post.prev.title}
                  </div>
                  <div className="text-xs mt-1 text-ForgottenSandstone">
                    {post.prev.publishedAt
                      ? post.prev.publishedAt.split("T")[0]
                      : "無日期"}
                  </div>
                </Link>
              ) : (
                <div></div>
              )}

              {post.next ? (
                <Link
                  href={`/article/${post.next.slug}`}
                  className="border flex flex-col text-right p-4 rounded-xl bg-SugarQuill border-WheatSheaf transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group items-end"
                >
                  <div className="flex items-center justify-end text-SmokingMirror mb-2 gap-1.5">
                    <span className="text-xs">下一篇</span>
                    <FaAngleRight size={13} />
                  </div>
                  <div className="text-sm font-medium leading-snug transition-transform group-hover:-translate-x-0.5 text-Umber">
                    {post.next.title}
                  </div>
                  <div className="text-xs mt-1 text-ForgottenSandstone">
                    {post.next.publishedAt
                      ? post.next.publishedAt.split("T")[0]
                      : "無日期"}
                  </div>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          {/* ── 右側對稱空白（維持主內容置中） ── */}
          {/* 💡 4. 這裡與左側的 TableOfContents 寬度互相呼應，確保中間的 article 永遠處於美學核心 */}
          <div className="hidden lg:block shrink-0 w-10" />
        </div>
      </div>
    </div>
  );
}
