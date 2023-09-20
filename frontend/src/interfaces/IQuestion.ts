import {IAnswer} from "./IAnswer.ts";

export interface IQuestion {
    question_id?: string,
    question_number: string,
    question_description: string,
    image_url?: string | null,
    answers?: IAnswer[]
}