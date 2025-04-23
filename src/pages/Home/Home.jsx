import {useEffect, useState} from "react";
import {useMovies} from "../../hooks/useMovies";
import styles from "./Home.module.css"
import MovieList from "../../components/MovieList/MovieList";
import Title from "../../components/Title/Title"
import AddMovieForm from "../../components/AddMovieForm/AddMovieForm";
import EditMovieForm from "../../components/EditMovieForm/EditMovieForm";
import Button from "../../components/Button/Button";
import FilterOptions from "../../components/FilterOptions/FilterOptions.jsx";
import SortOptions from "../../components/SortOptions/SortOptions.jsx";
import OutlinedButton from "../../components/OutlinedButton.jsx/OutlinedButton.jsx";
import Search from "../../components/Search/Search.jsx";

const initialFilters = {
    genre: "",
    type: "",
    seen: "all"
};

const initialSortOptions = {
    sortBy: "",
    sortType: "asc",
}

export default function Home() {
    const { movies, addMovie, removeMovie, updateMovie } = useMovies()
    const [addMovieVisible, setAddMovieVisible] = useState(false)
    const [filteredMovies, setFilteredMovies] = useState(movies)
    const [actualMovie, setActualMovie] = useState(null)
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState(initialFilters);
    const [sortOptions, setSortOptions] = useState(initialSortOptions);

    useEffect(() => {
        const { seen, genre, type } = filters
        const { sortBy, sortType } = sortOptions

        const filteredMovies = movies.filter((movie) => {
            return (movie.title.toLowerCase().includes(search.toLowerCase()) || movie.director.toLowerCase().includes(search.toLowerCase())) &&
                (seen === "all" ? true : seen === "seen" ? movie.seen : !movie.seen) &&
                (genre ? movie.genre === genre : true) &&
                (type ? movie.type === type : true)
        })

        const sortedMovies = filteredMovies.sort((a, b) => {
            if (sortBy === "year") {
                return sortType === "asc" ? a.year - b.year : b.year - a.year
            } else if (sortBy === "rating") {
                return sortType === "asc" ? a.rating - b.rating : b.rating - a.rating
            }
            return 0
        })
        setFilteredMovies(sortedMovies)
    }
    , [movies, search, filters, sortOptions])

    const handleSearch = (searchValue) => {
        setSearch(searchValue);
    }

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    }

    const handleSortChange = (newSortOptions) => {
        setSortOptions(newSortOptions);
    }

    const handleClearFilters = () => {
        setSearch("");
        setSortOptions(initialSortOptions);
        setFilters(initialFilters);
        setFilteredMovies(movies);
    }

    const hideAddMovieForm = () => {
        setAddMovieVisible(false)
    }

    const handleClickViewMovie = (id) => {
        const movie = movies.find((movie) => movie.id === id)
        if (movie) {
            setActualMovie(movie)
        }
    }

    const handleQuitViewMovie = () => {
        setActualMovie(null)
    }

    const showAddMovieForm = () => {
        setAddMovieVisible(true)
    }

    return (
        <section className={styles.home}>
            <header>
                <Title text={"Mis Pelis y Series"} />
            </header>
            {addMovieVisible && <AddMovieForm onAddMovie={addMovie} onClose={hideAddMovieForm}/>}
            {actualMovie && <EditMovieForm
                movie={actualMovie}
                onClose={handleQuitViewMovie} 
                onSaveMovie={updateMovie} 
                onDeleteMovie={removeMovie} />}

            {filteredMovies.length > 0 ? (
                <MovieList movies={filteredMovies} onClickMovie={handleClickViewMovie} />
            ) : (
                <div className={styles.emptyMovies}>
                    <h2>No hay películas ni series</h2>
                </div>
            )}

            <aside>
                <Search search={search} onSearch={handleSearch} />
                <SortOptions sortOptions={sortOptions} onSortChange={handleSortChange} />
                <FilterOptions filters={filters} onFilterChange={handleFilterChange} />
                <div className="counter">
                    <strong>Cantidad: {filteredMovies.length}</strong>
                </div>
                <OutlinedButton onClick={handleClearFilters} text={"Limpiar Filtros"} />
                <Button onClick={showAddMovieForm} text="Añadir película o serie" />
            </aside>
        </section>
    )
}