import { useState, useEffect } from "react"
import { options } from "./data";

export function useMoviesAll(genreID:number | null, page:number){
        const genre = genreID !== null ? `&with_genres=${genreID}` : ''
        const url = `/discover/movie?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${genre}`
        const [movies,setMovies] = useState<MovieResponse | null>(null)
        useEffect(()=>{
            try {
                const allMovies = async () => {
                    const result = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, options)
                    .then(res => {
                        if(!res.ok){
                            throw new Error("no data available")
                        }
                        return res.json()
                    })    
                    setMovies(result)   
                }

                allMovies()
            } catch (err) {
                console.error(err)
            }
        },[genreID,url])
        return movies
    }

export function useMovieList(movieTypeUrl : string){
    const [movies,setMovies] = useState<MovieResponse | null>(null)
    useEffect(()=>{
        const getMovies = async () => {
            try {
            const movieList = await fetch(movieTypeUrl,options)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
            
            setMovies(movieList)
            } catch (err){
                console.error(err)
            }
        }
        getMovies()
    },[movieTypeUrl])
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
    POPULAR : "https://api.themoviedb.org/3/movie/popular",
    TOPRATED : "https://api.themoviedb.org/3/movie/top_rated",
    UPCOMING : process.env.NEXT_PUBLIC_BASE_URL + "/movie/upcoming"
}
