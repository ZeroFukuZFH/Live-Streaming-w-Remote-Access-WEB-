"use client"

import { ArrowLeft, Settings, UserPlus } from "lucide-react"
import { useState, useContext } from 'react';
import { CurrentMemberContext, MaxMemberContext, PopUpBoxContext } from "./MemberDisplayProviders";


export default function MemberDisplay(){
    const [currentMemberCount, setCurrentMemberCount] = useState(sampleMembers.length)
    const [maxMembers, setMaxMembers] = useState(5)
    const [togglePopUp, setTogglePopUp] = useState(false)

    return (
        <CurrentMemberContext.Provider value={{currentMemberCount,setCurrentMemberCount}}>
        <MaxMemberContext.Provider value={{maxMembers,setMaxMembers}}>
        <PopUpBoxContext.Provider value={{togglePopUp,setTogglePopUp}}>
            <div className="bg-[rgb(25,25,25)] flex flex-col gap-4 w-screen max-w-7xl rounded-xl p-2 pl-4 pr-4 backdrop-blur-xs">
                <WatchPartyHeader/>
                {togglePopUp ? <WatchPartySettings/> : <WatchPartyBody/>}
                <WatchPartyFooter/>
            </div>
        </PopUpBoxContext.Provider>
        </MaxMemberContext.Provider>
        </CurrentMemberContext.Provider>
    )
}

interface MemberProps {
    id : number,
    name : string
}

const sampleMembers : MemberProps[] = []

function WatchPartyHeader(){
    const { currentMemberCount, setCurrentMemberCount } = useContext(CurrentMemberContext)
    const { maxMembers, setMaxMembers } = useContext(MaxMemberContext)
    const alertCopy = () => {
        alert("Invite Link Copied!");
    }
    return (
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
                <h1>Watch Party</h1>
                <h1>{currentMemberCount} / {maxMembers}</h1>
            </div>
            <button 
                className="cursor-pointer hover:bg-[rgb(255,255,255,0.6)] p-1 rounded-2xl"
                onClick={alertCopy}
            >
                <UserPlus/>
            </button>
        </div>
    )
}

function WatchPartyBody(){
    return (
        <div>   
            {sampleMembers.map(users => (
                <div key={users.id}>{users.name}</div>
            ))}
        </div>
    )
}

function WatchPartySettings(){
    return (
        <div>
            <div className="flex flex-row gap-2 items-center">
                <h1>Max no. of Participants</h1>
                <input className="outline-none bg-black w-8 p-1"/>
            </div>
        </div>
    )
}

function WatchPartyFooter(){
    const {togglePopUp,setTogglePopUp} = useContext(PopUpBoxContext)
    const handleTogglePopUp = () => {
        setTogglePopUp(prev => !prev)
    }
    return (
        <div>
            <button
                className="cursor-pointer hover:bg-[rgb(255,255,255,0.6)] p-1 rounded-2xl"
                onClick={handleTogglePopUp}
            >
                {togglePopUp ? <ArrowLeft/> : <Settings/>}
            </button>
            
        </div>
    )
}



