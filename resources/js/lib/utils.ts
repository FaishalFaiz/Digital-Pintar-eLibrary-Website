import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toUrl(href: string | URL): string {
  if (typeof href === 'string') {
    return href;
  }
  return href.pathname + href.search + href.hash;
}
