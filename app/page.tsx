"use client"

import { MovieCard } from "@/components/MovieCard";
import { DetailProps, MovieResponse, movieTypes, useDetails, useMovies } from "@/components/DataFetch";
import { HomeHeader } from "@/components/AppHeader";
import { SearchBar } from '../components/SearchBar';

export default function Home() {
  const details: DetailProps | null = useDetails()
  const popular: MovieResponse | null = useMovies(movieTypes.POPULAR)
  const topRated: MovieResponse | null = useMovies(movieTypes.TOPRATED)
  const upcoming: MovieResponse | null = useMovies(movieTypes.UPCOMING)

  const size = details?.images.poster_sizes[3] || 'w342'
  const base_url = details?.images.base_url || 'https://image.tmdb.org/t/p/'

  return (
    <div className="text-white max-w-screen flex flex-col items-center">
      <HomeHeader />
      
      <section className="max-w-7xl w-full px-4">
        <div className="flex flex-col items-center justify-center text-center w-full mb-8">
          <h1 className="text-4xl font-bold">WATCH PARTY</h1>
          <h3 className="text-xl text-gray-400">fuck ads, free streaming site</h3>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Popular</h1>
          <div className="flex flex-row gap-4 overflow-x-scroll pb-4">
            {popular?.results.map(movie => (
              <div key={movie.id} className="shrink-0">
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

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Top rated</h1>
          <div className="flex flex-row gap-4 overflow-x-scroll pb-4">
            {topRated?.results.map(movie => (
              <div key={movie.id} className="shrink-0">
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

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Upcoming</h1>
          <div className="flex flex-row gap-4 overflow-x-scroll pb-4">
            {upcoming?.results.map(movie => (
              <div key={movie.id} className="shrink-0">
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
      </section>
    </div>
  );
}

