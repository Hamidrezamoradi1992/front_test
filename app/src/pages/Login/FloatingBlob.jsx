import { motion } from "framer-motion";

export default function FloatingBlob({
  size = 300,
  color = "#7C3AED",
  top,
  left,
  right,
  bottom,
  blur = 120,
  opacity = 0.45,
  duration = 20,
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
        pointerEvents: "none",
        top,
        left,
        right,
        bottom,
      }}
      animate={{
        x: [0, 60, -40, 0],
        y: [0, -50, 30, 0],
        scale: [1, 1.15, 0.9, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
