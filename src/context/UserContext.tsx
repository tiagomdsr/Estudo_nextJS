'use client'

import {createContext, useContext, useState} from "react";
import { User } from "@/constants/types";

type UserContextType = {
    user: User | null;
    login: (data: User) => void
    logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);

    const login = (data: User) => setUser(data);
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) throw new Error("useUser must be used within a UserProvider");

    return context;
}