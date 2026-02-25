import { useState, useEffect } from "react"
import { options } from "./data";

export function useShowsAll(genreID: number | null, page:number) {
  const genre = genreID !== null ? `&with_genres=${genreID}` : ''
  const url = `/discover/tv?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${genre}`
  
  const [shows, setShows] = useState<ShowResponse | null>(null)
  
  useEffect(() => {
    const getAllShows = async () => {
      try {
        const result = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, options)
          .then(res => {
            if (!res.ok) {
              throw new Error("no data available")
            }
            return res.json()
          })
        setShows(result)
      } catch (err) {
        console.error(err)
        setShows({ results: [], page: 1, total_pages: 1, total_results: 0 }) 
      }
    }

    getAllShows()
  }, [genreID, url])
  
  return shows
}

export function useShowsList(showTypeUrl: string) {
  const [shows, setShows] = useState<ShowResponse | null>(null)
  
  useEffect(() => {
    const getShows = async () => {
      try {
        const showList = await fetch(showTypeUrl, options)
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
        
        setShows(showList)
      } catch (err) {
        console.error(err)
        setShows({ results: [], page: 1, total_pages: 1, total_results: 0 })
      }
    }
    getShows()
  }, [showTypeUrl])
  
  return shows
}

export interface Show {
  id: number;
  name: string; 
  overview: string;
  poster_path: string;
  first_air_date: string; 
  vote_average: number;
  backdrop_path?: string;
  genre_ids?: number[];
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  popularity?: number;
  vote_count?: number;
}

export interface ShowResponse {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
}

export const showTypes = {
  POPULAR: "https://api.themoviedb.org/3/tv/popular",
  TOP_RATED: "https://api.themoviedb.org/3/tv/top_rated",
  AIRING_TODAY: process.env.NEXT_PUBLIC_BASE_URL + "/tv/airing_today",
  ON_THE_AIR: process.env.NEXT_PUBLIC_BASE_URL + "/tv/on_the_air",
  POPULAR_FULL: process.env.NEXT_PUBLIC_BASE_URL + "/tv/popular",
  TOP_RATED_FULL: process.env.NEXT_PUBLIC_BASE_URL + "/tv/top_rated"
}