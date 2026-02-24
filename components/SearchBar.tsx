"use client"
import { useEffect, useState, ChangeEvent } from "react";
import { Search } from "lucide-react";
import { useSearch } from "./DataFetch";



export function SearchBar() {
  const [search, setSearch] = useState("");
  const result = useSearch(search)
  useEffect(()=>{
    console.log(result)
  },[result,search])

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return <>
    <div className="border border-gray-700 rounded-lg p-2 flex flex-row bg-gray-900 w-full">
      <Search className="text-gray-400 mr-2" size={20} />
      <input className="outline-none bg-transparent w-full text-white placeholder-gray-500" 
        placeholder="Titles, Peoples, Genre" 
        value={search} 
        onChange={handleSearch} 
      />
    </div>
    {search.length !== 0 && 
    <div className="flex flex-col">
      {result?.results.map(movie=>(
        <div key={movie.id}>
          {movie.title}
        </div>
      ))}
    </div>
    }
    </>;
}
  