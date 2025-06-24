export type User = {
    name?: string;
    email: string;
    password?: string;
}

export type FormData = {
    email: string;
    password: string;
}

export type Feedback = {
    name: string;
    idade: number;
    email: string;
    mensagem?: string;
}