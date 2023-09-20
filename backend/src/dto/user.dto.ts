export class UserDto {
    first_name?: string;
    last_name?: string;
    answers?: [{key: string, value: string}]
    constructor(first_name: string, last_name: string, answers: [{key: string, value: string}]) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.answers = answers;
    }
}