import Ansewers from "./Answers"
import QuestionTimer from "./QuestionTimer"
import QUESTIONS from '../question.js'
import { useState } from "react"
export default function Question({
    index,
    onSelectAnswer,
    // answerState,

    onSkipAnswer,
}) {

    const [answer, setAnwer] = useState({
        selectAnswer: '',
        isCorrect: null
    })

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }



    function handleSelectAnswer(answer) {
        setAnwer({
            selectAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnwer({
                selectAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer)
            }, 2000)
        }, 1000)
    }


    let answerState = ''

    if (answer.selectAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong'
    } else if (answer.selectAnswer) {
        answerState = 'answered'
    }

    return (
        <div id="question">
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimeout={answer.selectAnswer === '' ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Ansewers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    )
}