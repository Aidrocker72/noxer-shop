export interface IPagination {
  current_page: number;
  has_next: boolean;
  has_prev: boolean;
  next_page: number | null;
  prev_page: number | null;
  per_page: number;
  total_pages: number;
  total_products: number;
}
