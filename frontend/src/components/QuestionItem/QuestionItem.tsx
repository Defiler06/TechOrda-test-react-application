import React, {useState} from 'react';
import styles from "./QuestionItem.module.css";
import {IQuestion} from "../../interfaces/IQuestion.ts";
import AnswerInput from "../AnswerInput/AnswerInput.tsx";
import {setDataToLocalStorage, setUserAnswers} from "../../store/slice/quizSlice.ts";
import AnswerItem from "../AnswerItem/AnswerItem.tsx";
import {useAppDispatch} from "../../hook.ts";
import {IUserAnswers} from "../../interfaces/IUserAnswer.ts";

const QuestionItem: React.FC<IQuestion> = (props) => {
    const [inputValue, setInputValue] = useState("")
    const dispatch = useAppDispatch()

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, questionNumber: string, correctAnswer?: boolean) => {
        setInputValue(e.target.value)

        const answerObject: IUserAnswers = {
            question_number: questionNumber,
            answer: e.target.value,
            correct: correctAnswer
        }

        dispatch(setUserAnswers(answerObject))
        dispatch(setDataToLocalStorage())
    }

    return (
        <div className={styles.questionItem}>
            <h3 className={styles.questionNumber}>Вопрос - {props.question_number}</h3>

            {
                props.image_url ?
                    <div className={styles.imageFrame}>
                        <img className={styles.image} src={props.image_url} alt={`Question - ${props.question_number}`}/>
                    </div>
                    : null
            }

            <p className={styles.questionDescription} dangerouslySetInnerHTML={{__html: props.question_description}} />

            {
                props.answers !== undefined && props.answers.length > 0 ?
                    props.answers.map((answerItem, index) => {
                        return <AnswerItem
                            key={index}
                            answer_id={answerItem.answer_id}
                            answer_value={answerItem.answer_value}
                            answer_description={answerItem.answer_description}
                            group_name={props.question_number}
                            changeHandler={(e) => changeHandler(e, props.question_number, answerItem.answer_correct)}
                        />
                    }) :
                    <AnswerInput input_value={inputValue} changeHandler={(e) => changeHandler(e, props.question_number)} />
            }
        </div>
    );
};

export default QuestionItem;