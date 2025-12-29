import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "./pages/homePage";
import MovieDetailsPage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import MovieReviewPage from "./pages/movieReviewPage"; 
import SiteHeader from "./components/siteHeader";
import MoviesContextProvider from "./contexts/moviesContext";

import NowPlayingPage from "./pages/nowPlayingPage";
import TopRatedPage from "./pages/topRatedPage";
import UpcomingPage from "./pages/upcomingPage";
import RecommendationsPage from "./pages/recommendationsPage";
import WatchlistPage from "./pages/watchlistPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} /> 
            <Route path="/movies/:id" element={<MovieDetailsPage />} />

            
            <Route path="/now-playing" element={<NowPlayingPage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
            <Route path="/movies/:id/recommendations" element={<RecommendationsPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />

            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
