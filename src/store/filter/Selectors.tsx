import {RootState} from "../store";

export const sortFilter = (state: RootState) => state.filter.sort
export const selectCategoriesId = (state: RootState) => state.filter.categoryId
export const selectCurrentPage = (state: RootState) => state.filter.currentPage
export const selectSearch = (state: RootState) => state.filter