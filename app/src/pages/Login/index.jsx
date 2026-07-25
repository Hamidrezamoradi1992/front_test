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
import { useState } from "react";

import {
  AlternateEmail,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../redux/api/authApi";
import { setUser } from "../../redux/slices/authSlice";
import { loginSchema } from "../../schemas/loginSchema";
import Aurora from "./Aurora";

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
      // localStorage.setItem("user", JSON.stringify(res));
      const isAdmin = res.type === 10;

      dispatch(setUser({ ...res, isAdmin }));

      navigate(isAdmin ? "/admin" : "/dashboard");
    } catch (err) {
      console.log(err);
      // بعداً Snackbar جایگزین می‌کنیم
    }
  };

  return (
    <Box className="login-page">
      <Aurora />

      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <Paper elevation={0} className="login-card">
          {/* Logo */}

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
            }}
          >
            <Box className="login-logo">W</Box>
          </motion.div>

          <Typography variant="h3" fontWeight={700} textAlign="center" mb={1}>
            Welcome 👋
          </Typography>

          <Typography color="text.secondary" textAlign="center" mb={5}>
            ورود به سامانه دریافت توکن
          </Typography>

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
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "rgba(255,255,255,.7)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#a855f7",
                    },
                    "& input": {
                      color: "#fff",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmail color="primary" />
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
                  type={showPassword ? "text" : "password"}
                  label="رمز عبور"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                fullWidth
                type="submit"
                size="large"
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 4,
                  height: 58,
                  borderRadius: "18px",

                  background: "linear-gradient(135deg,#7C3AED,#9333EA,#2563EB)",

                  fontWeight: 700,
                  fontSize: 17,

                  textTransform: "none",

                  boxShadow: "0 15px 40px rgba(124,58,237,.45)",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#6D28D9,#7E22CE,#1D4ED8)",
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "ورود به سامانه"
                )}
              </Button>
            </motion.div>
          </form>

          <Typography
            mt={4}
            textAlign="center"
            sx={{
              opacity: 0.7,
              fontSize: 13,
            }}
          >
            © 2026 Wazn Management System
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
