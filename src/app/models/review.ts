export interface Review {
  id: number;
  profile: {
    avatar_url?: string;
    full_name?: string;
  };
  rating: number;
  review_text: string;
  review_date: string;
}
