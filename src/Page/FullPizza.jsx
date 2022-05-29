import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


const FullPizza = () => {
    const [pizza, setPizza] = useState({})
    const {id} = useParams()

    useEffect(() => {
        async function fetchPizzaId() {
            try {
                const {data} = await axios.get('https://628169519fac04c654050e3b.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                alert("Ошибка при полочении пиццы!")
            }
        }

        fetchPizzaId()
    }, [])

    if (!pizza) {
        return (<>"Загрузка..."</>)
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl}/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    )

}

export default FullPizza;