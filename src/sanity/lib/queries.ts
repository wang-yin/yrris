import { client } from "./client";
import { sanityFetch } from "./live";
import { PostDetail } from "@/types/blog";

export async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    tags,
    "categories": categories[]->title 
  }`;

  return await client.fetch(query);
}

export async function getLatestArticles() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0..5] {
    _id,
    title,
    publishedAt,
    "slug": slug.current,
    "category": categories[0]->title
  }`;

  // 改用 sanityFetch 包裹
  const { data } = await sanityFetch({
    query,
    // 如果你有使用到 params，可以這樣傳（沒有的話可以不寫）
    // params: {}
  });

  return data;
}

export async function getCategoriesWithPosts(categoryTitles: string[]) {
  const query = `
    *[_type == "category" && title in $categoryTitles]{
      _id,
      title,
      "slug": slug.current,
      "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0..5]{
        title,
        "slug": slug.current
      }
    }
  `;

  // 改用 sanityFetch
  const { data } = await sanityFetch({
    query,
    // 💡 關鍵點 1：變數名稱必須跟 GROQ 裡面的 $categoryTitles 完全一致
    params: { categoryTitles },
  });

  // 💡 關鍵點 2：必須 return data（原本 client.fetch 是直接回傳陣列，但 sanityFetch 回傳的是個物件）
  return data || [];
}

export async function getAllArticlesForArchive() {
  const query = `*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    "date": publishedAt,
    "categories": categories[]->title,
    "tags": tags,
    excerpt
  }`;

  const { data } = await sanityFetch({
    query,
    tags: ["posts"],
  });

  return data || [];
}

// 2. 根據 slug 取得文章詳細內容（包含前後篇）
export async function getPostDetail(slug: string): Promise<PostDetail | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    "categories": categories[]->title,
    tags,
    body,
    
    "prev": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0] {
      title,
      "slug": slug.current,
      publishedAt
    },
    
    "next": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc)[0] {
      title,
      "slug": slug.current,
      publishedAt
    }
  }`;

  const { data } = await sanityFetch({
    query,
    params: { slug }, // 帶入查詢變數
  });

  return data as PostDetail | null; // 回傳單篇文章物件（若找不到則為 null）
}
