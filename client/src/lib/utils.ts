import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number): string => {
  if (price >= 10000000) {
    return `PKR ${(price / 10000000).toFixed(2)} Crore`;
  } else if (price >= 100000) {
    return `PKR ${(price / 100000).toFixed(2)} Lac`;
  } else {
    return `PKR ${price.toLocaleString()}`;
  }
};
