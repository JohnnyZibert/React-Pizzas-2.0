import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SkeletonPizzas from "../components/PizzaBlock/SkeletonPizzas";
import PizzaBlock from "../components/PizzaBlock";


const HomePage = () => {
    const [items, setItems] = React.useState([])
    const [isLoaded, setIsLoaded] = React.useState(true)

    React.useEffect(() => {
        fetch('https://628169519fac04c654050e3b.mockapi.io/items').then((res) => {
            return res.json()
        }).then((arr) => {
            setItems(arr)
            setIsLoaded(false)
        })
        window.scroll(0,0)
    }, [])
    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoaded ? [...new Array(8)].map((_, index) => <SkeletonPizzas
                            key={index}/>)
                        : items.map((pizzas, i) => <PizzaBlock key={i} {...pizzas}/>)

                }
                <div/>
            </div>
        </div>
    )
}
export default HomePage