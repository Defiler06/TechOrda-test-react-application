import styles from "./App.module.css"
import QuizPage from "./components/QuizPage/QuizPage.tsx";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm.tsx";
import React, {useEffect, useState} from "react";
import Complete from "./components/Complete/Complete.tsx";
import QuestionsPage from "./components/AdminPage/QuestionsPage/QuestionsPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ResultsPage from "./components/ResultsPage/ResultsPage.tsx";
import {useAppDispatch} from "./hook.ts";
import {getDataFromLocalStorage} from "./store/slice/quizSlice.ts";

const checkIsStarted = JSON.parse(localStorage.getItem('is_started') || 'false')
const milliseconds = localStorage.getItem('milliseconds') || '1000'

const App: React.FC = () => {
    const [isStarted, setIsStarted] = useState(checkIsStarted)
    const [isAvailable, setIsAvailable] = useState(milliseconds && parseInt(milliseconds) > 0)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getDataFromLocalStorage())
    }, [])

    const stopAvailable = () => {
        setIsAvailable(false)
    }

    const startQuizHandler = () => {
        setIsStarted(true)
        localStorage.setItem('is_started', 'true')
    }

    const contextMenuHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
    }

    return (
        <div onContextMenu={contextMenuHandler} className={styles.backdrop}>
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<div className={styles.container}>
                        {
                            !isStarted && isAvailable
                                ? <RegistrationForm startQuizHandler={startQuizHandler}/>
                                : ''
                        }

                        {
                            isStarted && isAvailable
                                ? <QuizPage stop={stopAvailable}/>
                                : ''
                        }

                        {
                            !isAvailable ? <Complete/> : ""
                        }
                    </div>}/>
                    <Route path="/admin" element={
                        <div className={styles.container}>
                            <QuestionsPage/>
                        </div>
                    }/>

                    <Route path="/results" element={<ResultsPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App
