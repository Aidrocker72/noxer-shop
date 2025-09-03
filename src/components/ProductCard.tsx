import '../assets/css/ProductCard.css';
import { MarkNameEnum } from '../enums/MarkNameEnum';
import type { IProduct } from '../interfaces/Product/IProduct';

const ProductCard = ({ product }: { product: IProduct }) => {
  const mainImage = product.images.find(img => img.MainImage)?.Image_URL || 'https://via.placeholder.com/150?text=No+Image';
  const price = product.parameters[0]?.price || 0;
  const oldPrice = product.parameters[0]?.old_price || null;
  const marks = product.marks.map(m => m.Mark_Name);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={mainImage} alt={product.Product_Name} loading='lazy' />
        <div className="product-marks">
          {marks.includes(MarkNameEnum.NEW) && <span className="mark new">new</span>}
          {marks.includes(MarkNameEnum.HOT) && <span className="mark new">hot</span>}
          {marks.includes(MarkNameEnum.SALE) && <span className="mark sale">sale</span>}
          {marks.includes(MarkNameEnum.HIT) && <span className="mark hit">хит</span>}
          {marks.includes(MarkNameEnum.SALE) && <span className="mark discount">скидка</span>}
          {marks.includes(MarkNameEnum.PREMIUM) && <span className="mark premium">премиум</span>}
        </div>
      </div>
      <div className="product-info">
        <div className="price-block">
          
          <span className="new-price">{price} ₽</span>
          {oldPrice && <span className="old-price">{oldPrice} ₽</span>}
        </div>
        <h4 className="product-name">{product.Product_Name}</h4>
        <div className="product-action">
           <button className="btn-outline">Выбрать</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;