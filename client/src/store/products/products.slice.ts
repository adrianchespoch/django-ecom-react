import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';

import { ecomApi, ecomApiAuth } from '@/shared/axios';
import {
  Product,
  ProductsResponse,
  ProductsSearchResponse,
} from '@/shared/interfaces';

export const searchProduct = async (query: string) => {
  const response = await ecomApiAuth.get<ProductsSearchResponse>(
    `/products/search/?query=${query}`
  );
  return response.data;
};

export const useInfiniteQueryProducts = () =>
  useInfiniteQuery(['products'], getProducts, {
    getNextPageParam: (page: any) => page.meta.next,
  });

export const useProductDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted!');
    },
    onError: () => {
      toast.error('Error!');
    },
  });
};

export const useProductCreateMutation = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productLike: any) => createProductWithFile(productLike),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created!');
      navigate('/admin');
    },
    onError: () => {
      toast.error('Error!');
      navigate('/admin');
    },
  });
};

////* actions
export const getProducts = async ({ pageParam = 1 }) => {
  const response = await ecomApi.get<ProductsResponse>(
    `/products/?page=${pageParam}&pages=9`
  );

  return response.data;
};

export const createProductWithFile = async (data: Product) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description ?? '');
  formData.append('count_in_stock', data.count_in_stock.toString());
  formData.append('category', data.category);
  formData.append('price', data.price.toString());

  if (data.image) {
    formData.append('image', data.image);
  }

  await ecomApiAuth.post('/products/post/', formData);
};

const deleteProduct = async (id: number) =>
  ecomApiAuth.delete(`/products/delete/${id}/`);
