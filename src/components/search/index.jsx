import React from "react";
import styles from './Search.module.scss'
import {image} from "../../assets/img";
import {SearchContext} from "../../App";
import {useContext} from "react";
import {debounce} from "lodash";




const Search = () => {
    const [value, setValue] = React.useState()
    const { setSearchValue } = useContext(SearchContext)
    const inputEl = React.useRef(null)

    const onButtonCleaner = () => {
        setSearchValue('')
        setValue('')
        inputEl.current.focus();
    }


    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str)
        },250),[],
    )
    const onChangeValue = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <img src={image.searchIcon} className={styles.icon} alt='search'/>
            <input ref={inputEl} value={value} placeholder='поиск пицц'  onChange={onChangeValue}
                   className={styles.input}/>
            {
                value ? <img onClick={()=>{onButtonCleaner()}} src={image.cleaner} alt='clean' className={styles.cleaner}/>
                    :''
            }

        </div>

    )
}
export default Search