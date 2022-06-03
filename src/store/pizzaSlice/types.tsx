export interface ISearchPizzaParams {
    sortBy:string,
    order:string,
    category:string,
    search:string,
    currentPage:string,
}

export interface IPizza {
    id: string,
    title: string,
    price: number,
    sizes: number[],
    types: number[],
    imageUrl: string,
}
export enum Status {
    LOADING= 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface IPizzasItemSlice {
    items: IPizza[],
    status: Status,
}