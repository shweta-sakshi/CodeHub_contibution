/**
 * @fileoverview conditionally apply and merge Tailwind CSS class names without conflicts.
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @param {string[]} inputs - Tailwind CSS class names.
 * @desc -
 *        1. Conditionally apply Tailwind CSS class names(handle by clsx library).
 *        2. Merge Tailwind CSS class names without conflicts(handle by tailwind-merge library).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
