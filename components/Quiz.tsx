"use client";

import { Box, Typography } from "@mui/material";
import { useState } from "react";
import QuizCard from "./QuizCard";

type TypeQuiz = {
  id: number;
  question: string;
  answers: string[];
  correct: string;
};

const questions: TypeQuiz[] = [
  {
    id: 1,
    question: "What is the English word for 'Chien'?",
    answers: ["Dog", "Cat", "Bird", "Fish", "Horse", "Rabbit"],
    correct: "Dog",
  },
  {
    id: 2,
    question: "What is the English word for 'Chat'?",
    answers: ["Dog", "Cat", "Bird", "Fish", "Horse", "Rabbit"],
    correct: "Cat",
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [chosen, setChosen] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setChosen(answer);
    if (answer === questions[current].correct) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      setChosen(null);
      setCurrent((c) => c + 1);
    }, 1200);
  };

  if (current >= questions.length) {
    return (
      <Box>
        <Typography fontWeight="bold" mb={2}>
          Score: {score} / {questions.length}
        </Typography>
        <Typography>Quiz complete!</Typography>
      </Box>
    );
  }

  return (
    <QuizCard
      question={questions[current].question}
      answers={questions[current].answers}
      correct={questions[current].correct}
      chosen={chosen}
      onAnswer={handleAnswer}
      score={score}
      total={questions.length}
    />
  );
}
