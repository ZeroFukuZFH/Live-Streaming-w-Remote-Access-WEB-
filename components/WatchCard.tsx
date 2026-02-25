import Image from "next/image"
import { useContext } from "react";
import { MovieLinkContext } from "./temporarySolution";
import { useRouter } from "next/navigation";
import { HoverCard,HoverCardContent,HoverCardTrigger } from "@/components/ui/hover-card"

interface WatchCardProps {
    id:number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

export function WatchCard({
    id,
    title,
    poster_path,
    release_date,
    vote_average,
}:WatchCardProps){

    // START OF TEMP SOL
    const router = useRouter()
    const {link,setLink} = useContext(MovieLinkContext)
    const handleSetLink = (id:number) => {
        setLink(`https://www.vidking.net/embed/movie/${id}?color=e50914`) 
        console.log(link)
        if(link !== '/'){
            router.push("/movies/watch")
        }
        console.log(link)
    }
    //END OF TEMP SOL

    return (
        <HoverCard>
            <HoverCardTrigger>
                <button onClick={()=>handleSetLink(id)} className="cursor-pointer">
                    <div className="flex flex-col w-56">
                    <Image src={poster_path} alt="movie image" className="flex 3" width={300} height={450}/>
                    </div>
                </button>
            </HoverCardTrigger>
            <HoverCardContent side="right">
                <h1>{title}</h1>
                <h1>{release_date}</h1>
                <h1>{vote_average}</h1>
            </HoverCardContent>
        </HoverCard>
    )
}