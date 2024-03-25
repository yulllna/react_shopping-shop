import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { addNewProduct, getProducts as fetchProducts } from '../firebase';

export default function useProducts() {
    const queryClient = useQueryClient();

    const productsQuery = useQuery({ 
        queryKey: ['products'], 
        queryFn: fetchProducts,
        staleTime: 1000 * 60,
    });

    const addProduct = useMutation({
        mutationFn: ({formData, url}) => addNewProduct(formData, url),
        onSuccess: () => queryClient.invalidateQueries(['products'])
    })

    return {
        productsQuery,
        addProduct
    }
}