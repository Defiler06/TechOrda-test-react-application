import React, {useEffect} from 'react';
import QuestionItem from "../QuestionItem/QuestionItem.tsx";
import Button from "../Button/Button.tsx";
import {
    fetchQuizData,
    sendUserAnswers
} from "../../store/slice/quizSlice.ts";
import styles from "./QuizPage.module.css";
import Timer from "../Timer/Timer.tsx";
import {ITimer} from "../../interfaces/ITimer.ts";
import {useAppDispatch, useAppSelector} from "../../hook.ts";
import TypewritterWrapper from "../Typewritter/TypewritterWrapper.tsx";

const QuizPage: React.FC<ITimer> = (props) => {
    const quizState = useAppSelector((state) => state.quiz.questions_state)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchQuizData())
    }, [])

    return (
        <div className={styles.content}>
            {
                quizState.map((questionItem: any, index: number) => {
                    return <QuestionItem
                        key={index}
                        question_number={questionItem.question_number}
                        question_description={questionItem.question_description}
                        image_url={questionItem.image_url}
                        answers={questionItem.answers}
                    />
                })
            }

            <TypewritterWrapper />
            
            <div className={styles.infoBlock}>
                <div className={styles.timerPlace}>
                    <Timer stop={props.stop} />
                </div>

                <div className={styles.buttonPlace}>
                    <Button disabled={false} button_text={"Отправить ответы"} handler={() => {
                        dispatch(sendUserAnswers())
                        props.stop()
                        localStorage.setItem("milliseconds", "0")
                    }}/>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;