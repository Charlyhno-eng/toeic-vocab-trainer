# toeic-vocab-trainer

toeic-vocab-trainer is a Next.js application that uses a SQLite database to help users learn vocabulary in any target language. The initial focus is English, but the app can be customized for any language.

### Features

- Add new vocabulary entries with translations in the target language.
- Interactive quizzing with 6 answer choices per question, chosen randomly from the database.
- Progressive learning: a word is considered memorized once it has been correctly selected 10 times.

### Database Structure

There is a single table defined as follows:

| id       | native_language    | language_to_learn   | counter         | is_memorized         |
| -------- | ------------------ | ------------------- | --------------- | -------------------- |
| INT (PK) | Text (e.g. French) | Text (e.g. English) | INT (default 0) | BOOL (default false) |

- `id`: Unique identifier for the entry.
- `native_language`: Word in the user's native language.
- `language_to_learn`: Translation of the word in the target language.
- `counter`: Number of times the word has been answered correctly.
- `is_memorized`: Indicates if the word is memorized (`true`) or not (`false`).

### How the App Works

1. **Add a Word**
   - The user enters a word in the native language and its translation, then submits it.
   - A new entry is created in the table with `counter = 0` and `is_memorized = false`.

2. **Quiz Session**
   - The app presents a word from the native language.
   - Six answer choices are displayed, randomly selected from the database (one correct, five incorrect).
   - The user selects an answer:
     - If the correct answer is chosen, the `counter` for that word is incremented by 1.
     - Otherwise, the counter remains unchanged.

3. **Memorization**
   - When the `counter` for a word reaches 10, `is_memorized` is set to `true`.
   - Memorized words (`is_memorized = true`) are no longer queried in quizzes, as they are considered learned.

### Customization

- Vocabulary for any language can be added.
- To customize, simply enter the native word and its translation when adding a new entry.
