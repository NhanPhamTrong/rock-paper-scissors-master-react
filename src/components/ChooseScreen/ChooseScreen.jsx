import "./ChooseScreen.scss"
import { motion } from "framer-motion"
import { OriginalOptionsData, BonusOptionsData } from "../OptionsData"

const OriginalMode = (props) => {
    return (
        <motion.div
            className="choose-screen original"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}>
                {OriginalOptionsData.map((option, index) => (
                    <motion.button
                        key={index}
                        className={option.name}
                        type="button"
                        order={option.order}
                        whileHover={props.buttonOnHover}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => props.ClickButton(e)}>
                            <div></div>
                    </motion.button>
                ))}

                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
        </motion.div>
    )
}

const BonusMode = (props) => {
    return (
        <motion.div
            className="choose-screen bonus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}>
                {BonusOptionsData.map((option, index) => (
                    <motion.button
                        key={index}
                        className={option.name}
                        type="button"
                        order={option.order}
                        whileHover={props.buttonOnHover}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => props.ClickButton(e)}>
                            <div></div>
                    </motion.button>
                ))}

                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
        </motion.div>
    )
}

export const ChooseScreen = (props) => {
    const ClickButton = (e) => {
        props.ClickButton(parseInt(e.currentTarget.getAttribute("order")))
    }

    const buttonOnHover = {
        scale: 1.1,
        transition: {duration: 0.1}
    }

    return (
        props.isOriginal ? (
            <OriginalMode buttonOnHover={buttonOnHover} ClickButton={ClickButton} />
        ) : (
            <BonusMode buttonOnHover={buttonOnHover} ClickButton={ClickButton} />
        )
    )
}