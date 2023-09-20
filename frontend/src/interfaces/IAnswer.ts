import React from "react";

export interface IAnswer {
    answer_id: string,
    answer_value: string,
    answer_description: string,
    answer_correct?: boolean
}

export interface IAnswersGroupProps extends IAnswer {
    group_name: string,
    changeHandler(e: React.ChangeEvent<HTMLInputElement>): void
}