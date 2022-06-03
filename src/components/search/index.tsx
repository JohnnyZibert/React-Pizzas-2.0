// @ts-ignore
import styles from './Search.module.scss'
import {image} from "../../assets/img";
import {debounce} from "lodash";
import {useDispatch} from "react-redux";
import * as React from "react";
import {setSearchValue} from "../../store/filter/FilterSlice";


const Search:React.FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState('')
    const inputEl = React.useRef<HTMLInputElement>(null)

    const onButtonCleaner = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputEl.current?.focus();
    }


    const updateSearchValue = React.useCallback(
        debounce((str) => {
                dispatch(setSearchValue(str));
            }, 250),
                [],
    )


    const onChangeValue = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <img src={image.searchIcon} className={styles.icon} alt='search'/>
            <input ref={inputEl} value={value} placeholder='поиск пицц' onChange={onChangeValue}
                   className={styles.input}/>
            {
                value ? <img onClick={() => {
                        onButtonCleaner()
                    }} src={image.cleaner} alt='clean' className={styles.cleaner}/>
                    : ''
            }

        </div>

    )
}
export default Search