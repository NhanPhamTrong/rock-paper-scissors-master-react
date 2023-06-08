import { useEffect, useState } from "react"
import "./ResultScreen.scss"
import { motion } from "framer-motion"

export const ResultScreen = (props) => {
    const mobileBoxShadow = "0 0 0 1.25rem rgba(200, 200, 200, 0.15), 0 0 0 2.25rem rgba(200, 200, 200, 0.1),  0 0 0 3.25rem rgba(200, 200, 200, 0.05)"
    const desktopBoxShadow = "0 0 0 5.5rem rgba(200, 200, 200, 0.15), 0 0 0 8.5rem rgba(200, 200, 200, 0.1),  0 0 0 11.5rem rgba(200, 200, 200, 0.05)"

    const [boxShadowContent, setBoxShadowContent] = useState(mobileBoxShadow)
    const [moveDistance, setMoveDistance] = useState(0)

    const HandleResize = () => {
        setBoxShadowContent(window.innerWidth < 992 ? mobileBoxShadow : desktopBoxShadow)
        setMoveDistance(window.innerWidth < 992 ? "0" : "6rem")
    }

    useEffect(() => {
        window.addEventListener("resize", HandleResize)
        HandleResize()
    })

    return (
        <motion.div
            className="result-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}>
                <div className="picked-section">
                    <motion.div
                        className="you"
                        initial={{ x: "0px" }}
                        animate={{ x: "-" + moveDistance }}
                        transition={{ delay: 1, duration: 0.2 }}>
                            <motion.div className="you-picked"
                                initial={{ boxShadow: "none" }}
                                animate={{ boxShadow: props.result === "YOU WIN" ? boxShadowContent : "none" }}
                                transition={{ delay: 1.2, duration: 0.2 }}>
                                    <div style={{ "background": props.playerPicked.background, "--boxShadowColor": props.playerPicked.boxShadowColor }}>
                                        <img src={props.playerPicked.backgroundImage} alt="option's icon" />
                                    </div>
                            </motion.div>
                            <h1>YOU PICKED</h1>
                    </motion.div>
                    <motion.div
                        className="opponent"
                        initial={{ x: "0px" }}
                        animate={{ x: moveDistance }}
                        transition={{ delay: 1, duration: 0.2 }}>
                            <motion.div
                                className="opponent-picked"
                                initial={{ boxShadow: "none" }}
                                animate={{ boxShadow: props.result === "YOU LOSE" ? boxShadowContent : "none" }}
                                transition={{ delay: 1.2, duration: 0.2 }}>
                                    <motion.div
                                        style={{ "background": props.opponentPicked.background, "--boxShadowColor": props.opponentPicked.boxShadowColor }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: [0.6, 1.4, 1] }}
                                        transition={{ delay: 0.6, duration: 0.4 }}>
                                            <img src={props.opponentPicked.backgroundImage} alt="option's icon" />
                                    </motion.div>
                            </motion.div>
                        <h1>OPPONENT PICKED</h1>
                    </motion.div>
                </div>

                <motion.h1
                    className="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.2 }}>{props.result}</motion.h1>

                <motion.button
                    className="play-again"
                    type="button"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: [null, 1.4, 1] }}
                    transition={{ delay: 1.8, duration: 0.2 }}
                    whileHover={{ color: "rgb(255, 0, 0)" }}
                    whileTap={{ scale: 0.9, duration: 0.2 }}
                    onClick={() => props.ClickPlayAgain()}>PLAY AGAIN</motion.button>
        </motion.div>
    )
}