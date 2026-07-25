import "./UserDashboard.css";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

import { generateToken } from "../../utils/generateToken";

export default function UserDashboard() {
  const [token, setToken] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleGenerate = () => {
    setToken(generateToken());
    setTimeLeft(300);
  };

  const handleCopy = async () => {
    if (!token) return;

    await navigator.clipboard.writeText(token);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  };

  return (
    <Box className="dashboard-page">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Paper className="token-card" elevation={0}>
          <Typography variant="h4" fontWeight={700}>
            دریافت توکن
          </Typography>

          <Typography
            sx={{
              mt: 1,
              mb: 4,
              opacity: 0.7,
            }}
          >
            برای دریافت توکن جدید روی دکمه زیر کلیک کنید.
          </Typography>

          <Box className="token-box">
            <Typography className="token-text">
              {token || "----------"}
            </Typography>

            <Tooltip title={copied ? "کپی شد" : "کپی"}>
              <IconButton onClick={handleCopy}>
                {copied ? (
                  <CheckRoundedIcon color="success" />
                ) : (
                  <ContentCopyRoundedIcon />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          {timeLeft > 0 && (
            <Typography className="timer">
              امکان دریافت مجدد تا
              <span>{formatTime()}</span>
            </Typography>
          )}

          <motion.div
            whileHover={{ scale: timeLeft ? 1 : 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              fullWidth
              size="large"
              variant="contained"
              disabled={timeLeft > 0}
              onClick={handleGenerate}
              startIcon={<AutorenewRoundedIcon />}
              sx={{
                mt: 4,
                height: 58,
                borderRadius: "18px",
                fontSize: 17,
                fontWeight: 700,
                textTransform: "none",
                background: "linear-gradient(135deg,#7C3AED,#9333EA,#2563EB)",

                "&:hover": {
                  background: "linear-gradient(135deg,#6D28D9,#7E22CE,#1D4ED8)",
                },
              }}
            >
              {timeLeft ? `دریافت مجدد (${formatTime()})` : "دریافت توکن جدید"}
            </Button>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
}
