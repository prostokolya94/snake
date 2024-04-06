import React, {FC} from "react"
import {observer} from "mobx-react-lite"
import styles from "./styles.module.scss"
import {Chain} from "types/Types"

interface ISnakeChain {
    chain: Chain
}

const SnakeChain: FC<ISnakeChain> = ({chain}) => {

    return (
        <div className={styles.snakeChain} style={{top: chain.y * 5, left: chain.x * 5}}/>
    )

}

export default observer(SnakeChain)