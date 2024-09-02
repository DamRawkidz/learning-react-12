import { useCallback, useRef, useState } from "react"
import QUESTIONS from '../question.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import Question from "./Question.jsx"
import Summary from "./Summary.jsx"

export default function Quiz() {

    const [userAnswer, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswer.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length



    const handleSelectAnsewer = useCallback(function handleSelectAnswer(selectdAnswer) {

        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectdAnswer]
        })

    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnsewer(null), [handleSelectAnsewer])

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswer} />
    }

    // if (!shuffledAnswers.current) {
    //     shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers]
    //     shuffledAnswers.current.sort(() => Math.random(0 - 0.5))
    // }


    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnsewer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}