import type { IProduct } from "./Product/IProduct";

export interface IProductState {
  searchQuery: string;
  activeCategory: number | null;
  allProducts: IProduct[];
  filteredProducts: IProduct[];
}
