import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../hook.ts";
import {addQuestionHandler, sendQuestions} from "../../../store/slice/adminSlice.ts";
import Question from "../Question/Question.tsx";
import Button from "../../Button/Button.tsx";
import styles from "./QuestionPage.module.css"

const QuestionsPage: React.FC = () => {
    const state = useAppSelector(state => state.admin.questions)
    const dispatch = useAppDispatch()

    const addQuestion = () => {
        dispatch(addQuestionHandler())
    }

    const sendQuestion = () => {
        dispatch(sendQuestions())
    }

    return (
        <div>
            {
                state.map(question => {
                    return <Question key={question.question_id} questionData={question}/>
                })
            }

            <div className={styles.infoBlock}>
                <div className={styles.add}>
                    <Button
                        disabled={false}
                        handler={addQuestion}
                        button_text={"Добавить новый вопрос"}
                    />
                </div>

                <div className={styles.send}>
                    <Button
                        disabled={false}
                        handler={sendQuestion}
                        button_text={"Отправить вопросы на сервер"}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuestionsPage;