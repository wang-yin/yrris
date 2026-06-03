export interface PostSummary {
  _id?: string;
  title: string;
  slug: string;
  publishedAt: string;
  categories?: string;
  category?: string;
  tags?: string[];
  excerpt?: string;
}

export interface HomeCategoryData {
  _id: string;
  title: string;
  slug: string | null;
  posts: PostSummary[];
}
