import styles from "./SortOptions.module.css";

export default function SortOptions({sortOptions, onSortChange}) {
    const handleSortChange = (newSortOptions) => {
        onSortChange({...sortOptions, ...newSortOptions});
    };

    return (
        <div className={styles.sortOptions}>
            <h2>Orden</h2>
            <select onChange={(e) => handleSortChange({sortBy: e.target.value})} value={sortOptions.sortBy}>
                <option value="">Ninguno</option>
                <option value="year">Año</option>
                <option value="rating">Calificación</option>
            </select>
            <select onChange={(e) => handleSortChange({sortType: e.target.value})} value={sortOptions.sortType}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
        </div>
    );
}