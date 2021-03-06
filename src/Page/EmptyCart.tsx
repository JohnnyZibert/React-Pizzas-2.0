import {image} from "../assets/img";
import * as React from "react";


const EmptyCart:React.FC = () => {
    return (
        <div className="wrapper">
            <div className="content">
                <div className="container container--cart">
                        <div className="cart cart--empty">
                            <h2>Корзина пустая <span>😕</span></h2>
                            <p>
                                Вероятней всего, вы не заказывали ещё пиццу.<br/>
                                Для того, чтобы заказать пиццу, перейди на главную страницу.
                            </p>
                            <img src={image.emptyCart} alt="Empty cart"/>
                            <a href="/react/Pizza/my-app/public" className="button button--black">
                                <span>Вернуться назад</span>
                            </a>
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default EmptyCart