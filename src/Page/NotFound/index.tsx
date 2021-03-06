import styles from './notFoutd.module.scss'
import * as React from "react";

const NotFound: React.FC = () => {
    return (
        <div className={styles.notFoundPage}>
            <br/>
            <span>😕</span>
            <h1>Ничего не найдено</h1>
            <div className={styles.description}>К сожаления данная страница отсутствует в нашем интернет магазине</div>
        </div>
    )
}

export default NotFound