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
  const [answered, setAnswered] = useState<boolean>(false);

  const handleAnswer = (answer: string) => {
    setChosen(answer);
    setAnswered(true);
    if (answer === questions[current].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setChosen(null);
    setAnswered(false);
    setCurrent((c) => c + 1);
  };

  if (current >= questions.length) {
    return (
      <Box
        sx={{
          bgcolor: "rgba(46,46,77,0.96)",
          color: "#dad6f8",
          p: 4,
          borderRadius: 2,
          minWidth: 340,
          maxWidth: 480,
          boxShadow: "0 4px 32px 0 rgba(34,34,51,0.4)",
        }}
      >
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
      answered={answered}
      onNext={handleNext}
    />
  );
}
