import "./App.scss"
import { RulesModal } from "./RulesModal/RulesModal"
import { ChooseScreen } from "./ChooseScreen/ChooseScreen"
import { ResultScreen } from "./ResultScreen/ResultScreen"
import { OriginalOptionsData, BonusOptionsData } from "./OptionsData";
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

export const App = () => {
    const [optionsData, setOptionsData] = useState(OriginalOptionsData)
    const [isOriginal, setIsOriginal] = useState(true)
    const [isShownModal, setIsShownModal] = useState(false)
    const [isShownResultScreen, setIsShownResultScreen] = useState(false)
    const [picked, setPicked] = useState()
    const [result, setResult] = useState("")
    const [score, setScore] = useState(0)

    const CloseModal = () => {
        setIsShownModal(false)
    }

    const ClickButton = (order) => {
        setIsShownResultScreen(true)

        if (isOriginal) {
            const opponentOption = optionsData[Math.floor(Math.random() * 3)]
            setPicked([order, opponentOption.order])

            if (order === opponentOption.order) {
                setResult("DRAW")
            }
            else {
                const GetBeatenOrderOfPlayer = () => {
                    return order - 1 < 0 ? order + 2 : order - 1
                }

                if (GetBeatenOrderOfPlayer() === opponentOption.order) {
                    setResult("YOU WIN")
                    setTimeout(() => {
                        setScore(score + 1)
                    }, 1600)
                }
                else {
                    setResult("YOU LOSE")
                    setTimeout(() => {
                        setScore(score > 0 ? score - 1 : score)
                    }, 1600)
                }
            }
        }
        else {
            const opponentOption = optionsData[Math.floor(Math.random() * 5)]
            setPicked([order, opponentOption.order])

            if (order === opponentOption.order) {
                setResult("DRAW")
            }
            else {
                const GetBeatenOrderOfPlayer = () => {
                    const position1 = order - 1 < 0 ? order + 4 : order - 1
                    const position2 = order + 2 > 4 ? order - 5 : order + 2
                    return [position1, position2]
                }

                if (GetBeatenOrderOfPlayer().includes(opponentOption.order)) {
                    setResult("YOU WIN")
                    setTimeout(() => {
                        setScore(score + 1)
                    }, 1600)
                }
                else {
                    setResult("YOU LOSE")
                    setTimeout(() => {
                        setScore(score > 0 ? score - 1 : score)
                    }, 1600)
                }
            }
        }
    }

    const ClickSwitchMode = () => {
        setIsOriginal(!isOriginal)
        setOptionsData(optionsData === BonusOptionsData ? OriginalOptionsData : BonusOptionsData)
        setIsShownResultScreen(false)
        setPicked()
    }

    const ClickPlayAgain = () => {
        setIsShownResultScreen(false)
    }

    return (
        <>
            <header>
                <div className="title">
                    <p>ROCK</p>
                    <p>PAPER</p>
                    <p>SCISSORS</p>
                </div>
                <div className="score-section">
                    <h1>SCORE</h1>
                    <h2>{score}</h2>
                </div>
            </header>

            <main>
                <AnimatePresence>
                    {isShownResultScreen ? (
                        <ResultScreen
                            playerPicked={optionsData[picked[0]]}
                            opponentPicked={optionsData[picked[1]]}
                            result={result}
                            ClickPlayAgain={ClickPlayAgain} />
                    ) : (
                        <ChooseScreen isOriginal={isOriginal} ClickButton={ClickButton} />
                    )}
                </AnimatePresence>
                <div className="main-footer">
                    <div className={"switch-section " + (isOriginal ? "" : "active")}>
                        <p>{isOriginal ? "Bonus" : "Original"}</p>
                        <button
                            className="switch-mode"
                            type="button"
                            onClick={ClickSwitchMode}></button>
                    </div>
                    <button
                        className="rules-btn"
                        type="button"
                        onClick={() => setIsShownModal(true)}>RULES</button>
                </div>
            </main>

            <RulesModal isShownModal={isShownModal} isOriginal={isOriginal} CloseModal={CloseModal} />
            
            <footer>
                <div className="attribution">
                    Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. 
                    Coded by <a href="https://github.com/NhanPhamTrong">Nhan Pham</a>.
                </div>
            </footer>
        </>
    )
}