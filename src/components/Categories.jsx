import React from "react";

const Categories = ({categoriesId,onClickSetCategories}) => {
    const categoriesPizzas = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']


    return (
        <div className="categories">
            <ul>
                {
                    categoriesPizzas.map((categoriesName,i)=><li
                    key={i}
                    onClick={()=>onClickSetCategories(i)}
                    className={categoriesId === i ? 'active' : ''}>{categoriesName}</li>)
                }
            </ul>
        </div>
    )
}
export default Categories