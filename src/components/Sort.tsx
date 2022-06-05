import {setSort} from "../store/filter/FilterSlice";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {ISortFilter, SortPropertyEnum} from "../store/filter/Types";
import {sortFilter} from "../store/filter/Selectors";



export const sortPopup:ISortFilter[] = [
    {name:'популярности DESC)',sortProperty:SortPropertyEnum.RATING_DES},
    {name:'популярности (ASC)',sortProperty:SortPropertyEnum.RATING_ASC},
    {name:'цене (DESC)',sortProperty:SortPropertyEnum.PRICE_DES},
    {name:'цене (ASC)',sortProperty: SortPropertyEnum.PRICE_ASC},
    {name:'алфавиту (DESC)',sortProperty:SortPropertyEnum.TITLE_DES},
    {name:'алфавиту (ASC)',sortProperty:SortPropertyEnum.TITLE_ASC},

]
type PopupClick = React.MouseEvent<HTMLBodyElement> & {
    path:Node[]
}

export const Sort:React.FC = React.memo(() => {

    const sort = useSelector(sortFilter)
    const dispatch = useDispatch()
    const sortRef = React.useRef<HTMLDivElement>(null)

    const [isVisionPopup, setIsVisionPopup] = React.useState(false)


    const onIsVisionPopup = () => {
        setIsVisionPopup(!isVisionPopup)
    }
    const onSelectedSort = (obj) => {
        dispatch(setSort(obj))
        setIsVisionPopup(false)
    }


    React.useEffect(()=>{
        const handleClickOutside = (event:MouseEvent) => {
            const _event= event as unknown as PopupClick
            if (!_event.path.includes(sortRef.current)){
                setIsVisionPopup(false)

            }
        }

        document.body.addEventListener('click',handleClickOutside)

        return () =>{
            document.body.removeEventListener('click',handleClickOutside)
        }
    },[])


    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg className={isVisionPopup ? 'rotated' : ''}
                     width="10"
                     height="6"
                     viewBox="0 0 10 6"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => onIsVisionPopup()}>{sort.name}</span>
            </div>
            {isVisionPopup && <div className="sort__popup">
                <ul>
                    {
                        sortPopup.map((obj, i) => <li
                            key={i}
                            className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                            onClick={() => onSelectedSort(obj)}>{obj.name}</li>)
                    }

                </ul>
            </div>}
        </div>
    )
})
