"use client"

import { useEffect } from "react"

export default function Home() {
  const getMoviesList = async () => {
    const popular = await fetch("https://api.themoviedb.org/3/movie/popular")
    const topRated = await fetch("https://api.themoviedb.org/3/movie/top_rated")
    const upcoming = await fetch("https://api.themoviedb.org/3/movie/upcoming")
    console.log(popular.body)
    return {popular, topRated, upcoming}
  }
  useEffect(()=>{
    const url = 'https://api.themoviedb.org/3/authentication';
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));
  },[])
  return (
    <div className="">
      
    </div>
  );
}



