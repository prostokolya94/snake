import React, {useCallback, useEffect} from "react"
import {observer} from "mobx-react-lite"
import "./App.css"
import {snake} from "index"
import Field from "components/field/ui/Field"
import {Snake} from "components/snake/model/Snake"
import CountAndRecordWidget from "components/count/CountAndRecordWidget"

function App() {

    const arrowsListenerMemo = useCallback((ev: globalThis.KeyboardEvent, snake: Snake) => {
        snake.changeMovementDirect(ev)
    }, [snake.chains])

    useEffect(() => {
        const handleKeydown = (ev: globalThis.KeyboardEvent) => {
            arrowsListenerMemo(ev, snake)
        }
        window.addEventListener("keydown", handleKeydown)

        return () => {
            window.removeEventListener("keydown", handleKeydown)
        }
    }, [arrowsListenerMemo])

    return (
        <div className="App">
            <CountAndRecordWidget/>
            <Field/>
        </div>
    )
}

export default observer(App)
