import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateString = (ds: string): string => {
  const padTwoDigits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const date = new Date(ds);
  const formattedDate = `${padTwoDigits(date.getMonth() + 1)}/${padTwoDigits(
    date.getDate()
  )}/${date.getFullYear()} ${padTwoDigits(date.getHours())}:${padTwoDigits(
    date.getMinutes()
  )}`;

  return formattedDate;
};

export const getClickableUrlLink = (link: string) => {
  return link.startsWith("http://") || link.startsWith("https://")
    ? link
    : `https://${link}`;
};

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


export const extractErrorMessage = (error: any): string => {
  const errorJson = JSON.parse(JSON.stringify(error));
  if (
    errorJson &&
    errorJson.response &&
    errorJson.response.errors &&
    errorJson.response.errors[0].message
  ) {
    return errorJson.response.errors[0].message.toString().replace("Error: ", "");
  } else {
    return error.toString();
  }
};