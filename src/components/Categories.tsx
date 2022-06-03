import * as React from "react";


export interface ICategoriesProps {
    categoriesId: number
    onChangeCategories: (i: number) => void
}


const Categories: React.FC<ICategoriesProps> = React.memo(({categoriesId, onChangeCategories}) => {
        const categoriesPizzas = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']



        return (
            <div className="categories">
                <ul>
                    {
                        categoriesPizzas.map((categoriesName, i) => <li
                            key={i}
                            onClick={() => onChangeCategories(i)}
                            className={categoriesId === i ? 'active' : ''}>{categoriesName}</li>)
                    }
                </ul>
            </div>
        )
    }
)
export default Categories
