import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export default function UserDialog({
  open,
  onClose,
  onSubmit,
  loading,
  mode = "create",
  defaultValues,
}) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
      password1: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === "create" ? "کاربر جدید" : "ویرایش کاربر"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="نام" />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="نام خانوادگی" />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  disabled={mode === "edit"}
                  label="ایمیل"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="موبایل" />
              )}
            />
          </Grid>

          {mode === "create" && (
            <>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      fullWidth
                      label="رمز عبور"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="password1"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      fullWidth
                      label="تکرار رمز عبور"
                    />
                  )}
                />
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>انصراف</Button>

        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? "در حال ثبت..." : mode === "create" ? "ثبت" : "ذخیره"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
