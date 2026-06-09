import PostcardCategory from "@/components/home/PostcardCategory";
import EnvelopeCard from "@/components/home/EnvelopeCard";
import {
  getLatestArticles,
  getCategoriesWithPosts,
} from "@/sanity/lib/queries";
import { HomeCategoryData, PostSummary } from "@/types/blog";

export default async function Home() {
  const latestArticles = ((await getLatestArticles()) as PostSummary[]) || [];
  const categoriesData =
    ((await getCategoriesWithPosts([
      "LeetCode",
      "SideProject",
    ])) as HomeCategoryData[]) || [];
  return (
    <>
      {/* 分類區塊 */}
      <div className="my-8 flex w-full items-center">
        <div className="grow border-t border-gray-300"></div>
        <span className="mx-4 shrink font-(family-name:--font-luoyan) text-2xl font-bold text-gray-600">
          分 類
        </span>
        <div className="grow border-t border-gray-300"></div>
      </div>

      <div className="grid h-auto grid-cols-1 gap-10 sm:grid-cols-2">
        {categoriesData.map((category: HomeCategoryData) => (
          <PostcardCategory
            key={category._id}
            title={category.title}
            posts={category.posts}
            slug={category.slug}
          />
        ))}
      </div>

      {/* 最新文章區塊 */}
      <div className="relative mt-20 md:mt-32">
        <div className="my-8 flex w-full items-center">
          <div className="grow border-t border-gray-300"></div>
          <span className="mx-4 shrink font-(family-name:--font-luoyan) text-2xl font-bold text-gray-600">
            最 新 文 章
          </span>
          <div className="grow border-t border-gray-300"></div>
        </div>
        <div className="bg-AlmondMilk absolute top-32 bottom-0 left-1/2 w-0.5 -translate-x-1/2" />

        {/* 時間軸線 */}
        <div className="relative space-y-12">
          {latestArticles &&
            latestArticles.map((article: PostSummary, index: number) => {
              const articleSlug =
                typeof article.slug === "object"
                  ? (article.slug as any).current
                  : article.slug;
              return (
                <EnvelopeCard
                  key={article._id || articleSlug || index}
                  title={article.title}
                  date={article.publishedAt}
                  category={article.category || "未分類"}
                  position={index % 2 === 0 ? "left" : "right"}
                  slug={article.slug}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
