import React from "react"
import styles from "./styles.module.scss"
import {snake} from "index"

const CountAndRecordWidget = () => {
    return (
        <div className={styles.countWrapper}>
            <span>count: {snake.chains.length - 5}</span>
            <span>record: {snake.record}</span>
        </div>
    )
}

export default CountAndRecordWidget