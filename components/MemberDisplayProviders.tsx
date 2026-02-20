import { createContext, Dispatch, SetStateAction } from "react";

interface CurrentMemberProps {
    currentMemberCount : number,
    setCurrentMemberCount : Dispatch<SetStateAction<number>>
}

export const CurrentMemberContext = createContext<CurrentMemberProps>({
    currentMemberCount:0,
    setCurrentMemberCount:()=>{}
});

interface MaxMemberContextProps {
    maxMembers : number,
    setMaxMembers : Dispatch<SetStateAction<number>>
}

export const MaxMemberContext = createContext<MaxMemberContextProps>({
    maxMembers : 0,
    setMaxMembers : () => {}
})

interface PopUpBoxContextProps {
    togglePopUp : boolean,
    setTogglePopUp : Dispatch<SetStateAction<boolean>>
}

export const PopUpBoxContext = createContext<PopUpBoxContextProps>({
    togglePopUp : false,
    setTogglePopUp : () => {}
})