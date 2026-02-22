"use client"

import { MovieCard } from "@/components/MovieCard";
import { DetailProps, MovieResponse, movieTypes, useDetails, useMovies } from "@/components/DataFetch";

export default function Home() {
  const details : DetailProps | null = useDetails()
  const popular : MovieResponse | null = useMovies(movieTypes.POPULAR)
  const topRated : MovieResponse | null = useMovies(movieTypes.TOPRATED)
  const upcoming : MovieResponse | null = useMovies(movieTypes.UPCOMING)

  const size = details?.images.poster_sizes[3] || 'w342'
  const base_url = details?.images.base_url || 'https://image.tmdb.org/t/p/'


  return (
    
      <div className="text-white max-w-screen">
      <h1>Popular</h1>
      <div className="flex flex-row overflow-x-scroll">
      {popular?.results.map(movie => (
        <div key={movie.id} className="w-54">
          <MovieCard
            id={movie.id}
            title={movie.title} 
            poster_path={base_url + size + movie.poster_path}
            overview={movie.overview}
            release_date={movie.release_date}
            vote_average={movie.vote_average}
          />
        </div>
      ))}
      </div>
      <h1>Top rated</h1>
      <div className="flex flex-row overflow-x-scroll">
      {topRated?.results.map(movie => (
        <div key={movie.id} className="w-54">
          <MovieCard
            id={movie.id}
            title={movie.title} 
            poster_path={base_url + size + movie.poster_path}
            overview={movie.overview}
            release_date={movie.release_date}
            vote_average={movie.vote_average}
          />
        </div>
      ))}
      </div>
      <h1>Upcoming</h1>
      <div className="flex flex-row overflow-x-scroll gap-2">
      {upcoming?.results.map(movie => (
        <div key={movie.id} className="w-54">
          <MovieCard
            id={movie.id}
            title={movie.title} 
            poster_path={base_url + size + movie.poster_path}
            overview={movie.overview}
            release_date={movie.release_date}
            vote_average={movie.vote_average}
          />
        </div>
      ))}
      </div>
      
    </div>
    
  );
}



