import React, {useState} from 'react';
import {Typewritter} from "./Typewritter/Typewritter.tsx";
import styles from "./TypewritterWrapper.module.css"

const TypewritterWrapper: React.FC = () => {
    const [start, setStart] = useState<boolean>(true);

    return (
        <div className={styles.typewritterWrapper}>
            {
                start ?
                    <Typewritter setStart={setStart}/>
                    : <h3>Результат записан</h3>
            }
        </div>
    );
};

export default TypewritterWrapper;