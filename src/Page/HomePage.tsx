import { useRef } from "react";
import {sortPopup} from "../components";
import SkeletonPizzas from "../components/PizzaBlock/SkeletonPizzas";
import {PizzaBlock,Pagination,Sort,Categories} from "../components";
import { useSelector} from "react-redux";
import {
    selectCategoriesId,
    selectCurrentPage, selectSearch, sortFilter
} from "../store/filter/Selectors";
import qs from 'qs'
import {useLocation, useNavigate} from "react-router-dom";
import {ISearchPizzaParams, Status} from "../store/pizzaSlice/types";
import {useAppDispatch} from "../store/store";
import * as React from "react";
import {selectPizzaItems} from "../store/pizzaSlice/Selectors";
import {setCategory, setCurrentPage, setFilter} from "../store/filter/FilterSlice";
import {fetchPizzaItems} from "../store/pizzaSlice/asyncAction";




const HomePage: React.FC = () => {

    const categoriesId = useSelector(selectCategoriesId)
    const {items, status} = useSelector(selectPizzaItems)
    const sort = useSelector(sortFilter)
    const currentPage = useSelector(selectCurrentPage)
    const {searchValue} = useSelector(selectSearch)




    const dispatch = useAppDispatch()

    const location = useLocation()
    const inMounted = useRef(false)
    const navigate = useNavigate();

  const onChangeCategories = React.useCallback((i:number) => {
           dispatch(setCategory(i))
       },[]

   )

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }
    import("../utils/math").then(math => {
        console.log(math.add(16, 26));
    });


    const getPizza = async () => {

        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoriesId > 0 ? String(categoriesId) : ''
        const search = searchValue ? `&search=${searchValue}` : ''


        dispatch(fetchPizzaItems({
            sortBy,
            order,
            category,
            search,
            currentPage: String(currentPage)

        }))


        window.scroll(0, 0)
    }


    // ???????? ???????? ???????????????? ?????????????????? ?? ?????? ???????????? ????????????
    React.useEffect(() => {
        if (inMounted.current) {
            const params = {
                category: categoriesId > 0 ? categoriesId : null,
                selectedSort: sort.sortProperty,
                currentPage
            }
            const queryString = qs.stringify(params, {skipNulls: true})
            navigate(`/?${queryString}`)
        }
    }, [categoriesId, sortPopup, searchValue, currentPage, navigate])

    // ???????? ?????? ???????????? ????????????, ???? ?????????????????????? ??????????
    React.useEffect(() => {
        getPizza()
    }, [categoriesId, sort, searchValue, currentPage])

//
// // ???????? ?????? ???????????? ???????????? ???? ?????????????????? url ?? ?????????????????? ?? ????????????
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as ISearchPizzaParams
            const sort = sortPopup.find(obj => obj.sortProperty === params.sortBy)
            dispatch(setFilter({
                searchValue: String(params.search),
                categoryId: Number(params.category),
                currentPage: Number(params.currentPage),
                sort: sort ? sort : sortPopup[0],
            }))
        }
        inMounted.current = true
    }, [])

    React.useEffect(() => {
        if (!window.location.search) {
            getPizza()
        }
    }, [location.search])

    const pizzaItems = items.map((pizzaItems, i) =>
        <PizzaBlock key={i} {...pizzaItems}/>)


    // ???????????????????? ?????? ???????? const pizzas = items.filter((obj) => {
    //     if (obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
    //         return true
    //     }
    //     return false
    // }).map((pizzas, i) => <PizzaBlock key={i} {...pizzas}/>)
    const skeletons = [...new Array(8)].map((_, index) => <SkeletonPizzas key={index}/>)
    return (
        <div className="container">
            <div className="content__top">
                <Categories categoriesId={categoriesId}  onChangeCategories={onChangeCategories}/>
                <Sort/>
            </div>
            <h2 className="content__title">?????? ??????????</h2>
            {
                status === 'error' ? <div className="content__error-info">
                    <h2>?????????????????? ???????????? ????</h2>
                    <p>?? ?????????????????? ???????????? ???????????????? ????????????????????, ?????????????????? ??????????</p>
                </div> : <div className='content__items'>{status === Status.LOADING ? skeletons : pizzaItems}</div>
            }

            <div/>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}
export default HomePage