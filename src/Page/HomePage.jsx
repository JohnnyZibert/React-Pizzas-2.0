import React, {useContext} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SkeletonPizzas from "../components/PizzaBlock/SkeletonPizzas";
import PizzaBlock from "../components/PizzaBlock";
import {SearchContext} from "../App";
import Pagination from "../components/Pagination";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../store/filterSlice";


const HomePage = () => {
    const dispatch = useDispatch()
    const categoriesId = useSelector((state) => state.filter.category)
    const [items, setItems] = React.useState([])
    const [isLoaded, setIsLoaded] = React.useState(true)
    const selectedSort = useSelector((state)=> state.filter.sort)
    const currentPage = useSelector(state => state.filter.currentPage)
    const {searchValue} = useContext(SearchContext)

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }


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
                <Categories categoriesId={categoriesId}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {isLoaded ? skeletons : pizzas}
                <div/>
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}
export default HomePage