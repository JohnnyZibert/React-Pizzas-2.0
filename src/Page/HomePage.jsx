import React, {useRef} from "react";
import Categories from "../components/Categories";
import Sort, {sortPopup} from "../components/Sort";
import SkeletonPizzas from "../components/PizzaBlock/SkeletonPizzas";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectCategoriesId, selectCurrentPage, selectSort, setCurrentPage, setFilter} from "../store/filterSlice";
import qs from "query-string";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {fetchPizzaItems, selectPizzaItems} from "../store/pizzasItemSlice";



const HomePage = () => {

    const categoriesId = useSelector(selectCategoriesId)
    const {items, status} = useSelector(selectPizzaItems)
    const selectedSort = useSelector(selectSort)
    const currentPage = useSelector(selectCurrentPage)
    const {searchValue} = useSelector((state)=>state.filter)

    const dispatch = useDispatch()

    const location = useLocation()
    const inMounted = useRef(false)
    const navigate = useNavigate();



    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const getPizza = async () => {

        const sortType = selectedSort.sortProperty.replace('-', '')
        const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoriesId > 0 ? `category=${categoriesId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''


        dispatch(fetchPizzaItems({
            sortType,
            order,
            category,
            search,
            currentPage
        }))


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
        getPizza()
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
    }, [])

    React.useEffect(() => {
        if (!window.location.search) {
            getPizza()
        }
    }, [location.search])

    const pizzaItems = items.map((pizzaItems, i) =>
        <Link to={`/pizza/${pizzaItems.id}`}><PizzaBlock key={i} {...pizzaItems}/></Link>)


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
                {
                    status === 'error' ? <div className="content__error-info">
                        <h2>Произошла ошибка 😕</h2>
                        <p>К сожалению данная страница недоступна, повторите позже</p>
                        </div> : <div className='content__items'>{status === ' loading' ? skeletons : pizzaItems}</div>
                }

                <div/>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}
export default HomePage