export class QuestionDto {
    question_description?: string;
    question_number?: string;
    answers?: [{id: string, answerValue: string, answerDescription: string}]
    image_url?: string

    constructor(question_description: string, question_number: string, answers: [{id: string, answerValue: string, answerDescription: string}], imageUrl: string) {
        this.question_description = question_description;
        this.question_number = question_number;
        this.answers = answers;
        this.image_url = imageUrl;
    }
}