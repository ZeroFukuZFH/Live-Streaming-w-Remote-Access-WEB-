"use client"
import { useState, ChangeEvent, useContext } from "react";
import { useSearch } from "./custom hooks/useSearch";
import Image from "next/image";
import { useDetails, DetailProps } from "@/components/custom hooks/useDetails";
import { Input } from "./ui/input";
import { Command, CommandItem, CommandList, CommandEmpty } from "./ui/command";
import { useRouter } from "next/navigation";
import { MovieLinkContext } from "./temporarySolution";

export function SearchBar() {
  const [search, setSearch] = useState("");
  const result = useSearch(search)
  
  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const details: DetailProps | null = useDetails()
  const size = details?.images.poster_sizes[3] || 'w342'
  const base_url = details?.images.base_url || 'https://image.tmdb.org/t/p/'

  // START OF TEMP SOL
  const router = useRouter()
  const {link,setLink} = useContext(MovieLinkContext)
  const handleSetLink = (id:number) => {
    setLink(`https://www.vidking.net/embed/movie/${id}?color=e50914`) 
    console.log(link)
    router.push("/movies/watch")
    console.log(link)
  }
  //END OF TEMP SOL

  return (
    <div className="relative w-full max-w-80">
      <Input 
        className="w-full"
        placeholder="Titles, Peoples, Genre"
        value={search} 
        onChange={handleSearch} 
      />
      
      {search.length !== 0 && (
        <Command className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-950 border rounded-md shadow-lg h-auto max-h-125">
          <CommandList className=" overflow-y-auto h-auto max-h-125">
            <CommandEmpty className="py-6 text-center text-gray-500">
              No results found.
            </CommandEmpty>
            {result?.results.map(movie => (
              <CommandItem 
                key={movie.id} 
                onSelect={() => handleSetLink(movie.id)} 
                className="cursor-pointer flex justify-between items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <h1 className="overflow-hidden text-ellipsis whitespace-nowrap flex-1 text-sm">
                  {movie.title}
                </h1>
                <div className="flex flex-row items-center gap-2 shrink-0 ml-2">
                  {movie.poster_path ? (
                    <Image 
                      width={40} 
                      height={40}
                      src={base_url + size + movie.poster_path} 
                      alt={`${movie.title} poster`}
                      className="rounded object-cover w-10 h-10"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">No img</span>
                    </div>
                  )}
                </div>
              </CommandItem>
            ))}
           
          </CommandList>
          
        
        </Command>
      )}
    </div>
  );
}