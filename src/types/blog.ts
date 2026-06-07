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
