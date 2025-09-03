import { useMemo, useRef, useState } from 'react';
import '../assets/css/SearchBar.css';
import { useAppDispatch } from '../hooks/useAppSelector';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { setSearchQuery } from '../store/productSlice';

const SearchBar = ({ popularSearches }: { popularSearches: string[] }) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const [isSelectedByPopular, setIsSelectedByPopular] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const showPopular = useMemo(() => {
    return  !inputValue.trim() && isSelectedByPopular;
  }, [inputValue, isSelectedByPopular]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch(setSearchQuery(value));
  };

  const handleTagClick = (term: string) => {
    setInputValue(term);
    dispatch(setSearchQuery(term));
  };

  const handleFocus = () => {
    setIsSelectedByPopular(true);
  };

  const clearInput = () => {
    setInputValue('');
    dispatch(setSearchQuery(''));
    setIsSelectedByPopular(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useOutsideClick(containerRef, () => {
    setInputValue('');
    dispatch(setSearchQuery(''));
    setIsSelectedByPopular(false);
  });

  return (
    <section className="search-section">
      <div className="container" ref={containerRef}>
        <input
          ref={inputRef} 
          id='search'
          type="text"
          placeholder="Поиск товаров..."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="search-input"
        />
         {inputValue && (
            <button
              type="button"
              className="search-clear"
              onClick={clearInput}
              aria-label="Очистить поиск"
            >
              ✕
            </button>
          )}

        {showPopular && (
          <div className="popular-searches">
            <p>Часто ищут:</p>
            <div className="popular-tags">
              {popularSearches.map((term, i) => (
                <button
                  key={i}
                  type="button"
                  className="tag"
                  onClick={() => handleTagClick(term)}
                  tabIndex={-1}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default SearchBar;
