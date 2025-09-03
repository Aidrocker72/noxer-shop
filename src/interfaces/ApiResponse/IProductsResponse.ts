import type { ICategory } from "../Product/ICategory";
import type { IProduct } from "../Product/IProduct";
import type { IPagination } from "./IPagination";
import type { IProjectSettings } from "./IProjectSettings";

export interface IProductsResponse {
  products: IProduct[];
  pagination?: IPagination;
  project?: IProjectSettings;
  success?: boolean;
  categories: ICategory[];
}