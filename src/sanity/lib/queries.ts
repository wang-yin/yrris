import { client } from "./client";

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
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0..5]{
      title,
      "slug": slug.current,
      publishedAt, 
      "category": categories[0]->title
    }
  `);
}

export async function getCategoriesWithPosts(categoryTitles: string[]) {
  return await client.fetch(
    `
    *[_type == "category" && title in $categoryTitles]{
      _id,
      title,
      "slug": slug.current,
      "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0..5]{
        title,
        "slug": slug.current
      }
    }
  `,
    { categoryTitles },
  );
}

export async function getAllArticlesForArchive() {
  return await client.fetch(
    // 1. GROQ 查詢字串 (已修正結尾多餘的逗號)
    `*[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      "date": publishedAt,
      "categories": categories[]->title,
      "tags": tags,
      excerpt
    }`,
    // 2. 查詢變數 (這裡沒有用到變數，傳入空物件)
    {},
    // 3. Next.js 15 的快取優化設定
    {
      next: {
        revalidate: 60, // 💡 叫 Vercel/Next.js 把這份列表在記憶體裡快取 60 秒，不用每次點擊都重新跟美國的 Sanity 要資料
        tags: ["posts"], // 💡 未來如果你在後端發布新文章，可以用這個 tag 瞬間清除快取
      },
    },
  );
}

export async function getPostDetail(slug: string) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      mainImage,
      "categories": categories[]->title,
      tags,
      body, // Sanity 的富文本 JSON 資料
      
      // 💡 新增：尋找「上一篇」（發布時間小於當前文章，且最接近的那一篇）
      "prev": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0] {
        title,
        "slug": slug.current,
        publishedAt
      },
      
      // 💡 新增：尋找「下一篇」（發布時間大於當前文章，且最接近的那一篇）
      "next": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc)[0] {
        title,
        "slug": slug.current,
        publishedAt
      }
    }`,
    { slug },
  );
}
