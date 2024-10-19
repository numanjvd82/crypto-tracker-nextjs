import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const enum e {
  oneDay = 1,
  week = 7,
  oneMonth = 30,
  threeMonth = 90,
  sixMonth = 180,
  yearly = 365,
}
