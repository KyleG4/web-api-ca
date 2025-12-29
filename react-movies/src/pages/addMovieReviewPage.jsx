import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovie, postReview } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const WriteReviewPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const movieId = location.state.movieId;

  const { data: movie, error, isLoading, isError } = useQuery({
    queryKey: ['movie', {id: movieId}],
    queryFn: getMovie,
  });

  const handleSubmit = async (reviewData) => {
    // 1. Structure the data for your API
    const review = {
        movieId: movie.id,
        author: reviewData.author,
        content: reviewData.content,
        rating: reviewData.rating
    };
    
    // 2. Send it to your backend
    await postReview(review);
    
    // 3. Redirect back to the movie details page
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
      {/* Pass the handleSubmit function to the form */}
      <ReviewForm movie={movie} handleSubmit={handleSubmit} />
    </PageTemplate>
  );
};

export default WriteReviewPage;