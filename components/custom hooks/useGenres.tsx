import { useState, useEffect } from "react"
import { options } from "./data";

export function useGenreList(type:string){
  const [genreList,setGenreList] = useState<{genres:GenreProps[]} | null>(null)
  useEffect(()=>{
    const getGenres = async () => {
      try {
        const url = `/genre/${type}/list?language=en`
        const result = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url,options)
        .then(
          res => {
            if(!res.ok){
              throw new Error("no list found!")
            }
            return res.json()
          }
        )
        setGenreList(result)
      } catch (err){
        console.error(err)
      }
    }
    getGenres()
  },[type])
  return genreList
}

export interface GenreProps {
  id : number | null,
  name : string 
}