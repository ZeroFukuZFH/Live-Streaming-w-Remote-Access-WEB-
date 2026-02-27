"use client"

import { HomeHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function Home() {
  return (
    <>
    <HomeHeader />
    <div className="text-white max-w-screen flex flex-col items-center">
      <section className="max-w-7xl w-full px-4">
        <div className="flex flex-col items-center justify-center text-center w-full h-[70vh] mb-8">
          <div className="w-[40vw] flex flex-col gap-4">
            <h1 className="text-[90px] font-bold">WATCH PARTY</h1>
            <h3 className="text-[20px] text-gray-400">fuck ads, free streaming site</h3>
            <h1>Watch Party</h1>
            <div className=" flex flex-row gap-2 justify-center items-center">
              <Button variant={"outline"} className="w-45 cursor-pointer"><Plus/> Create Session</Button>
              <Button variant={"default"} className="w-45 cursor-pointer bg-red-600 text-white">Join Session</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}


