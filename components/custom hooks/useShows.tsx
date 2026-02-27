import { useState } from "react"
import { useFetch } from "./useFetch"

export function useShowDetails(id:string){
  const [details, setDetails] = useState<TVDetails | null>(null)
  const url = `/tv/${id}?language=en-US`
  useFetch<TVDetails | null>(url,setDetails)
  return details
}

export function useShowsAll(genreID: number | null, page:number) {
  const genre = genreID !== null ? `&with_genres=${genreID}` : ''
  const url = `/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${genre}`
  
  const [shows, setShows] = useState<ShowResponse | null>(null)
  
  useFetch<ShowResponse | null>(url,setShows)
  
  return shows
}

export function useShowsList(url: string) {
  const [shows, setShows] = useState<ShowResponse | null>(null)
  
  useFetch<ShowResponse | null>(url,setShows)
  
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
  POPULAR: process.env.NEXT_PUBLIC_BASE_URL + "/tv/popular",
  TOP_RATED: process.env.NEXT_PUBLIC_BASE_URL + "/tv/top_rated",
  AIRING_TODAY: process.env.NEXT_PUBLIC_BASE_URL + "/tv/airing_today",
  ON_THE_AIR: process.env.NEXT_PUBLIC_BASE_URL + "/tv/on_the_air",
  POPULAR_FULL: process.env.NEXT_PUBLIC_BASE_URL + "/tv/popular",
  TOP_RATED_FULL: process.env.NEXT_PUBLIC_BASE_URL + "/tv/top_rated"
}

export interface TVDetails {
  description: string;
  episode_count: number;
  group_count: number;
  groups: Group[];
  id: string;
  name: string;
  network: Network;
}

export interface Group {
  id: string;
  name: string;
  order: number;
  episodes: Episode[];
}

export interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: string;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  order: number;
  locked: boolean;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}