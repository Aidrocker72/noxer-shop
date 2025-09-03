import { api } from '../api/axiosInstance';
import type { IProductsResponse } from '../interfaces/ApiResponse/IProductsResponse';

export const productsService = {
  async getPagedProducts(page: number): Promise<IProductsResponse> {
    const response = await api.get<IProductsResponse>('', {
      params: {
        on_main: false,
        per_page: 100,
        page,
      },
    });
    return response.data;
  },
};