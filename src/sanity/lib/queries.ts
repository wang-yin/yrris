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
