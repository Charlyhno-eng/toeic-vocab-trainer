import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function EditWordModal({ open, onClose }: Props) {
  const [native, setNative] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (native.trim() && translation.trim()) {
      setLoading(true);

      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            word: native.trim(),
            translation: translation.trim(),
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Failed to add word");
        } else {
          setNative("");
          setTranslation("");
          onClose();
        }
      } catch (err) {
        setError("Network error");
      }
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-word-modal"
      aria-describedby="add-word-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "rgba(46,46,77,0.98)",
          color: "#dad6f8",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          minWidth: 340,
          maxWidth: "90vw",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} align="center">
          Add New Word
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Native word"
              variant="outlined"
              autoFocus
              required
              fullWidth
              value={native}
              onChange={(e) => setNative(e.target.value)}
              sx={{
                input: { color: "#dad6f8" },
                label: { color: "#dad6f8" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#363662" },
                  "&:hover fieldset": { borderColor: "#1976d2" },
                },
              }}
            />
            <TextField
              label="Translation"
              variant="outlined"
              required
              fullWidth
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              sx={{
                input: { color: "#dad6f8" },
                label: { color: "#dad6f8" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#363662" },
                  "&:hover fieldset": { borderColor: "#1976d2" },
                },
              }}
            />
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: "#1976d2",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": { bgcolor: "#232347" },
              }}
              fullWidth
            >
              Add
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
