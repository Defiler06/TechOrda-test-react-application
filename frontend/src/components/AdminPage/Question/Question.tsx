import React, {useState} from 'react';
import {useAppDispatch} from "../../../hook.ts";
import {addAnswerHandler, deleteQuestionHandler, editQuestionHandler} from "../../../store/slice/adminSlice.ts";
import Answer from "../Answer/Answer.tsx";
import styles from "./Question.module.css"
import deleteIcon from "../../../assets/icon-delete.svg"
import Button from "../../Button/Button.tsx";
import {IAnswer} from "../../../interfaces/IAnswer.ts";
import {IQuestion} from "../../../interfaces/IQuestion.ts";

interface IQuestionProps {
    questionData: IQuestion
}

const Question: React.FC<IQuestionProps> = ({questionData}) => {
    const [question, setQuestion] = useState({
        ...questionData
    })

    const dispatch = useAppDispatch()

    const changeQuestionData = (e: any) => {
        const {name, value} = e.target

        setQuestion((prevState: any) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const keyUpHandler = () => {
        dispatch(editQuestionHandler(question))
    }

    const deleteQuestion = () => {
        if(questionData.question_id) {
            dispatch(deleteQuestionHandler(questionData.question_id))
        }
    }

    const addAnswer = () => {
        dispatch(addAnswerHandler(questionData.question_id))
    }

    return (
        <div className={styles.question}>

            <div className={styles.questionHeader}>
                <span>ID вопроса: {question.question_id}</span>
                <button className={styles.deleteButton} onClick={deleteQuestion}>
                    <img className={styles.deleteIcon} src={deleteIcon} alt=""/>
                </button>
            </div>

            <div className={styles.wrapper}>
                <p className={styles.title}>Номер вопроса:</p>

                <input
                    className={styles.questionInput}
                    onKeyUp={keyUpHandler}
                    onChange={changeQuestionData}
                    name={"question_number"}
                    type="text"
                />
            </div>

            <div className={styles.wrapper}>
                <p className={styles.title}>Описание вопроса:</p>
                <input
                    className={styles.questionInput}
                    onKeyUp={keyUpHandler}
                    onChange={changeQuestionData}
                    name={"question_description"}
                    type="text"
                />
            </div>

            <div className={styles.wrapper}>
                <p className={styles.title}>URL картинки:</p>
                <input
                    className={styles.questionInput}
                    onKeyUp={keyUpHandler}
                    onChange={changeQuestionData}
                    name={"image_url"}
                    type="text"
                />

                {
                    question.image_url && question.image_url.length > 0 ?
                        <div className={styles.questionImage}>
                            <img src={question.image_url} alt={`URL - ${question.image_url}`}/>
                        </div> : null
                }
            </div>

            <Button disabled={false} button_text={"Добавить ответ на вопрос"} handler={addAnswer}/>

            {
                questionData.answers ?
                    questionData.answers.map((answerItem: IAnswer) => {
                        return (
                            <Answer
                                key={answerItem.answer_id}
                                answerData={answerItem}
                                questionId={questionData.question_id}
                            />
                        )
                    }) : null
            }
        </div>
    );
};

export default Question;