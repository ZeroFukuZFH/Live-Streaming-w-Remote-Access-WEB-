"use client"

import { WatchCard } from "@/components/WatchCard";
import { MovieResponse,useMovieList,movieTypes } from "@/components/custom hooks/useMovies";
import { DetailProps, useDetails } from "@/components/custom hooks/useDetails";
import { HomeHeader } from "@/components/AppHeader";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Home() {
  
  const popular: MovieResponse | null = useMovieList(movieTypes.POPULAR)
  const topRated: MovieResponse | null = useMovieList(movieTypes.TOPRATED)
  const upcoming: MovieResponse | null = useMovieList(movieTypes.UPCOMING)

  const details: DetailProps | null = useDetails()
  const size = details?.images.poster_sizes[3] || 'w342'
  const base_url = details?.images.base_url || 'https://image.tmdb.org/t/p/'

  return (
    <div className="text-white max-w-screen flex flex-col items-center">
      <HomeHeader />
      
      <section className="max-w-7xl w-full px-4">
        <div className="flex flex-col items-center justify-center text-center w-full h-[70vh] mb-8">
          <div className="w-[30vw] flex flex-col gap-2">
            <h1 className="text-4xl font-bold">WATCH PARTY</h1>
            <h3 className="text-xl text-gray-400">fuck ads, free streaming site</h3>
          </div>
        </div>
      
        <Carousel>
          <CarouselContent>
            {popular?.results.map(movie => (
              <CarouselItem key={movie.id} className="basis-1/5">
                <WatchCard
                  id={movie.id}
                  title={movie.title}
                  poster_path={base_url + size + movie.poster_path}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>

        <Carousel>
          <CarouselContent>
            {topRated?.results.map(movie => (
              <CarouselItem key={movie.id} className="basis-1/5">
                <WatchCard
                  id={movie.id}
                  title={movie.title}
                  poster_path={base_url + size + movie.poster_path}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>

        <Carousel>
          <CarouselContent>
            {upcoming?.results.map(movie => (
              <CarouselItem key={movie.id} className="basis-1/5">
                <WatchCard
                  id={movie.id}
                  title={movie.title}
                  poster_path={base_url + size + movie.poster_path}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>

      </section>
    </div>
  );
}


