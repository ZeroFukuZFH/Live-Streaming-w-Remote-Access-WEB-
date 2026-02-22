import { ArrowRight } from "lucide-react";
import Image from "next/image"
import { useContext } from "react";
import { MovieLinkContext } from "./temporarySolution";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MovieCardProps {
    id:number
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

export function MovieCard({
    id,
    title,
    overview,
    poster_path,
    release_date,
    vote_average,
}:MovieCardProps){

    // START OF TEMP SOL
    const router = useRouter()
    const {link,setLink} = useContext(MovieLinkContext)
    const handleSetLink = (id:number) => {
        setLink(`https://www.vidking.net/embed/movie/${id}?color=e50914`) 
        console.log(link)
        if(link !== '/'){
            router.push("/movie/watch")
        }
        console.log(link)
    }
    //END OF TEMP SOL

    return (
        <div className="flex flex-col w-56">
            <Image src={poster_path} alt="movie image" className="flex 3" width={300} height={450}/>
            <h1>{title}</h1>
            <h1>{release_date}</h1>
            <h1>{vote_average}</h1>
                <button
                 onClick={()=>handleSetLink(id)} // temp sol
                className="flex bg-red-600 p-1 cursor-pointer"
                >
                Go to Movie <ArrowRight/>
                </button>
                
        </div>
    )
}