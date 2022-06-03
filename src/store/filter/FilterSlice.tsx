import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IFilterSlice, ISortFilter, SortPropertyEnum} from "./Types";


const initialState: IFilterSlice = {
    searchValue: '',
    categoryId: 0,
    sort:
        {name: 'популярности', sortProperty: SortPropertyEnum.RATING_ASC},
    currentPage: 1
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        setCategory: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setSort: (state, action: PayloadAction<ISortFilter>) => {
            state.sort = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilter: (state, action: PayloadAction<IFilterSlice>) => {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId)
                state.currentPage = Number(action.payload.currentPage)
                state.sort = action.payload.sort
            } else {
                state.categoryId = 0
                state.sort = {
                    name: 'популярности',
                    sortProperty: SortPropertyEnum.RATING_DES
                }
                state.currentPage = 1
            }


        }
    },
})

export const {setCategory, setSort, setCurrentPage, setFilter, setSearchValue} = filterSlice.actions

export default filterSlice.reducer