"use client"

import { useGenreList, GenreProps } from "@/components/custom hooks/useGenres";
import { HomeHeader } from "@/components/AppHeader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useShowsAll } from "@/components/custom hooks/useShows";
import { WatchCard } from "@/components/WatchCard";
import { DetailProps, useDetails } from "@/components/custom hooks/useDetails";
import { Pagination,PaginationContent,PaginationItem,PaginationNext,PaginationPrevious } from "@/components/ui/pagination";

export default function Page() {

    const details: DetailProps | null = useDetails()
    const size = details?.images.poster_sizes[3] || 'w342'
    const base_url = details?.images.base_url || 'https://image.tmdb.org/t/p/'


  const [filter,setFilter] = useState<GenreProps>({ name:"genre", id:null })
  const handleSetFilter = (genre:string, id:number | null) => {
    setFilter({name : genre.toLowerCase(), id: id})
  }

  const [page,setPage] = useState(1)
  const shows = useShowsAll(filter.id,page)
  const maxPages = shows?.total_pages ?? 0
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
            <h1 className="text-4xl font-bold">SHOWS</h1>
            <h3 className="text-xl text-gray-400">fuck ads, free streaming site</h3>
          </div>
          
        </div>
        <Genre filter={filter} handleSetFilter={handleSetFilter}/>
        <div className="flex flex-wrap gap-4">
          {shows?.results.map(show => (
            <WatchCard key={show.id}
                id={show.id}
                title={show.name}
                poster_path={base_url + size + show.poster_path}
                release_date={show.first_air_date}
                vote_average={show.vote_average}
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
    const genreList = useGenreList("tv")
    
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

