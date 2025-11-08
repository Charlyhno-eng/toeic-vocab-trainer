import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

type Props = {
  question: string;
  answers: string[];
  correct: string;
  chosen: string | null;
  onAnswer: (answer: string) => void;
  score: number;
  total: number;
  answered: boolean;
  onNext: () => void;
};

export default function QuizCard({
  question,
  answers,
  correct,
  chosen,
  onAnswer,
  score,
  total,
  answered,
  onNext,
}: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "rgba(46,46,77,0.96)",
        color: "#dad6f8",
        borderColor: "#363662",
        boxShadow: "0 4px 32px 0 rgba(34,34,51,0.4)",
        borderRadius: 2,
        minWidth: 340,
        maxWidth: 480,
        width: "100%",
        mx: "auto",
      }}
    >
      <CardContent>
        <Box mb={2}>
          <Typography fontWeight="bold">
            Score: {score} / {total}
          </Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            color: "#dad6f8",
            fontWeight: "bold",
          }}
        >
          {question}
        </Typography>
        <Stack spacing={2}>
          {answers.map((answer, idx) => {
            let bg = "rgba(46,46,77,0.85)";
            let border = "#363662";
            let text = "#dad6f8";

            if (chosen) {
              if (answer === correct) {
                bg = "#22c55e";
                border = "#22c55e";
                text = "#dad6f8";
              }
              if (chosen === answer && answer !== correct) {
                bg = "#e53935";
                border = "#e53935";
                text = "#dad6f8";
              }
            }

            return (
              <Button
                key={idx}
                variant="outlined"
                color="primary"
                onClick={() => onAnswer(answer)}
                fullWidth
                disabled={!!chosen}
                sx={{
                  color: text,
                  bgcolor: bg,
                  borderColor: border,
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#384079", color: text },
                }}
              >
                {answer}
              </Button>
            );
          })}
        </Stack>
        {answered && (
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={onNext}
              sx={{
                fontWeight: "bold",
                bgcolor: "#363662",
                color: "#dad6f8",
                "&:hover": { bgcolor: "#232347", color: "#dad6f8" },
              }}
              endIcon={<span>&gt;</span>}
            >
              Next
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
