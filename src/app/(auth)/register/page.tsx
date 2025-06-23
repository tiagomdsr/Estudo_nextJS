'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
	name: string;
	email: string;
	password: string;
}

export default function Register() {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const router = useRouter();

	const handleRegister = (e: any) => {
		e.preventDefault();
		const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
		users.push({ name, email, password })
		localStorage.setItem("users", JSON.stringify(users))
		alert("Cadastro realizado")
		router.push("/login")
	}

	return (
		<div className="flex flex-col w-full">
			<h2 className="my-8 text-5xl text-center">Registro</h2>
			<form onSubmit={handleRegister} className="flex flex-col gap-y-4 items-center">
				<input
					type="name"
					className="w-1/3 p-2 border-2 rounded-sm border-slate-900 bg-slate-700"
					placeholder="Insira seu nome"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Email"
					className="w-1/3 p-2 border-2 rounded-sm border-slate-900 bg-slate-700"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Insira uma senha"
					className="w-1/3 p-2 border-2 rounded-sm border-slate-900 bg-slate-700"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type="submit" className="cursor-pointer w-1/8 mx-2 rounded-md p-2 bg-slate-900 hover:bg-slate-700">Entrar</button>
			</form>
		</div>
	);
}