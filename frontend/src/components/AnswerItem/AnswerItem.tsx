import React from "react";
import {IAnswersGroupProps} from "../../interfaces/IAnswer.ts";
import styles from "./AnswerItem.module.css";

const AnswerItem: React.FC<IAnswersGroupProps> = (props) => {
    return(
        <div className={styles.answerItem}>
            <label className={styles.answerLabel} htmlFor={props.answer_id}>
                <input
                    className={styles.answerRadio}
                    type="radio"
                    name={props.group_name}
                    id={props.answer_id}
                    value={props.answer_value}
                    onChange={props.changeHandler}
                />
                {props.answer_description}
            </label>
        </div>
    )
}

export default AnswerItem;