import { ICartItem} from "../store/cart/Types";

export const calcTotalPrice = (items :ICartItem[]) => {
    return items.reduce((sum, obj) =>obj.price * obj.count  + sum, 0)
        }
