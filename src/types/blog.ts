export interface PostSummary {
  _id?: string;
  title: string;
  slug: string;
  date: string;
  categories?: string;
  category?: string;
  tags?: string[];
  excerpt?: string;
  publishedAt: string;
}

export interface HomeCategoryData {
  _id: string;
  title: string;
  slug: string | null;
  posts: PostSummary[];
}

export interface PostDetail {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  mainImage?: any;
  categories: string[];
  tags: string[];
  body: any[];
  excerpt: string;

  prev: {
    title: string;
    slug: string;
    publishedAt: string;
  } | null;

  next: {
    title: string;
    slug: string;
    publishedAt: string;
  } | null;
}
