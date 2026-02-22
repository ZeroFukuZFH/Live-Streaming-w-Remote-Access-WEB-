"use client"

import { createContext, Dispatch, SetStateAction } from "react"

interface UserNameProps {
    name : string,
    setName : Dispatch<SetStateAction<string>>
}
const UserNameContext = createContext<UserNameProps | null>(null)