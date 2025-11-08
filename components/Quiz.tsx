"use client";

import { createAnswers } from "@/shared/helpers";
import { TypeTranslate } from "@/shared/types";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import QuizCard from "./QuizCard";

export default function Quiz() {
  const [words, setWords] = useState<TypeTranslate[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [askedIndices, setAskedIndices] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/translate")
      .then((res) => res.json())
      .then((data) => {
        setWords(data);
        if (data.length > 0) {
          const initialIndex = Math.floor(Math.random() * data.length);
          setCurrent(initialIndex);
          setAskedIndices([initialIndex]);
          setAnswers(createAnswers(data, initialIndex));
        }
      });
  }, []);

  const handleAnswer = async (answer: string) => {
    setChosen(answer);
    setAnswered(true);

    const correct = words[current].translation;
    const id = words[current].id;
    const isRight = answer === correct;

    if (isRight) setScore((s) => s + 1);

    const res = await fetch(`/api/translate/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: isRight }),
    });

    // Log content-type and status for debugging
    console.log(
      "PATCH status:",
      res.status,
      "Content-Type:",
      res.headers.get("content-type"),
    );
    // Try to read the raw text
    const raw = await res.text();
    console.log("PATCH response text:", raw);

    let updatedWord = null;
    try {
      updatedWord = raw ? JSON.parse(raw) : null;
      console.log("Parsed JSON:", updatedWord);
    } catch (err) {
      console.error("JSON parse error:", err);
    }
  };

  const handleNext = () => {
    setChosen(null);
    setAnswered(false);

    if (askedIndices.length === words.length) {
      setCurrent(words.length);
      setAnswers([]);
      return;
    }

    let next;
    do {
      next = Math.floor(Math.random() * words.length);
    } while (askedIndices.includes(next));
    setCurrent(next);
    setAskedIndices([...askedIndices, next]);
    setAnswers(createAnswers(words, next));
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
          maxWidth: 720,
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
