import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [hello, setHello] = useState(true);
  const [boxQuiz, setBoxQuiz] = useState(false);
  const [firstPage, setFirstPage] = useState(false);
  const [secondPage, setSecondPage] = useState(false);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(1)
  const [error, setError] = useState('')

  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  const first = (e) => {
    e.preventDefault();
    setHello(false);
    setBoxQuiz(true)
    setFirstPage(true)
  }

  const second = (e) => {
    e.preventDefault();
    setFirstPage(false);
    setSecondPage(true)
  }

  const exit = (e) => {
    e.preventDefault();
    setBoxQuiz(false);
    setHello(true)
    setMinutes(10)
  }

  useEffect(() => {
    if(boxQuiz){
      const timer = setInterval(() => {
        if(minutes === 0 && seconds === 0){
          clearInterval(timer);
            setFirstPage(false);
            setSecondPage(false)
        }else if(seconds === 0){
          setMinutes(minutes - 1);
          setSeconds(59);
        }else(
          setSeconds(seconds - 1)
        )
      }, 1000)
      return() => clearInterval(timer)
    }
  }, [boxQuiz, minutes, seconds])

  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  useEffect(() => {
    const error = setInterval(() => {
      if(minutes === 0 && seconds === 0){
        setError(`На жаль, час на проходження опитування вичерпано. Пощастить наступного разу. Ваш результат : ${score}.`)
        clearInterval(error); // Останавливаем интервал после установки ошибки
      }
    }, 1000)
  }, [minutes, seconds])

  return (
    <div className='wrapper'>
      <div className='quiz-box'>

        {hello && (
          <div className='quiz-box-first-page'>
            <h1>Онлайн вікторина</h1>
            <p>Привіт, у тебе є можливість перевірити власні знання з історії.</p>
            <p>На тебе чекає 6 питань протягом 3-х хвилин, та за умови відповіді на 5 запитань вірно, перейти до "Супер гри". Готовий?</p>
            <div>
              <button onClick={first}>Вперед!</button>
            </div>
          </div>
        )}

        
          {boxQuiz && (
            <>
            <div className='wrapper-quiz-box'>
              <div className='wrapper-quiz-box-head'>
                <p>Бали : {score}</p>
                <p>Питання : {question}</p>
                {minutes === 0 && seconds === 0 ? (
                  <p>Гра завершена</p>
                ) : (
                  <p>{formatTime(minutes)}:{formatTime(seconds)}</p>
                )}
              </div>
              <div className='wrapper-quiz-box-error'>
                {minutes === 0 && seconds === 0 ? (
                  <p className='wrapper-quiz-box-error-text'>{error}</p>
                ): null}
              </div>
              <div className='wrapper-quiz-box-bottom'>
              {minutes === 0 && seconds === 0 ? (
                <div className='wrapper-quiz-box-bottom-close' onClick={exit}></div>
              ) : null}
              </div>
            </div>
            </>   
          )}

          {boxQuiz && firstPage &&(
            <>
              <div className='box-first-question'>На тебе чекає 6 питань протягом 3-х хвилин, та за умови відповіді на 5 запитань вірно, перейти до "Супер гри". Готовий?</div>
            </>
          )}

          {boxQuiz && secondPage &&(
            <p>щорщлщ</p>
          )}
        

      </div>
    </div>
  );
}

export default App;