"use client"

import Link from "next/link"
import { UserPlus } from "lucide-react"
import { SearchBar } from "./SearchBar"

export function HomeHeader(){
  return (
    <div className="sticky top-0 z-50 flex flex-row h-15 bg-black w-full items-center p-4 cursor-pointer justify-evenly border-b border-gray-800">
      <Link href={"/"} className="hover:text-red-600 transition-colors">AppHome</Link>
      <Link href={"/shows"} className="hover:text-red-600 transition-colors">Shows</Link>
      <Link href={"/movies"} className="hover:text-red-600 transition-colors">Movies</Link>
      
      <Link href={'/join'}> 
        <UserPlus 
          className="hover:bg-white cursor-pointer transition-colors rounded-full p-1"
          size={24}
        />
      </Link>
      <SearchBar/>
    </div>
  )
}