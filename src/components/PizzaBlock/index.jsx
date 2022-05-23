import React from "react";
import {useDispatch} from "react-redux";
import {setCountItem} from "../../store/cartSlice";
import AddCartButton from "./AddCartButton";


const PizzaBlock = ({title, price, sizes, types, imageUrl, pizzaItemCount}) => {
    const typesName = ['тонкое', 'традиционное ']
    const [activeTypes, setActiveTypes] = React.useState('')
    const [activeSize, setActiveSize] = React.useState('')


    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((types, i) => <li
                            onClick={() => setActiveTypes(i)}
                            key={i}
                            className={activeTypes === i ? "active" : ''}>{typesName[i]}</li>)}
                    </ul>
                    <ul>
                        {sizes.map((sizes, i) => <li
                            onClick={() => setActiveSize(i)}
                            key={i}
                            className={activeSize === i ? 'active' : ''}>{sizes} см.</li>)}

                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <AddCartButton pizzaItemCount={pizzaItemCount}/>
                </div>
            </div>
        </div>
    )
}

export default PizzaBlock