import quizCompleteImg from '../assets/quiz-complete.png'
import QUESTIONS from '../question'
export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter(answer => answer === null)
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0])

    const skippedAnswerShare = Math.round(
        (skippedAnswers.length / userAnswers.length) * 100
    )

    const correctAnswerShare = Math.round(
        (correctAnswers.length / userAnswers.length) * 100
    )

    const wrongAnswerShared = 100 - skippedAnswerShare - correctAnswerShare

    return <div id="summary">
        <img src={quizCompleteImg} alt="" />
        <h2>Quiz Completed!</h2>
        <div id="summary-stats">
            <p>
                <span className="number">{skippedAnswerShare}%</span>
                <span className="text">skipped</span>
            </p>
            <p>
                <span className="number">{correctAnswerShare}%</span>
                <span className="text">answered correctly</span>
            </p>
            <p>
                <span className="number">{wrongAnswerShared}%</span>
                <span className="text">answered correctly</span>
            </p>
        </div>
        <ol>
            {
                userAnswers.map((answer, index) => {
                    let cscClass = 'user-answer'

                    if (answer === null) {
                        cscClass += ' skipped'
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cscClass += ' correct'
                    } else {
                        cscClass += ' wrong'
                    }
                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cscClass}>{answer ?? 'Skipped'}</p>
                        </li>
                    )
                })
            }

        </ol>
    </div>
}