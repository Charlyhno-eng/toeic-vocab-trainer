"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import QuizCard from "./QuizCard";

type Translate = {
  id: number;
  word: string;
  translation: string;
  counter: number;
  isMemorized: boolean;
};

function getRandomWords(words: Translate[], currentId: number) {
  const distractors = words.filter((w) => w.id !== currentId);
  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }
  return distractors.slice(0, 5).map((w) => w.translation);
}

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Quiz() {
  const [words, setWords] = useState<Translate[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/translate")
      .then((res) => res.json())
      .then((data) => setWords(data));
  }, []);

  useEffect(() => {
    if (words.length > 0 && current < words.length) {
      const correct = words[current].translation;
      const distractors = getRandomWords(words, words[current].id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswers(shuffle([correct, ...distractors]));
    }
  }, [words, current]);

  const handleAnswer = async (answer: string) => {
    setChosen(answer);
    setAnswered(true);

    const correct = words[current].translation;
    const id = words[current].id;
    const isRight = answer === correct;

    if (isRight) setScore((s) => s + 1);

    await fetch(`/api/translate/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: isRight }),
    });
  };

  const handleNext = () => {
    setChosen(null);
    setAnswered(false);
    setCurrent((c) => c + 1);
  };

  if (words.length === 0) {
    return (
      <Box>
        <Typography>Loading…</Typography>
      </Box>
    );
  }

  if (current >= words.length) {
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
          Score: {score} / {words.length}
        </Typography>
        <Typography>Quiz complete!</Typography>
      </Box>
    );
  }

  const question = words[current].word;
  const correct = words[current].translation;

  return (
    <QuizCard
      question={`What is the English word for '${question}'?`}
      answers={answers}
      correct={correct}
      chosen={chosen}
      onAnswer={handleAnswer}
      score={score}
      total={words.length}
      answered={answered}
      onNext={handleNext}
    />
  );
}
