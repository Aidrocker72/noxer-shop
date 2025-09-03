import '../assets/css/CategorySwiper.css';
import { useAppDispatch } from '../hooks/useAppSelector';
import { setActiveCategory } from '../store/productSlice';

const CategorySwiper = ({ categories }: { categories: { Category_ID: number; Category_Name: string }[] }) => {
  const dispatch = useAppDispatch();

  return (
    <section className="category-swiper">
      <div className="container">
        <div className="swiper-container">
          <button type="button" onClick={() => dispatch(setActiveCategory(null))} className="category-card">
            <div className="category-img" />
            <p>Все</p>
          </button>
          {categories.map(cat => (
            <button
              key={cat.Category_ID}
              type="button"
              onClick={() => dispatch(setActiveCategory(cat.Category_ID))}
              className="category-card"
            >
              <div className="category-img" />
              <p>{cat.Category_Name}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySwiper;
