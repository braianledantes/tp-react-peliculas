import React, {useEffect, useState} from 'react';
import styles from './Search.module.css';
import {SearchIcon} from 'lucide-react';

export default function Search({search, onSearch}) {
    const [value, setValue] = useState(search)

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(e.target[0].value);
    };

    useEffect(() => {
        setValue(search);
    }, [search]);

    return (
        <form className={styles.searchContainer} onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Ingresa tu búsqueda"
                value={value}
                onChange={handleChange}
            />
            <button><SearchIcon/></button>
        </form>
    );
}