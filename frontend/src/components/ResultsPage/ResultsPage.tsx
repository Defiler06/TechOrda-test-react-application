import { useEffect} from 'react';
import styles from "./ResultsPage.module.css"
import {getResults} from "../../store/slice/resultSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hook.ts";

const ResultsPage = () => {
    const userData = useAppSelector(state => state.result.results)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getResults())
    }, [])

    return (
        <div className={styles.container}>
            {
                userData.length > 0 ?
                    userData.map((userItem, index) => {
                        return <UserDataTable key={index} userData={userItem}/>
                    }) : <h3>Результаты не найдены, попробуйте зайти позже</h3>
            }
        </div>
    );
};


const TableRow = (props: any) => {
    return (
        <tr>
            <td className={styles.questionNumberCell}>{props.answerData.question_number}</td>
            <td className={styles.questionCell}>{props.answerData.answer}</td>
            <td className={styles.questionAnswer}>
                {
                    props.answerData.correct !== undefined ? (
                        props.answerData.correct ? "Да" : "Нет"
                    ) : ""
                }
            </td>
        </tr>
    )
}


const UserDataTable = (props: any) => {
    return (
        <div className={styles.userItem}>
            <h3>Пользователь: {props.userData.first_name} {props.userData.last_name}</h3>
            <p>Дата отправки: {new Date(props.userData.timeStamp).toLocaleString()}</p>

            <h3>Ответы на вопросы</h3>
            <table>
                <thead>
                <tr>
                    <th className={styles.questionNumberCell}>№</th>
                    <th className={styles.questionCell}>Ответ</th>
                    <th className={styles.questionAnswer}>Правильный ответ</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.userData.answers !== undefined ?

                        props.userData.answers.map((answerData: any, index: number) => {
                            return <TableRow key={index} answerData={answerData}/>
                        }) : null
                }
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={2}>
                        Количество правильных ответов:
                    </td>
                    <td className={styles.correctAnswerCounter}>
                        {
                            props.userData.answers !== undefined ?
                                props.userData.answers.reduce((acc: number, curr: any) => {
                                    if(curr.correct !== undefined && curr.correct === true) {
                                        return acc + 1
                                    }
                                    return acc
                                }, 0)
                                : ""
                        }
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        Количество символов:
                    </td>
                    <td className={styles.correctAnswerCounter}>
                        {
                            props.userData.typewriterScore
                        }
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>

    )
}

export default ResultsPage;