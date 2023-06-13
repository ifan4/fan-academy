import { HTTP_METHOD } from "next/dist/server/web/http"

export interface materi {
    id:string
    class_id?:string
    description:string
    title:string
    file:string
    video:string
    created_at:Date
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
    materi: {
        id: string,
        title: string
    }
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
