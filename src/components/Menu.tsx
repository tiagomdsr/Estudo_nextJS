'use client'

import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function Menu() {
    const buttonClass: string = "cursor-pointer text-xl rounded-sm px-8 py-2 hover:bg-slate-800";
    const { user } = useUser()
    const { logout } = useUser();

    const handleLogout = () => {
        logout();
        localStorage.removeItem("loggedUser");
    }

    return (
        <div className="flex w-full items-center gap-x-2">
            <Link href="/" className={buttonClass}>Início</Link>
            <Link href="/sobre" className={buttonClass}>Sobre</Link>
            <Link href="/contato" className={buttonClass}>Contato</Link>

            <div className="flex ml-auto gap-x-2">
                {user ?
                    <div className="flex ml-auto gap-x-2">
                        <p className="text-xl px-8 py-2">Usuário: {user.name}</p>
                        <button className={buttonClass} onClick={handleLogout}>Logout</button>
                    </div>
                : 
                    <div className="flex ml-auto gap-x-2">
                        <Link href="/login" className={buttonClass}>Login</Link>
                        <Link href="/register" className={buttonClass}>Cadastro</Link>
                    </div>
                }
            </div>
        </div>
    )
}