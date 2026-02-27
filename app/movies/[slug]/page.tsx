"use client"

import { useParams } from "next/navigation"
import { WatchTab } from "@/components/WatchTab";
import { HomeHeader } from "@/components/AppHeader";

export default function Page(){
    const params = useParams() 
    const id : string | undefined = params.slug?.toString()
    const movieLink = `https://www.vidking.net/embed/movie/${id}?color=e50914`
    
    return (
        <>
        <HomeHeader />
        <WatchTab  link={movieLink}  />
        </>
    )
}

