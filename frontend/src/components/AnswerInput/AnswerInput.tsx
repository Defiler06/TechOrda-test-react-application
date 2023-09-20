import React from "react";
import styles from "./AnswerInput.module.css";

interface IAnswerInput {
    input_value: string,
    changeHandler(e: React.ChangeEvent<HTMLInputElement>): void
}

const AnswerInput: React.FC<IAnswerInput> = (props) => {
    return (
        <input
            className={styles.answerInput}
            type="text"
            placeholder={"Ваш ответ"}
            value={props.input_value}
            onChange={props.changeHandler}
        />
    )
}

export default AnswerInput;