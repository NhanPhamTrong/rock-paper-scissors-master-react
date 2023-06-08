import "./RulesModal.scss"
import { motion, AnimatePresence } from "framer-motion"
import originalRules from "../../assets/images/image-rules.svg"
import bonusRules from "../../assets/images/image-rules-bonus.svg"

export const RulesModal = (props) => {
    return (
        <AnimatePresence>
            {props.isShownModal && (
                <motion.div
                    className="rules-modal"
                    initial={{ opacity: 0, pointerEvents: "none" }}
                    animate={{ opacity: 1, pointerEvents: "all" }}
                    exit={{ opacity: 0 }}>
                        <div className="modal-background" onClick={() => props.CloseModal()}></div>
                        <div className="container">
                            <h1>RULES</h1>
                            <img src={props.isOriginal ? originalRules : bonusRules} alt="rules" />
                            <button className="close-btn" type="button" onClick={() => props.CloseModal()}></button>
                        </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}