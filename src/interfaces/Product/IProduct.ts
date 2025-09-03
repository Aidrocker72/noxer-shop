import type { IAddImages } from "./IAddImages";
import type { ICategory } from "./ICategory";
import type { IColor } from "./IColor";
import type { IExluded } from "./IExcluded";
import type { IExtra } from "./IExtra";
import type { IImage } from "./IImage";
import type { IImportanceNum } from "./IImportanceNum";
import type { IMark } from "./IMark";
import type { IParameter } from "./IParameter";

export interface IProduct {
  Product_ID: number;
  Product_Name: string;
  OnMain: boolean;
  categories: ICategory[];
  marks: IMark[];
  images: IImage[];
  parameters: IParameter[];
  extras: IExtra[];
  from_crm: boolean | null;
  importance_num?: Array<IImportanceNum>;
  colors?: Array<IColor>;
  excluded?: Array<IExluded>;
  reviews?: any[];
  reviews_video?: any[];
  tags?: null | string[];
  Created_At?: string;
  Updated_At?: string;
  json_data?: {
    add_images?: Array<IAddImages>;
  } | null;
  extra_json?: Record<string, any>;
  discount?: number;
  sort_order?: number | null;
}