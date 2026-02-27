"use client"

import { useGenreList, GenreProps } from "@/components/custom hooks/useGenres";
import { HomeHeader } from "@/components/AppHeader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useMoviesAll } from "@/components/custom hooks/useMovies";
import { WatchCard } from "@/components/WatchCard";
import { DetailProps, useDetails } from "@/components/custom hooks/useDetails";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function Page() {

  const details: DetailProps | null = useDetails()
  const size = details?.images.poster_sizes[3] || 'w342'
  const base_url = details?.images.base_url || 'https://image.tmdb.org/t/p/'
  
  const [filter,setFilter] = useState<GenreProps>({ name:"genre", id:null })
  const handleSetFilter = (genre:string, id:number | null) => {
    setFilter({name : genre.toLowerCase(), id: id})
  }

  const [page,setPage] = useState(1)
  
  const movies = useMoviesAll(filter.id,page)
  const maxPages = movies?.total_pages ?? 0

  const handlePrevPage = () => {
    if(page <= 1){
      setPage(1)
    }
    setPage(prev => prev-=1)
  }
  const handleNextPage = () => {
    if(page >= maxPages){
        setPage(maxPages)
    }
    setPage(next => next+=1)
  }
  
  return (
    <div className="text-white w-screen flex flex-col items-center">
      <HomeHeader />
      
      <section className="max-w-7xl w-full px-4">
        <div className="flex flex-row items-center justify-start w-full mb-8">
          <div className="w-[30vw] flex flex-col gap-2">
            <h1 className="text-4xl font-bold">MOVIES</h1>
            <h3 className="text-xl text-gray-400">fuck ads, free streaming site</h3>
          </div>
          
        </div>
        <Genre filter={filter} handleSetFilter={handleSetFilter}/>
        <div className="flex flex-wrap gap-4">
          {movies?.results.map(movie => (
            <WatchCard key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={base_url + size + movie.poster_path}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevPage}/>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNextPage}/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        </section>
    </div>
  );
}

function Genre({
  filter,
  handleSetFilter
}:{
  handleSetFilter : (genre: string, id: number | null) => void,
  filter : GenreProps
}){
    const genreList = useGenreList("movie")
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{filter.name}<ChevronDown/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {genreList?.genres.map(genre => (
                    <DropdownMenuItem key={genre.id} onClick={()=>handleSetFilter(genre.name, genre.id)}>
                        {genre.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

