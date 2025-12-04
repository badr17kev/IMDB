import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function MoviesDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`https://www.omdbapi.com/?i=${id}&apikey=c43df2f0`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          setError(data.Error || "Movie not found");
          setMovie(null);
        } else {
          setMovie(data);
        }
      })
      .catch(() => {
        setError("Something went wrong while fetching.");
        setMovie(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="moviesPage">
        <div className="detailsCard detailsLoading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="moviesPage">
        <div className="detailsCard detailsError">
          <h2>{error}</h2>
          <Link className="detailsBack" to="/movies">← Back to movies</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="moviesPage">
      <Link className="detailsBack" to="/movies">← Back to movies</Link>

      <div className="detailsCard">
        <div className="detailsHeader">
          <img
            className="detailsPoster"
            src={movie.Poster}
            alt={movie.Title}
          />

          <div className="detailsInfo">
            <h1 className="detailsTitle">{movie.Title}</h1>

            <div className="detailsMeta">
              <span className="detailsChip">{movie.Year}</span>
              <span className="detailsChip">{movie.Runtime}</span>
              <span className="detailsChip">{movie.Genre}</span>
              <span className="detailsChip rating">⭐ {movie.imdbRating}</span>
            </div>

            <p className="detailsPlot">{movie.Plot}</p>

            <div className="detailsFacts">
              <p><b>Director:</b> {movie.Director}</p>
              <p><b>Actors:</b> {movie.Actors}</p>
              <p><b>Language:</b> {movie.Language}</p>
              <p><b>Country:</b> {movie.Country}</p>
              <p><b>Awards:</b> {movie.Awards}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 