import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    searchValue:'',
    category: 0,
    sort:
        {name: 'популярности', sortProperty: 'rating'},
    currentPage:1
}


export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue: (state,action) => {
            state.searchValue = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setSort: (state, action) => {
            state.sort = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setFilter: (state, action) => {
            state.category = Number(action.payload.categoriesId)
            state.currentPage =Number(action.payload.currentPage)
            state.sort.sortProperty= action.payload.selectedSort


        }
    },
})


export const selectSort = (state) => state.filter.sort
export const selectCategoriesId = (state) => state.filter.category
export const selectCurrentPage = (state) => state.filter.currentPage

export const {setCategory,setSort,setCurrentPage,setFilter,setSearchValue} = filterSlice.actions

export default filterSlice.reducer