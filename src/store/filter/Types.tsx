export enum SortPropertyEnum {
    RATING_DES = 'rating',
    PRICE_DES = 'price',
    TITLE_DES = 'title',
    RATING_ASC = '-rating',
    PRICE_ASC = '-price',
    TITLE_ASC = '-title',
}

export interface ISortFilter {
    name: string,
    sortProperty: SortPropertyEnum,

}

export interface IFilterSlice {
    searchValue: string,
    categoryId: number,
    currentPage: number,
    sort: ISortFilter

}
