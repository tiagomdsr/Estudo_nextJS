'use client'

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Menu() {
    const buttonClass: string = "cursor-pointer text-xl rounded-sm px-8 py-2 hover:bg-slate-800";
    const { user } = useUser()
    const { logout } = useUser();

    const router = useRouter();

    const handleRouter = (e:any): void => {
        e.preventDefault();
        const endereco = e.target.name;
        router.push(`/${endereco}`);
    }

    const handleLogout = () => {
        logout();
        localStorage.removeItem("loggedUser");
    }

    return (
        <div className="flex w-full items-center gap-x-2">
            <button name="" className={buttonClass} onClick={handleRouter}>Início</button>
            <button name="sobre" className={buttonClass} onClick={handleRouter}>Sobre</button>
            <button name="contato" className={buttonClass} onClick={handleRouter}>Contato</button>

            <div className="flex ml-auto gap-x-2">
                {user ?
                    <div className="flex ml-auto gap-x-2">
                        <p className="text-xl px-8 py-2">Usuário: {user.name}</p>
                        <button name="register" className={buttonClass} onClick={handleLogout}>Logout</button>
                    </div>
                : 
                    <div className="flex ml-auto gap-x-2">
                        <button name="login" className={buttonClass} onClick={handleRouter}>Login</button>
                        <button name="register" className={buttonClass} onClick={handleRouter}>Cadastro</button>
                    </div>
                }
            </div>
        </div>
    )
}