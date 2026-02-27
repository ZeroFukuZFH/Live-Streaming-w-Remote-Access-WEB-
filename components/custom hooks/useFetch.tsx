import { useEffect, Dispatch, SetStateAction } from "react"

export const options = {
    method:'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    }
}

export function useFetch<T>(url : string,setRes : Dispatch<SetStateAction<T>>){
  useEffect(()=>{
    console.log('has rendered, useFetch')
    const getShowDetails = async () => {
      try {
        const result = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, options)
        .then(res => {
          if(!res.ok){
            throw new Error('show details not found')
          }
          return res.json()
        })
        setRes(result)
      } catch (err){
        console.error(err)
      }
    }
    getShowDetails()
  },[url])
}