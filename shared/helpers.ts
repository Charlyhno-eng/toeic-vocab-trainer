import { TypeTranslate } from "./types";

/**
 * Returns up to 5 random translation strings (distractors) from words, excluding the word with currentId.
 *
 * @param {TypeTranslate[]} words - Full array of translation entries.
 * @param {number} currentId - The id of the current word (will not be included as a distractor).
 * @returns {string[]} An array of up to 5 random translations (excluding the correct answer).
 */
export function getRandomWords(
  words: TypeTranslate[],
  currentId: number,
): string[] {
  const distractors = words.filter((w) => w.id !== currentId);
  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }
  return distractors.slice(0, 5).map((w) => w.translation);
}

/**
 * Shuffles an array of strings in place using the Fisher-Yates algorithm.
 *
 * @param {string[]} array - The array to shuffle.
 * @returns {string[]} The same array, shuffled in random order.
 */
export function shuffle(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Generates a shuffled array of answer options for a question.
 * Includes the correct translation and 5 random distractors.
 *
 * @param {TypeTranslate[]} words - Full array of translation entries.
 * @param {number} idx - The index of the current word in the array.
 * @returns {string[]} An array with the correct answer and 5 distractors, shuffled.
 */
export function createAnswers(words: TypeTranslate[], idx: number): string[] {
  if (words.length === 0 || idx >= words.length) return [];
  const correct = words[idx].translation;
  const distractors = getRandomWords(words, words[idx].id);
  return shuffle([correct, ...distractors]);
}
