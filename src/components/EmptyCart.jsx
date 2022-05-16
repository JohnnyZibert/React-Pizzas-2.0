import {image} from "../assets/img";
import {NavLink} from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="wrapper">
            <div className="header">
                <div className="container">
                    <div className="header__logo">
                        <img width="38" src={image.pizzaLogo} alt="Pizza logo"/>
                        <div>
                            <h1>React Pizza</h1>
                            <p>самая вкусная пицца во вселенной</p>
                        </div>
                    </div>
                    <div className="header__cart">

                    </div>
                </div>
            </div>
            <div className="content">

                    <div className="container container--cart">
                        <div className="cart cart--empty">
                            <h2>Корзина пустая <icon>😕</icon></h2>
                            <p>
                                Вероятней всего, вы не заказывали ещё пиццу.<br/>
                                Для того, чтобы заказать пиццу, перейди на главную страницу.
                            </p>
                            <img src="/img/empty-cart.png" alt="Empty cart"/>
                            <a href="/" className="button button--black">
                                <span>Вернуться назад</span>
                            </a>
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default EmptyCart