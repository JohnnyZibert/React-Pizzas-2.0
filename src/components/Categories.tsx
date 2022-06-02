import * as React from "react";
import {useDispatch} from "react-redux";
import {setCategory} from "../store/slice/filterSlice";

export interface ICategoriesProps {
    categoriesId: number
}


const Categories:React.FC<ICategoriesProps> = ({ categoriesId }) => {
    const categoriesPizzas = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']
    const dispatch = useDispatch()



    return (
        <div className="categories">
            <ul>
                {
                    categoriesPizzas.map((categoriesName,i)=><li
                    key={i}
                    onClick={()=> dispatch(setCategory(i))}
                    className={categoriesId === i ? 'active' : ''}>{categoriesName}</li>)
                }
            </ul>
        </div>
    )
}
export default Categories