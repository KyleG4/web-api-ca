import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";
import WriteReview from "../components/cardIcons/writeReview";

const WatchlistPage = () => {
  const { watchlist: movieIds } = useContext(MoviesContext);

  const watchlistMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  const isPending = watchlistMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = watchlistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="My Watchlist"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromWatchlist movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default WatchlistPage;
