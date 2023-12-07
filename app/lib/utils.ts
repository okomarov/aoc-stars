import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getRoundedTime() {
  const now = new Date();
  let seconds = now.getSeconds();
  seconds -= seconds % 5;
  now.setSeconds(seconds);
  now.setMilliseconds(0);
  return now;
}

export { cn, getRoundedTime };
