import React, {useContext, useRef} from "react";
import Categories from "../components/Categories";
import Sort, {sortPopup} from "../components/Sort";
import SkeletonPizzas from "../components/PizzaBlock/SkeletonPizzas";
import PizzaBlock from "../components/PizzaBlock";
import {SearchContext} from "../App";
import Pagination from "../components/Pagination";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage, setFilter} from "../store/filterSlice";
import qs from "query-string";
import {useLocation, useNavigate} from "react-router-dom";


const HomePage = () => {
    const pizzaItemCount = useSelector((state) => state.cart.countItemCart)
    const location = useLocation()
    const inMounted = useRef(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const categoriesId = useSelector((state) => state.filter.category)
    const [items, setItems] = React.useState([])
    const [isLoaded, setIsLoaded] = React.useState(true)
    const selectedSort = useSelector((state) => state.filter.sort)
    const currentPage = useSelector(state => state.filter.currentPage)
    const {searchValue} = useContext(SearchContext)
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const fetchPizza = () => {
        setIsLoaded(true)

        const sortType = selectedSort.sortProperty.replace('-', '')
        const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoriesId > 0 ? `category=${categoriesId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''


        axios.get(
            `https://628169519fac04c654050e3b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`
        ).then((response) => {
            setItems(response.data)
            setIsLoaded(false)
        })
        window.scroll(0, 0)
    }


    // если были изменены параметры и был первый рендер
    React.useEffect(() => {
        if (inMounted.current) {
            const params = {
                categoriesId: categoriesId > 0 ? categoriesId : null,
                selectedSort: selectedSort.sortProperty,
                currentPage
            }
            const queryString = qs.stringify(params, {skipNulls: true})
            navigate(`/?${queryString}`)
        }
    }, [categoriesId, selectedSort, searchValue, currentPage, navigate])

    //если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        if (inMounted.current) {
            fetchPizza()
        }
    }, [categoriesId, selectedSort, searchValue, currentPage])


// если был первый рендер то проверяем url и сохраняем в редакс
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortPopup.find(obj => obj.sortProperty === params.selectedSort)
            if (sort) {
                params.sort = sort
            }
            dispatch(setFilter(params))
        }
        inMounted.current = true
    },[])

    React.useEffect(() => {
        if (!window.location.search) {
            fetchPizza()
        }
    },[location.search])


    const pizzas = items.map((pizzas, i) => <PizzaBlock key={i} pizzaItemCount={pizzaItemCount} {...pizzas}/>)

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