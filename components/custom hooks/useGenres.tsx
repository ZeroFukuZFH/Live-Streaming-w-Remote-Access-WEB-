import { useState } from "react"
import { useFetch } from "./useFetch"


export function useGenreList(type:string){
  const [genreList,setGenreList] = useState<{genres:GenreProps[]} | null>(null)
  const url = `/genre/${type}/list?language=en`
  
  useFetch<{genres:GenreProps[]} | null>(url,setGenreList)
  return genreList
}

export interface GenreProps {
  id : number | null,
  name : string 
}