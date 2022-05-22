import React from "react";
import {useDispatch} from "react-redux";
import {setCategory} from "../store/filterSlice";

const Categories = ({categoriesId}) => {
    const categoriesPizzas = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']
    const dispatch = useDispatch()


   const onClickCategory = (i) => {
       dispatch(setCategory(i))
   }

    return (
        <div className="categories">
            <ul>
                {
                    categoriesPizzas.map((categoriesName,i)=><li
                    key={i}
                    onClick={()=>onClickCategory(i)}
                    className={categoriesId === i ? 'active' : ''}>{categoriesName}</li>)
                }
            </ul>
        </div>
    )
}
export default Categories