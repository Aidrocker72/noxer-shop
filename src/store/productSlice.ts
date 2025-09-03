import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IProductState } from '../interfaces/IProductState';
import type { IProduct } from '../interfaces/Product/IProduct';

const initialState: IProductState = {
  searchQuery: '',
  activeCategory: null,
  allProducts: [],
  filteredProducts: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<number | null>) => {
      state.activeCategory = action.payload;
    },
    addProducts: (state, action: PayloadAction<IProduct[]>) => {
      const newProducts = action.payload.filter(
        p => !state.allProducts.some(ap => ap.Product_ID === p.Product_ID)
      );
      state.allProducts = [...state.allProducts, ...newProducts];
    },
  },
});

export const { setSearchQuery, setActiveCategory, addProducts } = productSlice.actions;
export default productSlice.reducer;