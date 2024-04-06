import React from "react"
import {observer} from "mobx-react-lite"
import styles from "./styles.module.scss"
import {snake} from "index"
import SnakeChain from "components/snake/ui/SnakeChain"


const Field = () => {
    return (
        <div className={styles.fieldWrapper} onClick={()=> snake.makeStep()}>
            {snake.chains.map((chain) => (
                <SnakeChain chain={chain} key={chain.id}/>
            ))}
            {snake.target && <SnakeChain chain={snake.target} key={snake.target.y + "target" + snake.target.x}/>}
        </div>
    )
}

export default observer(Field)