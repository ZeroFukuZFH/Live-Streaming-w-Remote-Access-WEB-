import { useState } from "react"
import { useFetch } from "./useFetch";

export function useMoviesAll(genreID:number | null, page:number){
        const genre = genreID !== null ? `&with_genres=${genreID}` : ''
        const url = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${genre}`
        const [movies,setMovies] = useState<MovieResponse | null>(null)
        useFetch<MovieResponse | null>(url, setMovies)
        return movies
    }

export function useMovieList(url : string){
    const [movies,setMovies] = useState<MovieResponse | null>(null)
    useFetch<MovieResponse | null>(url, setMovies)
    return movies
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const movieTypes = {
    POPULAR : "/movie/popular",
    TOPRATED : "/movie/top_rated",
    UPCOMING : "/movie/upcoming"
}
