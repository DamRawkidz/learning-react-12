import logimg from '../assets/quiz-logo.png'
export default function Header() {
    return <header>
        <img src={logimg} alt='Quiz logo' />
        <h1>ReactQuiz</h1>
    </header>
}