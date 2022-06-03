export interface ICartItem {
    id:string,
    title:string,
    price:number,
    sizes:number,
    types:string,
    imageUrl:string,
    count:number,
}


export interface ICart {
    totalPrice:number
    items: ICartItem[]
}