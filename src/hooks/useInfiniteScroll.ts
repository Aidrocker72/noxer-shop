import { useEffect, useRef } from 'react';
import type { IUseInfiniteScrollOptions } from '../interfaces/IUseInfiniteScrollOptions';

export const useInfiniteScroll = ({
  isLoading,
  hasMore,
  onLoadMore,
  rootMargin = '0px 0px 200px 0px'
}: IUseInfiniteScrollOptions) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const target = document.querySelector('#infinite-scroll-trigger');
    if (!target) return;

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading && hasMore) {
        onLoadMore();
      }
    }, { rootMargin });

    observer.current.observe(target);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoading, hasMore, onLoadMore, rootMargin]);
};
