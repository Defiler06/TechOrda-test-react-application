import React from 'react';
import styles from "./RegistrationForm.module.css";
import Button from "../Button/Button.tsx";
import {useAppDispatch, useAppSelector} from "../../hook.ts";
import {setDataToLocalStorage, setUserFirstName, setUserLastName} from "../../store/slice/quizSlice.ts";

interface IRegistrationForm {
    startQuizHandler(): void
}

const RegistrationForm: React.FC<IRegistrationForm> = (props) => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(state => state.quiz.answers_state)

    const changeFirstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserFirstName(e.target.value))
        dispatch(setDataToLocalStorage())
    }

    const changeLastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserLastName(e.target.value))
        dispatch(setDataToLocalStorage())
    }

    const saveUserData = () => {
        localStorage.setItem("user_data", JSON.stringify({first_name: userState.first_name, last_name: userState.last_name}))
    }

    return (
        <div className={styles.registrationForm}>
            <div className={styles.formContainer}>
                <h2>Введите ваше имя и фамилию:</h2>

                <input
                    onKeyUp={saveUserData}
                    onChange={changeFirstNameHandler}
                    value={userState.first_name}
                    name={'first_name'}
                    className={styles.registrationInput}
                    type="text"
                    placeholder={'Имя'}
                />

                <input
                    onKeyUp={saveUserData}
                    onChange={changeLastNameHandler}
                    value={userState.last_name}
                    name={'last_name'}
                    className={styles.registrationInput}
                    type="text"
                    placeholder={'Фамилия'}
                />

                <Button
                    disabled={userState.first_name.trim() === "" || userState.last_name.trim() === ""}
                    handler={props.startQuizHandler}
                    button_text={"Начать тест"}
                />
            </div>
        </div>
    )
};

export default RegistrationForm;