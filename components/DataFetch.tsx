"use client"

import { useEffect, useState } from "react"

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

const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDVkY2E2NjMxYzY2NmViOTc3OTQ4Nzc1YjU1MGJiOSIsIm5iZiI6MTc3MTY3NjEyOS4wLCJzdWIiOiI2OTk5YTFlMDE2OGYyMTA0NmU1OTAyYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.o4QG7qDx1_z13eitS_978rOzm0QGZv258MN2KJlNm3k" 
const options = {
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
    },[])
    return movies
}

export default function generateStaticParams(){
    
}
