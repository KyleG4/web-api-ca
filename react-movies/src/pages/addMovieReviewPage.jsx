import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation, useNavigate, Navigate } from "react-router-dom"; // <--- Import Navigate
import { useQuery } from "@tanstack/react-query";
import { getMovie, postReview } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const WriteReviewPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. SAFETY CHECK:
  // If we arrived here without a movieId (e.g. via direct URL or bad redirect),
  // send the user back to the home page immediately to prevent a crash.
  if (!location.state || !location.state.movieId) {
    return <Navigate to="/" replace />;
  }

  const movieId = location.state.movieId;

  const { data: movie, error, isLoading, isError } = useQuery({
    queryKey: ['movie', {id: movieId}],
    queryFn: getMovie,
  });

  const handleSubmit = async (reviewData) => {
    const review = {
        movieId: movie.id,
        author: reviewData.author,
        content: reviewData.content,
        rating: reviewData.rating
    };
    
    await postReview(review);
    navigate(`/movies/${movie.id}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  return (
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} handleSubmit={handleSubmit} />
    </PageTemplate>
  );
};

export default WriteReviewPage;