import { useCallback, useState } from "react"
import QUESTIONS from '../question.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx"
export default function Quiz() {
    const [answerState, setAnswerState] = useState('')
    const [userAnswer, setUserAnswers] = useState([])
    const activeQuestionIndex = answerState === '' ? userAnswer.length : userAnswer.length - 1;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length



    const handleSelectAnsewer = useCallback(function handleSelectAnswer(selectdAnswer) {
        setAnswerState('answered')
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectdAnswer]
        })

        setTimeout(() => {
            if (selectdAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong')
            }

            setTimeout(() => {
                setAnswerState('')
            }, 2000)
        }, 1000)
    }, [activeQuestionIndex])

    const handleSkipAnswer = useCallback(() => handleSelectAnsewer(null), [handleSelectAnsewer])

    if (quizIsComplete) {
        return <div id="summary">
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
        </div>
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random(0 - 0.5))

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        const isSelected = userAnswer[userAnswer.length - 1] === answer
                        let cssClasses = ''

                        if (answerState === 'answered' && isSelected) {
                            cssClasses = 'selected'
                        }

                        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClasses = answerState
                        }

                        return <li key={answer} className="answer">
                            <button className={cssClasses} onClick={() => handleSelectAnsewer(answer)}>{answer}</button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}