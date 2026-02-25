import { useState, useEffect } from "react"
import { options } from "./data";

export function useSearch(movie: string) {
  const [result, setResult] = useState<SearchProps | null>(null);
  
  useEffect(() => {
    if (!movie.trim()) {
      setResult(null);
      return;
    }
    
    const getMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=true&language=en-US&page=1`;
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error("Couldn't search");
        }
        
        const api_result = await response.json();
        setResult(api_result);
      } catch (error) {
        console.error("Search error:", error);
        setResult(null);
      }
    }
    const timeoutId = setTimeout(() => {
      getMovies()
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [movie])

  return result;
}

export interface SearchProps {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}