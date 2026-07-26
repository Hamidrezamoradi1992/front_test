import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [reactCompilerPreset()],
      },
    }),
  ],
});
