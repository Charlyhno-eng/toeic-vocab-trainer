"use client";

import { AppBar, Box, Button, Divider, Link, Toolbar } from "@mui/material";
import NextLink from "next/link";
import { useState } from "react";
import EditWordModal from "./EditWordModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "transparent" }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
            <Link
              component={NextLink}
              href="/"
              underline="none"
              sx={{ fontWeight: "bold", letterSpacing: "1px", lineHeight: 1 }}
            >
              <span style={{ color: "#1976d2", fontSize: "1.8rem" }}>T</span>
              <span style={{ color: "#ffffff", fontSize: "1rem" }}>oeic</span>
              <span style={{ color: "#1976d2", fontSize: "1.8rem" }}>V</span>
              <span style={{ color: "#ffffff", fontSize: "1rem" }}>ocab</span>
              <span style={{ color: "#1976d2", fontSize: "1.8rem" }}>T</span>
              <span style={{ color: "#ffffff", fontSize: "1rem" }}>rainer</span>
            </Link>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              gap: 3,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: 2,
                fontWeight: "bold",
                bgcolor: "rgba(46,46,77,0.0)",
                color: "#dad6f8",
                "&:hover": { bgcolor: "#232347", color: "#fff" },
              }}
              onClick={() => setOpen(true)}
            >
              Add a word
            </Button>
          </Box>
        </Toolbar>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
      </AppBar>
      <EditWordModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
