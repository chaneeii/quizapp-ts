import {shuffleArray} from "./utils";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionsState = Question & { answers: string[] };

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}


export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    // https://opentdb.com/api.php?amount=10&category=11&type=multiple
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=11&difficulty=${difficulty}&type=multiple`


    //awiat 두번쓰는 이유
    //1. 첫번째는 fetch 그 자체를 기다리는 목적
    //2. json으로 컨버트 하는 거 기다림!
    const data = await (await fetch(endpoint) ).json();
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),

        }
    ))
};