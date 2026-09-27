import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Util para combinar classes Tailwind con merge correcto. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
