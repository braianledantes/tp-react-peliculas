import styles from "./MovieList.module.css"
import MovieItem from "../MovieItem/MovieItem";

export default function MovieList({movies, onClickMovie}) {
    return (
        <section className={styles.movieList}>
            {/* No lo charlamos en clase pero podria ser un <ul> */}
            {movies.map((movie) => (
                <MovieItem movie={movie} key={movie.id} onClick={onClickMovie}/>
            ))}
        </section>
    );
}