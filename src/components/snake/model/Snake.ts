import {makeAutoObservable} from "mobx"
import {Chain, MovementDirection} from "types/Types"

const initSnakeState: Chain[] = [
    {id: 1, x: 50, y: 50},
    {id: 2, x: 50, y: 51},
    {id: 3, x: 50, y: 52},
    {id: 4, x: 50, y: 53},
    {id: 5, x: 50, y: 54}]

// поле 100 на 100 ячеек

const pageAndDirectionMap: Record<string, MovementDirection> = {
    "ArrowUp": MovementDirection.NORTH,
    "ArrowRight": MovementDirection.EAST,
    "ArrowDown": MovementDirection.SOUTH,
    "ArrowLeft": MovementDirection.WEST
}

export class Snake {

    private _chains: Chain[] = initSnakeState
    private _target: Chain | null = null
    private _movementDirection: MovementDirection = MovementDirection.NORTH

    constructor() {
        makeAutoObservable(this)
        setInterval(() => {
            this.makeStep()
        }, 100)
        this._target = this.createTarget()
    }

    get chains(): Chain[] {
        return this._chains
    }

    set chains(value: Chain[]) {
        this._chains = value
    }

    set movementDirection(value: MovementDirection) {
        this._movementDirection = value
    }

    get target(): Chain | null {
        return this._target
    }

    private getHighestId() {
        return this._chains.slice().sort((a, b) => b.id - a.id)[0].id
    }

    public makeStep() {
        const localChains = JSON.parse(JSON.stringify(this._chains)) as Chain[]
        let popped: Chain | null = null
        const onTargetGet = () => {
            this._target = this.createTarget()
            if (popped) {
                popped.id = this.getHighestId() + 2
                localChains.push(popped)
                popped = null
            }
        }
        switch (this._movementDirection) {
            case MovementDirection.NORTH:
                localChains.unshift({
                    id: this.getHighestId() + 1,
                    x: localChains[0].x,
                    y: localChains[0].y - 1
                })
                popped = localChains.pop() ?? null
                if (this.checkTargetGet()) {
                    onTargetGet()
                }
                break
            case MovementDirection.EAST:
                localChains.unshift({
                    id: this.getHighestId() + 1,
                    x: localChains[0].x + 1,
                    y: localChains[0].y
                })
                popped = localChains.pop() ?? null
                if (this.checkTargetGet()) {
                    onTargetGet()
                }
                break
            case MovementDirection.SOUTH:
                localChains.unshift({
                    id: this.getHighestId() + 1,
                    x: localChains[0].x,
                    y: localChains[0].y + 1
                })
                popped = localChains.pop() ?? null
                if (this.checkTargetGet()) {
                    onTargetGet()
                }
                break
            case MovementDirection.WEST:
                localChains.unshift({
                    id: this.getHighestId() + 1,
                    x: localChains[0].x - 1,
                    y: localChains[0].y
                })
                popped = localChains.pop() ?? null
                if (this.checkTargetGet()) {
                    onTargetGet()
                }
                break
            default:
                console.log("default case in step")
        }
        this.chains = localChains
        this.checkEndGame()
    }

    private checkTargetGet() {
        return this._chains[0].x === this._target?.x && this._chains[0].y === this._target.y
    }

    private refreshGame() {
        this.chains = initSnakeState
        this.movementDirection = MovementDirection.NORTH
    }

    private checkEndGame() {

        const checkBordersCross = () => {
            return this._chains[0].x < 0 || this._chains[0].y < 0 || this._chains[0].x > 99 || this._chains[0].y > 99
        }

        const checkSelfCross = () => {
            return this._chains.slice(1).find((el) => el.x === this._chains[0].x && el.y === this._chains[0].y)
        }

        if (checkBordersCross() || typeof checkSelfCross() !== "undefined") {
            window.alert("end game")
            this.refreshGame()
        }
    }

    changeMovementDirect(ev: globalThis.KeyboardEvent) {

        const blockedDirections = {
            [MovementDirection.NORTH]: MovementDirection.SOUTH,
            [MovementDirection.EAST]: MovementDirection.WEST,
            [MovementDirection.SOUTH]: MovementDirection.NORTH,
            [MovementDirection.WEST]: MovementDirection.EAST,
        }

        const validateChangeMovementDirection = (newDirection: MovementDirection, currentDirection: MovementDirection) => {
            return blockedDirections[newDirection] !== currentDirection
        }
        if (validateChangeMovementDirection(pageAndDirectionMap[ev.key], this._movementDirection)) {
            this._movementDirection = pageAndDirectionMap[ev.key]
        }
    }

    private createTarget() {
        const getRandomNumber = () => {
            return Math.floor(Math.random() * 100)
        }
        return {id: 0, x: getRandomNumber(), y: getRandomNumber()} as Chain
    }
}

