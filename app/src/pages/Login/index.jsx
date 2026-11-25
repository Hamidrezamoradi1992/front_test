import "./Login.css";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  AlternateEmailRounded,
  LockRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";

import { motion } from "framer-motion";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../redux/api/authApi";
import { setUser } from "../../redux/slices/authSlice";
import { loginSchema } from "../../schemas/loginSchema";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();

      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);

      const isAdmin = res.type === 10;

      dispatch(setUser({ ...res, isAdmin }));

      navigate(isAdmin ? "/admin" : "/dashboard");
    } catch (err) {
      console.error(err);
    }
  };
  const handleDemoLogin = (type) => {
    const isAdmin = type === 10;

    const demoUser = {
      id: isAdmin ? 10 : 1,
      type,
      isAdmin,
      email: isAdmin ? "admin@demo.local" : "user@demo.local",
      access_token: `demo-token-${type}`,
      refresh_token: `demo-refresh-${type}`,
    };

    localStorage.setItem("access_token", demoUser.access_token);
    localStorage.setItem("refresh_token", demoUser.refresh_token);

    dispatch(setUser(demoUser));

    navigate(isAdmin ? "/admin" : "/dashboard");
  };
  const fieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      backgroundColor: "#fff",
      transition: "all .2s ease",
      "& fieldset": {
        borderColor: "#E5E7EB",
      },
      "&:hover fieldset": {
        borderColor: "#D92D35",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#D92D35",
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#6B7280",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#D92D35",
    },
    "& .MuiInputBase-input": {
      color: "#1F2937",
    },
  };

  return (
    <Box className="login-page">
      <div className="login-background-decoration login-decoration-one" />
      <div className="login-background-decoration login-decoration-two" />
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="login-wrapper"
      >
        <Paper elevation={0} className="login-card">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="login-logo-wrapper"
          >
            <img
              src="./panda-logo.png"
              alt="پند کاسپین"
              className="login-logo"
            />
          </motion.div>

          {/* Header */}
          <Box className="login-header">
            <Typography
              variant="h4"
              fontWeight={800}
              textAlign="center"
              className="login-title"
            >
              سامانه مدیریت تکنسین
            </Typography>

            <Typography textAlign="center" className="login-subtitle">
              پند کاسپین
            </Typography>

            <Typography textAlign="center" className="login-description">
              برای ورود به سامانه، اطلاعات حساب کاربری خود را وارد کنید.
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="ایمیل"
                  placeholder="example@email.com"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={fieldStyles}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailRounded sx={{ color: "#D92D35" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="رمز عبور"
                  type={showPassword ? "text" : "password"}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={fieldStyles}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRounded sx={{ color: "#D92D35" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          sx={{ color: "#6B7280" }}
                        >
                          {showPassword ? (
                            <VisibilityOffRounded />
                          ) : (
                            <VisibilityRounded />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* Login Button */}
            <motion.div
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                fullWidth
                type="submit"
                size="large"
                variant="contained"
                disabled={isLoading}
                className="login-submit-button"
                sx={{
                  mt: 3,
                  height: 56,
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #E32636, #C8102E)",
                  fontWeight: 700,
                  fontSize: 16,
                  boxShadow: "0 8px 22px rgba(211, 31, 48, 0.22)",
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(135deg, #C8102E, #A50D24)",
                    boxShadow: "0 10px 26px rgba(211, 31, 48, 0.3)",
                  },
                  "&.Mui-disabled": {
                    background: "#E5A0A5",
                    color: "#fff",
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "ورود به سامانه"
                )}
              </Button>
            </motion.div>
          </form>

          {/* Footer */}
          <Box className="login-footer">
            <Typography className="login-footer-company">
              PAND CASPIAN
            </Typography>

            <Typography className="login-footer-text">
              سامانه مدیریت و پشتیبانی تکنسین‌ها
            </Typography>

            <Typography className="login-copyright">
              © 2026 پند کاسپین | تمامی حقوق محفوظ است
            </Typography>
          </Box>
          {import.meta.env.DEV && (
            <Box sx={{ mt: 3 }}>
              <Typography
                textAlign="center"
                fontSize={12}
                color="text.secondary"
                mb={2}
              >
                ورود سریع آزمایشی
              </Typography>

              <Box display="flex" gap={1.5}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleDemoLogin(1)}
                  sx={{
                    height: 45,
                    borderRadius: "12px",
                    borderColor: "#D92D35",
                    color: "#D92D35",
                  }}
                >
                  ورود کاربر (1)
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleDemoLogin(10)}
                  sx={{
                    height: 45,
                    borderRadius: "12px",
                    background: "#D92D35",
                  }}
                >
                  ورود ادمین (10)
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
}
