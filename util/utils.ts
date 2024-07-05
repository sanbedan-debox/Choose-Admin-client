import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const fadeIn = (
//   direction: "left" | "right" | "up" | "down",
//   type: string,
//   delay: number,
//   duration: number
// ): { [key: string]: any } => ({
//   hidden: {
//     x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
//     y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
//     opacity: 0,
//     transition: {
//       type,
//       delay,
//       duration,
//       ease: "easeOut",
//     },
//   },
//   show: {
//     x: 0,
//     y: 0,
//     opacity: 1,
//     transition: {
//       type,
//       delay,
//       duration,
//       ease: "easeOut",
//     },
//   },
//   exit: {
//     x: 0,
//     y: direction === "up" ? -100 : 0,
//     opacity: 0,
//     transition: {
//       type,
//       delay,
//       duration,
//       ease: "easeOut",
//     },
//   },
// });

export const fadeIn = (
  direction = "up",
  type = "tween",
  delay = 0,
  duration = 0.5
) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? "-50vh" : "50vh",
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      transition: {
        type,
        delay,
        duration,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type,
        delay,
        duration,
      },
    },
    exit: {
      opacity: 0,
      y: direction === "up" ? "100vh" : "-100vh",
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      transition: {
        type,
        delay,
        duration,
      },
    },
  };
};
