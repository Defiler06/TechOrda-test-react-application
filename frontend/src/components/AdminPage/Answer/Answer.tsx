import React, {useState} from 'react';
import {useAppDispatch} from "../../../hook.ts";
import {correctAnswerToggle, deleteAnswerHandler, editAnswerHandler} from "../../../store/slice/adminSlice.ts";
import styles from "./Answer.module.css"
import deleteIcon from "../../../assets/icon-delete.svg";
import {IAnswer} from "../../../interfaces/IAnswer.ts";

interface IAnswerProps {
    answerData: IAnswer,
    questionId?: string
}

const Answer: React.FC<IAnswerProps> = (props) => {
    const [answer, setAnswer] = useState(props.answerData)
    const dispatch = useAppDispatch()

    const deleteAnswer = () => {
        dispatch(deleteAnswerHandler({questionId: props.questionId, answerId: answer.answer_id}))
    }

    const changeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setAnswer(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const keyUpHandler = () => {
        dispatch(editAnswerHandler({questionId: props.questionId, answer: answer}))
    }

    const changeToggle = () => {
        dispatch(correctAnswerToggle({questionId: props.questionId, answer: answer}))
    }

    return (
        <div className={styles.answer}>
            <div className={styles.answerHeader}>
                <span>ID вопроса: {props.answerData.answer_id}</span>
                <button className={styles.deleteButton} onClick={deleteAnswer}>
                    <img className={styles.deleteIcon} src={deleteIcon} alt=""/>
                </button>
            </div>

            <div className={styles.wrapper}>
                <p className={styles.title}>Описание ответа на вопрос:</p>
                <input
                    className={styles.answerInput}
                    onKeyUp={keyUpHandler}
                    onChange={changeAnswer}
                    value={answer.answer_description}
                    name={"answer_description"}
                    type="text"
                />
            </div>

            <div className={styles.wrapper}>
                <p className={styles.title}>Значение отображаемое на сервере:</p>
                <input
                    className={styles.answerInput}
                    onKeyUp={keyUpHandler}
                    onChange={changeAnswer}
                    value={answer.answer_value}
                    name={"answer_value"}
                    type="text"
                />
            </div>

            <label htmlFor={`correct-answer-${props.answerData.answer_id}`}>
                <input onChange={changeToggle} type="checkbox" name={`correct-${props.questionId}`} id={`correct-answer-${props.answerData.answer_id}`}/>
                <span>Правильный вариант ответа на вопрос</span>
            </label>

        </div>
    );
};

export default Answer;