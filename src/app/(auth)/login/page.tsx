'use client'

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useUser } from "@/context/UserContext";
import { User } from "@/constants/types";

const loginSchema = z.object({
	email: z.string().email("Email inválido"),
	password: z.string().min(4, "Senha muito curta"),
})

type LoginData = z.infer<typeof loginSchema>

export default function Login() {
	const { login } = useUser();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<LoginData>({
		resolver: zodResolver(loginSchema)
	});

	const onSubmit = (data: LoginData) => {
		const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
		const user = users.find(u => u.email === data.email && u.password === data.password);
	

		if (user) {
			login({ name: user.name || "Usuário", email: user.email })
			localStorage.setItem("loggedUser", JSON.stringify(user));
			alert("Logado");
			router.push("/");
		} else {
			alert("Credenciais inválidas");
		}
	}

	return (
		<div className="flex flex-col w-full">
			<h2 className="my-8 text-5xl text-center">Login</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 items-center">
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
						placeholder="Sua senha"
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