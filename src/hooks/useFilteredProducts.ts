import { useMemo } from 'react';
import type { IProduct } from '../interfaces/Product/IProduct';

export const useFilteredProducts = (
  allProducts: IProduct[],
  searchQuery: string,
  activeCategory: number | null
) => {
  return useMemo(() => {
    if (!allProducts.length) return [];

    const q = searchQuery.toLowerCase().trim();

    if (!q && !activeCategory) return allProducts;

    return allProducts.filter((product) => {
      const matchesSearch = !q ||
        product.Product_Name.toLowerCase().includes(q) ||
        product.parameters.some((param) =>
          param.name.toLowerCase().includes(q)
        );

      const matchesCategory = !activeCategory ||
        product.categories.some((cat) => cat.Category_ID === activeCategory);

      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchQuery, activeCategory]);
};
