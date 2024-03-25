import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { addOrUpdateToCart, removeFromCart, getCart } from '../firebase';
import { useAuthContext } from 'context/AuthContext';

export default function useCart() {
    const { uid } = useAuthContext();
    const queryClient = useQueryClient();

    // uid가 존재하는 경우에만 사용하도록
    const cartQuery = useQuery({
        queryKey: ['carts', uid || ''],
        queryFn: () => getCart(uid),
        enabled: !!uid,
    });

    // 불필요하게 모든 카트들이 업데이트 되는 경우를 방지
    // 한 컴퓨터에서 다수의 사용자가 로그인 하는 경우
    const addOrUpdateItem = useMutation({
        mutationFn: (product) => addOrUpdateToCart(uid, product),
        onSuccess: () => queryClient.invalidateQueries(['carts', uid])
    })

    const removeItem = useMutation({
        mutationFn: (id) => removeFromCart(uid, id), 
        onSuccess: () => queryClient.invalidateQueries(['carts', uid])
        
    })

    return {
        cartQuery,
        addOrUpdateItem,
        removeItem
    }
}