import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchlist from "../components/cardIcons/addToWatchlist";

const UpcomingPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['upcoming'],
    queryFn: getUpcomingMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => (
        <>
          <AddToFavoritesIcon movie={movie} />
          <AddToWatchlist movie={movie} />
        </>
      )}
    />
  );
};

export default UpcomingPage;
