import React, {useContext} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SkeletonPizzas from "../components/PizzaBlock/SkeletonPizzas";
import PizzaBlock from "../components/PizzaBlock";
import {SearchContext} from "../App";
import Pagination from "../components/Pagination";
import axios from "axios";


const HomePage = () => {
    const [items, setItems] = React.useState([])
    const [isLoaded, setIsLoaded] = React.useState(true)
    const [categoriesId, setCategoriesActive] = React.useState(0)
    const [selectedSort, setSelectedSort] = React.useState({
        name: 'популярности', sortProperty: 'rating'
    })
    const [currentPage, setCurrentPage] = React.useState(0)
    const {searchValue} = useContext(SearchContext)

    React.useEffect(() => {

        setIsLoaded(true)

        const sortType = selectedSort.sortProperty.replace('-', '')
        const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoriesId > 0 ? `category=${categoriesId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

       
        axios.get(
            `https://628169519fac04c654050e3b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`
        ).then((response)=>{
            setItems(response.data)
            setIsLoaded(false)
        })
        window.scroll(0, 0)
    }, [categoriesId, selectedSort, searchValue, currentPage])

    const pizzas = items.map((pizzas, i) => <PizzaBlock key={i} {...pizzas}/>)

    // ФИЛЬТРАЦИЯ БЕЗ БЭКА const pizzas = items.filter((obj) => {
    //     if (obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
    //         return true
    //     }
    //     return false
    // }).map((pizzas, i) => <PizzaBlock key={i} {...pizzas}/>)
    const skeletons = [...new Array(8)].map((_, index) => <SkeletonPizzas key={index}/>)
    return (
        <div className="container">
            <div className="content__top">
                <Categories categoriesId={categoriesId} onClickSetCategories={(i) => setCategoriesActive(i)}/>
                <Sort selectedSort={selectedSort} onClickSetSelectedSort={(obj) => setSelectedSort(obj)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {isLoaded ? skeletons : pizzas}
                <div/>
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    )
}
export default HomePage