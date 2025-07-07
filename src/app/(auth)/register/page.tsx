'use client'
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { User } from "@/constants/types";
import { useUser } from "@/context/UserContext";

const registerSchema = z.object({
	name: z.string().min(2, "O nome deve ter no mínimo 2 letras"),
	email: z.string().email("Email inválido").refine((email) => {
		const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
		const existe: boolean = users.some(u => u.email === email);
		return !existe;
	}, "email já cadastrado"),
	password: z.string().min(4, "senha muito curta"),
});

type registerData = z.infer<typeof registerSchema>;

export default function Register() {
	const { login } = useUser();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<registerData>({
		resolver: zodResolver(registerSchema)
	})

	const onSubmit = (data: registerData) => {
		const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

		users.push({
			name: data.name,
			email: data.email,
			password: data.password 
		});

		localStorage.setItem("users", JSON.stringify(users));

		alert("Cadastro realizado");
		
		const user = users.find(u => u.email === data.email && u.password === data.password);

		if(user) {
			login({name: user.name || "Usuário", email: user.email});
			localStorage.setItem("loggedUser", JSON.stringify(user));		
			router.push("/")
		}

	}

	return (
		<div className="flex flex-col w-full">
			<h2 className="my-8 text-5xl text-center">Registro</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 items-center">
				<div className="flex flex-col w-1/3">
					<input
						type="name"
						className="w-full p-2 border-2 rounded-sm border-slate-900 bg-slate-700"
						placeholder="Insira seu nome"
						{...register("name", {required: true})}
					/>
					{errors.name && <p>{errors.name.message}</p>}
				</div>
				<div className="flex flex-col w-1/3">
					<input
						type="email"
						placeholder="Email"
						className="w-full p-2 border-2 rounded-sm border-slate-900 bg-slate-700"
						{...register("email", {required: true})}
					/>
					{errors.email && <p>{errors.email.message}</p>}
				</div>
				<div className="flex flex-col w-1/3">
					<input
						type="password"
						placeholder="Insira uma senha"
						className="w-full p-2 border-2 rounded-sm border-slate-900 bg-slate-700"
						{...register("password", {required: true})}
					/>
					{errors.password && <p>{errors.password.message}</p>}
				</div>
				<button type="submit" className="cursor-pointer w-1/8 mx-2 rounded-md p-2 bg-slate-900 hover:bg-slate-700">Entrar</button>
			</form>
		</div>
	);
}