"use client"

import { useParams } from "next/navigation"

import { useState } from "react";
import { WatchTab } from "@/components/WatchTab";
import { HomeHeader } from "@/components/AppHeader";

interface ShowDetails {
    season : number,
    episode : number
}

export default function Page(){
    const params = useParams() // use for searching movie later
    const id : string | undefined = params.slug?.toString()
    const [showDetails, setShowDetails] = useState<ShowDetails>({season: 1, episode: 1})
    const tvLink = `https://www.vidking.net/embed/tv/${id}/${showDetails.season}/${showDetails.episode}?color=e50914`

    return (
        <>
        <HomeHeader />
        <WatchTab  link={tvLink}  />
        </>
    )
}

