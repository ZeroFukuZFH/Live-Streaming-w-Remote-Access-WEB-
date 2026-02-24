"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { createContext } from 'react'

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

export interface ImagesConfig {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
}

export interface DetailProps {
  images: ImagesConfig;
  change_keys: string[];
}

export const movieTypes = {
    POPULAR : "https://api.themoviedb.org/3/movie/popular",
    TOPRATED : "https://api.themoviedb.org/3/movie/top_rated",
    UPCOMING : "https://api.themoviedb.org/3/movie/upcoming"
}

export const apiKey = process.env.NEXT_PUBLIC_API_KEY
export const options = {
        method:'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
 
export function useDetails(){
    const [details,setDetails] = useState<DetailProps | null>(null)
    useEffect(()=>{
        const getDetails = async () => {
            try{
                const tmdbDetails = await fetch("https://api.themoviedb.org/3/configuration",options)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                
                setDetails(tmdbDetails)
            }catch (err){
                console.error(err)
            }
        }

        getDetails()
    },[])

    return details 
}

export function useMovies(movieTypeUrl : string){
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

export function useSearch(movie: string) {
  const [result, setResult] = useState<SearchProps | null>(null);
  
  useEffect(() => {
    // Don't search if query is empty
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
    };

    // Debounce to avoid too many API calls
    const timeoutId = setTimeout(() => {
      getMovies();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [movie]); // Add movie as dependency

  return result;
}