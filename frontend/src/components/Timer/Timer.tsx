import React, {useEffect, useState} from 'react';
import styles from "./Timer.module.css"
import {useAppDispatch} from "../../hook.ts";
import {sendUserAnswers} from "../../store/slice/quizSlice.ts";
import {ITimer} from "../../interfaces/ITimer.ts";

let interval: any;

const Timer: React.FC<ITimer> = (props) => {
    const [userTime, setUserTime] = useState(1800000);
    const dispatch = useAppDispatch()

    if(userTime <= 0) {
        dispatch(sendUserAnswers())
        props.stop()
    }

    useEffect(() => {
        const checkStartInLs = localStorage.getItem('startTime');
        const checkEndInLs = localStorage.getItem('endTime');
        const currentTime = Date.now();

        if (checkStartInLs !== null) {
            const startTime = parseInt(checkStartInLs);
            const endTime = parseInt(checkEndInLs ?? startTime + 1800000 + "");

            if (currentTime < endTime) {
                const remainingTime = endTime - currentTime;
                setUserTime(remainingTime);
                startTimer(remainingTime);
            } else {
                try {
                    dispatch(sendUserAnswers())
                    props.stop()
                } catch (err) {
                    console.log(err)
                }

                setUserTime(0);
                clearInterval(interval);
            }
        } else {
            // Если нет сохраненных данных, устанавливаем время теста по умолчанию (60000 мс).
            const endTime = currentTime + 60000;
            localStorage.setItem('startTime', currentTime.toString());
            localStorage.setItem('endTime', endTime.toString());
            setUserTime(1800000);
            startTimer(1800000);
        }
    }, []);

    const startTimer = (time: any) => {
        interval = setInterval(() => {
            if (time > 0) {
                time -= 1000;
                setUserTime(time >= 0 ? time : 0); // Проверяем, что время не меньше 0
                localStorage.setItem('endTime', (Date.now() + time).toString());
            } else {
                clearInterval(interval);
            }
        }, 1000);
    };

    const formatTime = (milliseconds: any) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
        return `${minutes}:${+seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div>
            <div className={styles.timer}>
                <span className={styles.timerText}>Времени осталось - {formatTime(userTime >= 0 ? userTime : 0)}</span>
            </div>
        </div>
    );
};

export default Timer;

