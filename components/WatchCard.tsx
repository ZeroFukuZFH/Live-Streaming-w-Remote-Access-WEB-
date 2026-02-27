import Image from "next/image"

import { HoverCard,HoverCardContent,HoverCardTrigger } from "@/components/ui/hover-card"
import Link from "next/link";
import { usePathname } from "next/navigation";

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

    const param = usePathname()

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link href={param + '/' + id}>
                    <div className="flex flex-col w-56">
                    <Image src={poster_path} alt="movie image" className="flex 3" width={300} height={450}/>
                    </div>
                </Link>
            </HoverCardTrigger>
            <HoverCardContent side="right">
                <h1>{title}</h1>
                <h1>{release_date}</h1>
                <h1>{vote_average}</h1>
            </HoverCardContent>
        </HoverCard>
    )
}