import styles from './Search.module.scss'
import {image} from "../../assets/img";
import {SearchContext} from "../../App";
import {useContext} from "react";




const Search = () => {
    const {searchValue, setSearchValue} = useContext(SearchContext)


    return (
        <div className={styles.root}>
            <img src={image.searchIcon} className={styles.icon} alt='search'/>
            <input value={searchValue} placeholder='поиск пицц'  onChange={(event) =>setSearchValue(event.target.value) }
                   className={styles.input}/>
            {
                searchValue ? <img onClick={()=>setSearchValue('')} src={image.cleaner} alt='clean' className={styles.cleaner}/>
                    :''
            }

        </div>

    )
}
export default Search