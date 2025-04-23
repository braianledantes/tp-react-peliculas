import styles from './FilterOptions.module.css';

export default function FilterOptions({ filters, onFilterChange }) {
    const handleFilterChange = (newFilters) => {
        const updatedFilters = { ...filters, ...newFilters };
        onFilterChange(updatedFilters);
    }

    return (<div className={styles.filterOptions}>
        <h2>Filtros</h2>
        <label>Ver:</label>
        <select onChange={(e) => handleFilterChange({ seen: e.target.value })} value={filters.seen}>
            <option value="all">Todos</option>
            <option value="seen">Vistos</option>
            <option value="unseen">Sin ver</option>
        </select>
        <label>Genero:</label>
        <select onChange={(e) => handleFilterChange({ genre: e.target.value })} value={filters.genre}>
            <option value="">Todos</option>
            <option value="Acción">Acción</option>
            <option value="Comedia">Comedia</option>
            <option value="Drama">Drama</option>
            <option value="Terror">Terror</option>
            <option value="Ciencia Ficción">Ciencia Ficción</option>
            <option value="Romance">Romance</option>
            <option value="Suspenso">Suspenso</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Documental">Documental</option>
            <option value="Animación">Animación</option>
            <option value="Aventura">Aventura</option>
        </select>
        <label>Tipo:</label>
        <select onChange={(e) => handleFilterChange({ type: e.target.value })} value={filters.type}>
            <option value="">Todos</option>
            <option value="Película">Película</option>
            <option value="Serie">Serie</option>
        </select>
    </div>)
}