import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// types
import { QuestionsState, Difficulty } from './API';
// Styles
import { GlobalStyle, Wrapper} from './App.styles';


export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}


const TOTAL_QUESTIONS = 10;

function App() {

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionsState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver,setGameOver] = useState(true);

    console.log(questions);


    const startTrivia = async() => { //start quiz

        //start 버튼 누르면 api fetch 해서 뭔가 loading되도록
        setLoading(true);
        setGameOver(false);

        const newQuestions = await fetchQuizQuestions(
            TOTAL_QUESTIONS,
            Difficulty.EASY
        );

        //에러헨들링 원하면 여기서 하면된다,
        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);


      }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!gameOver) {
            //users answer
            const answer = e.currentTarget.value;
            // check answer against correct answer 맞는 답인지 확인
            const correct = questions[number].correct_answer === answer;
            // add score if answer is correct
            if(correct) setScore(prev=> prev + 1);
            // save answer in the array for user answers
            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            };
            setUserAnswers(prev => [...prev, answerObject]);

        }

      }

      //다음질문 클릭
    const nextQuestion = () =>{

        //move on to the next question if not the last question
        const nextQuestion = number + 1;

        if(nextQuestion === TOTAL_QUESTIONS) { //마지막 문제
            setGameOver(true);
        }else{
            setNumber(nextQuestion);
        }

    }


    return (
        <><GlobalStyle/>
          <Wrapper>
            <h1>ARE YOU A MOVIE GEEK?</h1>
              {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                  <button className="start" onClick={startTrivia}>Start</button>
              ): null}
              {!gameOver ? <p className="score">Score:{score} </p> : null}
              {loading && <p>Loading Questions ...</p> }
              {!loading && !gameOver && (
                  <QuestionCard
                      questionNr={number + 1}
                      totalQuestions={TOTAL_QUESTIONS}
                      question={questions[number].question}
                      answers={questions[number].answers}
                      userAnswer={userAnswers ? userAnswers[number] : undefined}
                      callback={checkAnswer}
                  />
              )}
              {!gameOver && !loading && userAnswers.length === number+1 && number!== TOTAL_QUESTIONS - 1 ? (
                  <button className="next" onClick={nextQuestion}>Next Question</button>
              ): null}

          </Wrapper>
        </>
    );
}

export default App;
