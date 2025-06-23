'use client'
import { useState } from "react";

type Feedback = {
    nome: string;
    email: string;
    mensagem: string;
}

export default function Contato() {
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [mensagem, setMensagem] = useState<string>("");

    const handleFeedback = (e: any): void => {
        e.preventDefault();
        const feedbacks: Feedback[] = JSON.parse(localStorage.getItem("feedbacks") || "[]");
        feedbacks.push({nome, email, mensagem});
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
        alert("Feedback enviado com sucesso.");

        setNome("");
        setEmail("");
        setMensagem("");
    }

    const handleKeyDown = (e: any): void => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
        }
    }

    return (
        <div className="flex flex-col w-full">
            <h1 className="my-8 text-5xl text-center">Contato</h1>
            <form onSubmit={handleFeedback} className="flex flex-col gap-y-4 items-center">
                <input 
                    type="text"
                    placeholder="nome"
                    className="w-1/3 p-2 border-2 rounded-sm border-slate-900 bg-slate-700"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <input 
                    type="email"
                    placeholder="email"
                    className="w-1/3 p-2 border-2 rounded-sm border-slate-900 bg-slate-700"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <textarea 
                    name="areaTexto"
                    placeholder="Mesnagem"
                    className="resize-none w-1/3 h-60 p-2 border-2 rounded-sm border-slate-900 bg-slate-700"
                    value={mensagem} 
                    onChange={e => setMensagem(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button type="submit" className="cursor-pointer w-1/8 mx-2 rounded-md p-2 bg-slate-900 hover:bg-slate-700">Enviar</button>
            </form>
        </div>
    );
}