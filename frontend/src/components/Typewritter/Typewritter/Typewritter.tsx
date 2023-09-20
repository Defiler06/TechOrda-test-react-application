import React, { useState, useEffect } from "react";
import './Typewritter.css';
import {useAppDispatch} from "../../../hook.ts";
import {setDataToLocalStorage, setTypewriterScore} from "../../../store/slice/quizSlice.ts";
import Button from "../../Button/Button.tsx";

const targetText = `Великая стена Китая – одно из величайших чудес мира, олицетворение древней китайской цивилизации и ее стремления к защите и безопасности. Это грандиозное сооружение простирается в тысячи километров через северную часть Китая, пересекая пустыни, горы и равнины. Строительство Великой китайской стены началось более двух тысяч лет назад, в 3 веке до н.э., и продолжалось на протяжении многих столетий. Она была создана с целью защиты от нападений и вторжений с севера, особенно от нашествий монголов и других народов. Стена представляет собой уникальное инженерное сооружение, включающее в себя стены, бастионы, башни, и оборонительные сооружения. Она строилась из камня, кирпичей, и других материалов, и является одной из самых масштабных и сложных инфраструктурных работ в истории человечества. Сегодня Великая стена остается одной из самых известных достопримечательностей Китая и мира в целом. Она привлекает миллионы туристов ежегодно, и является символом национального наследия Китая. Ее удивительная архитектура и историческая ценность делают ее одним из мест, которые следует посетить в жизни.`;

interface TypewritterProps {
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Typewritter = ({setStart}: TypewritterProps) => {
    // const score = useAppSelector(state => state.quiz.answers_state.typewriterScore);

    const [inputText, setInputText] = useState<string>("");
    const [highlightedText, setHighlightedText] = useState<JSX.Element[] | string>("");
    const [startTypewriter, setStartTypewriter] = useState<boolean>(true);
    const [remainingTime, setRemainingTime] = useState<number>(2 * 60);
    // const [total, setTotal] = useState<number>(0)

    const dispatch = useAppDispatch()

    useEffect(() => {
        updateHighlightedText();
    }, [inputText]);

    useEffect(() => {
        let timer: any;

        if (!startTypewriter) {
            timer = setTimeout(() => {
                setStart(false);
            }, remainingTime * 1000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [startTypewriter]);

    useEffect(() => {
        if (!startTypewriter && remainingTime > 0) {
            const interval = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [startTypewriter, remainingTime]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target.value);
    };

    const updateHighlightedText = () => {
        let updatedTotal = 0
        const textArray: JSX.Element[] = [];
        for (let i = 0; i < targetText.length; i++) {
            const char = targetText[i];
            const inputChar = inputText[i];
            
            const isMatching = inputChar && inputChar === char;

            if (isMatching) {
                updatedTotal += 1;
            }

            const style = isMatching ? { color: "#e18501" } : { color: "gray" };
            textArray.push(
                <span key={i} style={style}>
                    {char}
                </span>
            );
        }
        setHighlightedText(textArray);
        dispatch(setTypewriterScore(updatedTotal))
        dispatch(setDataToLocalStorage())
    };

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
        startTypewriter ? 
        <div className="Disclaimer_container">
            <div className="Disclaimer">
                <h3>Напечатайте максимальное количество букв за 2 минуты.</h3>
                <p>
                    Вам предоставляется текст и 2 минуты на набор как можно большего количества букв. 
                    Ваша цель - быстро и точно набирать текст на клавиатуре в течение этого времени. 
                    После окончания времени будет подсчитан результат. Удачи!
                </p>
                <Button disabled={false} button_text={"Начать"} handler={() => setStartTypewriter(false)}/>
            </div>
        </div>
        :
        <div className="Typewriter">
            <div className="TargetText">{highlightedText}</div>
            <div className="Timer">
                Оставшееся время: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <textarea
                value={inputText}
                onChange={handleInputChange}
                className="InputText"
                rows={4}
                cols={50}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
            />
        </div>
    );
};
