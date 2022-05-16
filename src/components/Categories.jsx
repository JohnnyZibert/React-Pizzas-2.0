import React from "react";

const Categories = () => {
    const categoriesPizzas = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']
    const [categoriesActive,setCategoriesActive] = React.useState(0)

    return (
        <div className="categories">
            <ul>
                {
                    categoriesPizzas.map((categoriesPizzas,i)=><li
                    key={i}
                    onClick={()=>setCategoriesActive(i)}
                    className={categoriesActive === i ? 'active' : ''}>{categoriesPizzas}</li>)
                }
            </ul>
        </div>
    )
}
export default Categories