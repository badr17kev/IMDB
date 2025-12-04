import { useEffect, useState } from "react";

const TMDB_KEY = "YOUR_TMDB_KEY"; // <-- put your TMDb key here

export default function MoviesGbt() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("batman");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  // 1) Search movies from TMDb
  useEffect(() => {
    if (!inputValue.trim()) {
      setMovies([]);
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${inputValue}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  }, [inputValue]);

  // 2) When you click a movie, fetch its trailer
  function openMovie(movie) {
    setSelectedMovie(movie);
    setTrailerKey("");
    setLoadingTrailer(true);

    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        if (trailer) setTrailerKey(trailer.key);
        else setTrailerKey("NO_TRAILER");
      })
      .finally(() => setLoadingTrailer(false));
  }

  function closeModal() {
    setSelectedMovie(null);
    setTrailerKey("");
  }

  return (
    <div>
      {/* NAVBAR */}
      <nav className="nav">
        <div className="navLeft">
          <span className="logo">MovieBox</span>
        </div>

        <div className="navRight">
          <input
            className="navInput"
            type="text"
            placeholder="Search movies..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </nav>

      {/* MOVIES GRID */}
      <ul className="moviesGrid">
        {movies.map((movie) => (
          <li
            className="movieCard"
            key={movie.id}
            onClick={() => openMovie(movie)}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
            />

            <div className="movieInfo">
              <h3 className="movieTitle">{movie.title}</h3>
              <p className="movieYear">
                {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* MODAL FOR TRAILER */}
      {selectedMovie && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="closeBtn" onClick={closeModal}>
              ✖
            </button>

            <h2 className="modalTitle">{selectedMovie.title}</h2>

            {loadingTrailer && <p className="status">Loading trailer...</p>}

            {!loadingTrailer && trailerKey === "NO_TRAILER" && (
              <p className="status error">No trailer found 😢</p>
            )}

            {!loadingTrailer && trailerKey && trailerKey !== "NO_TRAILER" && (
              <iframe
                className="trailerFrame"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
