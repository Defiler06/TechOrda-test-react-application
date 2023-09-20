import React from 'react';
import styles from "./Complete.module.css";

const Complete: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h2>Тест завершен, все данные отправлены</h2>
        </div>
    );
};

export default Complete;