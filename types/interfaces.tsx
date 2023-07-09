import { HTTP_METHOD } from "next/dist/server/web/http"

export interface materi {
    id:string
    class_id?:string
    description:string
    title:string
    file:string
    video_materi:string
    created_at:Date,
    class?: {
        id: string,
        name: string
    }
}
export interface class_type {
    id:string
    name:string
    description:string
    created_at:Date
    materis?:materi[]
}

export interface quiz{
    id: string,
    question: string,
    opsi_a: string,
    opsi_b: string,
    opsi_c: string,
    opsi_d: string,
    opsi_e: string,
    answer: string,
    materi?: {
        id: string,
        title: string
    },
    materi_id?: string
}


export interface answer{
    quiz_id: string,
    answer: string
} 

export interface answers {
    answers:answer[]
}

export interface userScores {
    your_score: number,
    correct: number,
    wrong: number,
    data: {
        id: BigInt,
        quiz_id: BigInt,
        user_id: BigInt,
        score: number,
        answer: string,
        created_at: Date,
        updated_at: Date,
        materi_id: BigInt
    }
}

export interface FetchRequest {
    method?: HTTP_METHOD;
    body?: BodyInit;
    headers?: HeadersInit;
    data?: any
}

export interface quizzesSummary{
    avarage_score: number,
    total_quizzes: number,
    total_correct: number,
    total_wrong: number
}

export interface error{
    message: string,
    status: string | number
}

export interface theme {
    name: 'dark' | 'light'
} 

export interface user {
    id: string,
    first_name: string,
    last_name: string,
    nisn: string,
    role: {
        id: string,
        name: 'admin' | 'user' | 'creator'
    },
    email: string
    email_verified_at: Date
    created_at: Date
    updated_at: Date
    date_of_birth: Date
}
