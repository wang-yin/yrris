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
