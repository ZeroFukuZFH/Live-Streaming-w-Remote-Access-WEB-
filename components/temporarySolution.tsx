// THIS IS MARKED AS TEMPORARY BECAUSE I DIDNT KNOW HOW TO
// SOLVE THE STUPID GENERATESTATICPARAMS ISSUE, SO WE'RE GONNA
// USE THE GLOBAL HOOK INSTEAD
"use client"

import { createContext, Dispatch, SetStateAction, useState, useEffect } from "react";

interface MovieLinkProps {
    link : string,
    setLink : Dispatch<SetStateAction<string>>
}

export const MovieLinkContext = createContext<MovieLinkProps>({ 
    link : "/", 
    setLink : ()=>{}
})

export function MovieLinkProvider({ children }: { children: ReactNode }) {
  const [link, setLink] = useState("");

  return (
    <MovieLinkContext.Provider value={{ link, setLink }}>
      {children}
    </MovieLinkContext.Provider>
  );
}