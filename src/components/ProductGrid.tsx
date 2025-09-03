import CategorySwiper from './CategorySwiper';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetMainProductsQuery, useGetPagedProductsQuery } from '../api/productsApi';
import { useAppDispatch, useAppSelector } from '../hooks/useAppSelector';
import { useDebounce } from '../hooks/useDebounce';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import { generatePopularSearches } from '../utils/generatePopularSearches';

import { addProducts } from '../store/productSlice';

import '../assets/css/ProductGrid.css';


const ProductGrid = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data: mainData, isLoading: isMainLoading, isFetching: isFetchingMain } = useGetMainProductsQuery();
  const { data: pagedData, isFetching: isFetchinPaginate } = useGetPagedProductsQuery(page, {
    skip: page < 2
  });

  const { searchQuery, activeCategory, allProducts } = useAppSelector((state) => state.products);

  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  const categories = mainData?.categories || [];

  const filteredProducts = useFilteredProducts(allProducts, debouncedSearchQuery, activeCategory);

  useEffect(() => {
    if (mainData?.products) {
      dispatch(addProducts(mainData.products));
    }
  }, [mainData, dispatch]);

  useEffect(() => {
    if (pagedData?.products) {
      const newProducts = pagedData.products.filter(
        p => !allProducts.some(ap => ap.Product_ID === p.Product_ID)
      );
      if (newProducts.length > 0) {
        dispatch(addProducts(newProducts));
      }
      setHasMore(!!pagedData.pagination?.has_next);


    }
  }, [pagedData, allProducts, dispatch]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchinPaginate && hasMore) {
          setPage(prev => prev + 1);
        }
      },
      { rootMargin: '0px 0px 200px 0px' }
    );

    const current = sentinelRef.current;
    console.log(current)
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [isFetchingMain, isFetchinPaginate,  hasMore, page]);

  const popularSearches = useMemo(() => {
    if (!allProducts.length) return [];
    return generatePopularSearches(allProducts);
  }, [allProducts]);

  if (isMainLoading && page === 1) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <section className="product-grid">
      <SearchBar popularSearches={popularSearches} />
      <CategorySwiper categories={categories} />
      <div className="container">
        <div className="products-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.Product_ID} product={product} />
            ))
          ) : (
            <p>Товары не найдены</p>
          )}
        </div>
      </div>

      <div ref={sentinelRef} id="infinite-scroll-trigger" style={{
        height: '1px',
        pointerEvents: 'none',
        marginTop: '16px',
      }}
      />
    </section>
  );
};

export default ProductGrid;

