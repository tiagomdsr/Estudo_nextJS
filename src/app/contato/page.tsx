'use client'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Feedback } from "@/constants/types";

const feedbackSchema = z.object({
    name: z.string().min(2, "Nome deve ter no mínimo 2 letras"),
    idade: z.number({
        required_error: "Digite a idade",
        invalid_type_error: "Digite uma idade válida"
    })
        .int("Idade deve ser um valor inteiro")
        .min(0, "Idade não pode ser menor que 0")
        .max(150, "Digite uma idade válida"),
    email: z.string().email("Email inválido"),
    mensagem: z.string().optional(),
});

type FeedbackData = z.infer<typeof feedbackSchema>;

export default function Contato() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FeedbackData>({
        resolver: zodResolver(feedbackSchema)
    });
    
    const onSubmit = (data: FeedbackData): void => {
        const feedbacks: Feedback[] = JSON.parse(localStorage.getItem("feedbacks") || "[]");
        feedbacks.push({
            name: data.name,
            idade: data.idade,
            email: data.email,
            mensagem: data.mensagem
        });

        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

        alert("Feedback enviado com sucesso.");
        reset();
    }

    const handleKeyDown = (e: any): void => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <div className="flex flex-col w-full">
            <h1 className="my-8 text-5xl text-center">Contato</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 items-center">
                <div className="flex flex-col w-1/3">
                    <input 
                        type="text"
                        placeholder="nome"
                        className="w-full p-2 border-2 rounded-sm border-slate-900 bg-slate-700"
                        {...register("name", {required: true})}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="flex flex-col w-1/3">
                    <input
                        type="number"
                        placeholder="idade"
                        className="w-full p-2 border-2 rounded-sm border-slate-900 bg-slate-700"
                        {...register("idade", {required: true, valueAsNumber: true})}
                    />
                    {errors.idade && <p>{errors.idade.message}</p>}
                </div>
                <div className="flex flex-col w-1/3">
                    <input 
                        type="email"
                        placeholder="email"
                        className="w-full p-2 border-2 rounded-sm border-slate-900 bg-slate-700"
                        {...register("email", {required: true})}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="flex flex-col w-1/3">
                    <textarea 
                        placeholder="Mensagem"
                        className="resize-none full h-60 p-2 border-2 rounded-sm border-slate-900 bg-slate-700" 
                        {...register("mensagem")}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <button type="submit" className="cursor-pointer w-1/8 mx-2 rounded-md p-2 bg-slate-900 hover:bg-slate-700">Enviar</button>
            </form>
        </div>
    );
}