import React from 'react';
import styles from "./Button.module.css";
import {IButton} from "../../interfaces/IButton.ts";

const Button: React.FC<IButton> = (props) => {
    return (
        <button
            onClick={props.handler}
            disabled={props.disabled}
            className={styles.button}
        >
            {props.button_text}
        </button>
    );
};

export default Button;