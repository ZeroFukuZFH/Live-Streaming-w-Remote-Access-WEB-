"use client"

import Link from "next/link"
import { UserPlus } from "lucide-react"

export function HomeHeader(){
  return (
    <>
    <div className="flex flex-row h-15 sticky bg-black w-screen items-center p-4 cursor-pointer justify-evenly">
      <Link href={"/"} className="hover:text-red-600">AppHome</Link>
      <Link href={"/shows"} className="hover:text-red-600">Shows</Link>
      <Link href={"/movies"} className="hover:text-red-600">Movies</Link>
      <h1>set username</h1>
      <input 
        className="outline-none border p-1 border-white flex flex-row gap-2" 
        placeholder="e.g jane doe"
      />
    <Link href={'/join'}> 
        <UserPlus 
          className="hover:bg-white cursor-pointer"
        />
    </Link>
    </div>
    </>
    
  )
}

